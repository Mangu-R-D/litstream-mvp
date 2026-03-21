import crypto from "node:crypto";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { User } from "@/lib/auth-mock";

const COOKIE_NAME = "session";

type SessionPayload = {
  v: 1;
  user: User;
  iat: number;
};

function getSessionSecret(): string {
  return process.env.SESSION_SECRET ?? "dev_only_change_me";
}

function b64urlEncode(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function b64urlDecodeToBuffer(value: string): Buffer {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
  return Buffer.from(padded, "base64");
}

function sign(input: string, secret: string): string {
  return b64urlEncode(crypto.createHmac("sha256", secret).update(input).digest());
}

function safeJsonParse<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function isUser(value: unknown): value is User {
  if (!value || typeof value !== "object") return false;

  const user = value as Record<string, unknown>;
  return (
    typeof user.id === "string" &&
    typeof user.email === "string" &&
    typeof user.name === "string" &&
    typeof user.role === "string"
  );
}

export function createSessionToken(user: User): string {
  const payload: SessionPayload = {
    v: 1,
    user,
    iat: Math.floor(Date.now() / 1000),
  };

  const body = b64urlEncode(Buffer.from(JSON.stringify(payload), "utf8"));
  const signature = sign(body, getSessionSecret());
  return `${body}.${signature}`;
}

export function verifySessionToken(token: string): User | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [body, signature] = parts;
  const expected = sign(body, getSessionSecret());

  if (signature.length !== expected.length) return null;

  const isValid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!isValid) return null;

  const parsed = safeJsonParse<SessionPayload>(b64urlDecodeToBuffer(body).toString("utf8"));
  if (!parsed || parsed.v !== 1 || !isUser(parsed.user)) return null;

  return parsed.user;
}

export function readSession(cookieStore: ReadonlyRequestCookies): User | null {
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  return verifySessionToken(raw);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export const Session = {
  COOKIE_NAME,
} as const;

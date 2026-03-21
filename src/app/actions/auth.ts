"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authenticate } from "@/lib/auth-mock";
import { createSessionToken, sessionCookieOptions, Session } from "@/lib/session";

export type LoginState = { error?: string };

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { error: "Email is required." };

  const user = await authenticate(email);
  if (!user) {
    return { error: "No partner account found with this email. Please apply for access." };
  }

  const cookieStore = await cookies();
  cookieStore.set(Session.COOKIE_NAME, createSessionToken(user), sessionCookieOptions());
  redirect("/portal/arc-request");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(Session.COOKIE_NAME);
  redirect("/portal/login");
}

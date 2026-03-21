"use server";

import { cookies } from "next/headers";
import { addArcRequest } from "@/lib/arc-queue";
import { readSession } from "@/lib/session";

export type ArcState = { error?: string; success?: true };

export async function submitArcRequest(_prevState: ArcState, formData: FormData): Promise<ArcState> {
  const cookieStore = await cookies();
  const user = readSession(cookieStore);
  if (!user) return { error: "Authentication required." };

  const bookSlug = String(formData.get("bookSlug") ?? "").trim();
  const format = String(formData.get("format") ?? "").trim() as "digital" | "physical";
  const address = String(formData.get("address") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!bookSlug) return { error: "Select a title." };
  if (format !== "digital" && format !== "physical") return { error: "Select a format." };
  if (format === "physical" && !address) return { error: "Shipping address is required." };

  addArcRequest({
    userId: user.id,
    userEmail: user.email,
    userName: user.name,
    userRole: user.role,
    bookSlug,
    format,
    address: format === "physical" ? address : undefined,
    notes: notes || undefined,
  });

  return { success: true };
}

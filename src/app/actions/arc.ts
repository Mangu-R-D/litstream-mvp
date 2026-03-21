"use server";

import { cookies } from "next/headers";
import { User } from "@/lib/auth-mock";
import { addArcRequest } from "@/lib/arc-queue";
import { redirect } from "next/navigation";

export async function submitArcRequest(formData: FormData) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session_user");
  if (!sessionCookie) {
    return { error: "Authentication required." };
  }

  const user: User = JSON.parse(sessionCookie.value);
  
  const bookSlug = formData.get("bookSlug") as string;
  const format = formData.get("format") as "digital" | "physical";
  const address = formData.get("address") as string;
  const notes = formData.get("notes") as string;

  if (!bookSlug || !format) {
    return { error: "Missing required fields." };
  }

  addArcRequest({
    userId: user.id,
    userEmail: user.email,
    userName: user.name,
    userRole: user.role,
    bookSlug,
    format,
    address,
    notes,
  });

  return { success: true };
}

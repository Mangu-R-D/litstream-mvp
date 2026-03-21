"use server";

import { cookies } from "next/headers";
import { authenticate } from "@/lib/auth-mock";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  
  if (!email) {
    return { error: "Email is required to verify partner status." };
  }

  const user = await authenticate(email);
  
  if (!user) {
    return { error: "No partner account found with this email. Please apply for access." };
  }

  // Set the "JWT" cookie (Simplified for MVP without external crypto deps)
  cookies().set("session_user", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7 // 1 week
  });

  redirect("/portal/arc-request");
}

export async function logoutAction() {
  cookies().delete("session_user");
  redirect("/portal/login");
}

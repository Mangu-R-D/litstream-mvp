"use server";

import { cookies } from "next/headers";
import { User } from "@/lib/auth-mock";
import { updateArcStatus } from "@/lib/arc-queue";
import { revalidatePath } from "next/cache";

export async function processArcRequest(formData: FormData) {
  const sessionCookie = cookies().get("session_user");
  if (!sessionCookie) return { error: "Unauthorized" };

  const user: User = JSON.parse(sessionCookie.value);
  if (user.role !== "admin") return { error: "Forbidden" };

  const requestId = formData.get("requestId") as string;
  const action = formData.get("action") as "approve" | "deny";

  if (!requestId || !action) return { error: "Missing fields" };

  const status = action === "approve" ? "approved" : "denied";
  updateArcStatus(requestId, status);

  revalidatePath("/portal/admin");
  return { success: true };
}

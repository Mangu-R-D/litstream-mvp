"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { updateArcStatus } from "@/lib/arc-queue";
import { readSession } from "@/lib/session";

export type AdminActionResult = { error?: string; success?: true };

export async function processArcRequest(
  _prevState: AdminActionResult,
  formData: FormData,
): Promise<AdminActionResult> {
  const cookieStore = await cookies();
  const user = readSession(cookieStore);
  if (!user) return { error: "Unauthorized" };
  if (user.role !== "admin") return { error: "Forbidden" };

  const requestId = String(formData.get("requestId") ?? "").trim();
  const action = String(formData.get("action") ?? "").trim();
  if (!requestId || (action !== "approve" && action !== "deny")) {
    return { error: "Missing fields" };
  }

  updateArcStatus(requestId, action === "approve" ? "approved" : "denied");
  revalidatePath("/portal/admin");
  return { success: true };
}

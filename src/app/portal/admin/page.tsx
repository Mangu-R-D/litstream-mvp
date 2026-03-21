import { Suspense } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminQueueTable from "./table";
import { mockArcQueue } from "@/lib/arc-queue";
import { readSession } from "@/lib/session";
import { Card } from "@/components/ui/Card";

async function AdminQueueContent() {
  const cookieStore = await cookies();
  const user = readSession(cookieStore);
  if (!user) redirect("/portal/login");
  if (user.role !== "admin") redirect("/portal/arc-request");

  const pending = mockArcQueue.filter((request) => request.status === "pending");

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl text-slate-900">Admin Moderation Queue</h1>
          <p className="mt-2 text-slate-600">Manage incoming ARC requests from partners.</p>
        </div>
        <Link
          className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          href="/portal/arc-request"
        >
          ← Back to Portal
        </Link>
      </div>

      <AdminQueueTable pending={pending} />
    </div>
  );
}

export default function AdminQueuePage() {
  return (
    <Suspense fallback={<Card><p className="text-sm text-slate-600">Loading admin queue…</p></Card>}>
      <AdminQueueContent />
    </Suspense>
  );
}

import { Suspense } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ArcForm from "./ArcForm";
import { getComingSoonBooks } from "@/lib/mock-cms";
import { readSession } from "@/lib/session";
import { Card } from "@/components/ui/Card";

async function ArcRequestContent() {
  const cookieStore = await cookies();
  const user = readSession(cookieStore);
  if (!user) redirect("/portal/login");

  const comingSoonBooks = await getComingSoonBooks();

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl text-slate-900">Partner Request Portal</h1>
          <p className="mt-2 text-slate-600">
            Welcome, <span className="font-semibold">{user.name}</span> <span className="text-slate-500">({user.role})</span>
          </p>
        </div>

        {user.role === "admin" ? (
          <Link
            className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            href="/portal/admin"
          >
            Admin Dashboard →
          </Link>
        ) : null}
      </div>

      <div className="grid gap-2">
        <h2 className="font-serif text-2xl text-slate-900">Request Advance Reader Copy (ARC)</h2>
        <p className="text-slate-600">
          Submit a request for a digital ARC or a physical copy, where available. Requests are reviewed by admin.
        </p>
      </div>

      <ArcForm comingSoonBooks={comingSoonBooks} />
    </div>
  );
}

export default function ArcRequestPage() {
  return (
    <Suspense fallback={<Card><p className="text-sm text-slate-600">Loading ARC request form…</p></Card>}>
      <ArcRequestContent />
    </Suspense>
  );
}

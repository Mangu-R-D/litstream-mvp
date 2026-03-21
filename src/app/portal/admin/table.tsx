"use client";

import { useActionState } from "react";
import { processArcRequest, type AdminActionResult } from "@/app/actions/admin";
import type { ArcRequest } from "@/lib/arc-queue";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const initialState: AdminActionResult = {};

export default function AdminQueueTable({ pending }: { pending: ArcRequest[] }) {
  const [state, formAction, busy] = useActionState(processArcRequest, initialState);

  if (pending.length === 0) {
    return (
      <Card>
        <p className="text-slate-600">No pending ARC requests at this time.</p>
      </Card>
    );
  }

  return (
    <Card>
      <div className="grid gap-3">
        {state.error ? (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{state.error}</div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="py-3 pr-4">Partner</th>
                <th className="py-3 pr-4">Title</th>
                <th className="py-3 pr-4">Format</th>
                <th className="py-3 pr-4">Notes</th>
                <th className="py-3 pr-4">Address</th>
                <th className="py-3 pr-0 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((req) => (
                <tr key={req.id} className="border-b last:border-b-0">
                  <td className="py-4 pr-4 align-top">
                    <div className="font-semibold text-slate-900">{req.userName}</div>
                    <div className="text-slate-500">{req.userEmail}</div>
                    <div className="text-xs capitalize text-slate-500">{req.userRole}</div>
                  </td>
                  <td className="py-4 pr-4 align-top font-semibold text-slate-900">{req.bookSlug}</td>
                  <td className="py-4 pr-4 align-top text-slate-700">{req.format}</td>
                  <td className="py-4 pr-4 align-top text-slate-700">
                    {req.notes ? <span>“{req.notes}”</span> : <span className="text-slate-400">—</span>}
                  </td>
                  <td className="py-4 pr-4 align-top text-slate-700">
                    {req.format === "physical" && req.address ? req.address : <span className="text-slate-400">—</span>}
                  </td>
                  <td className="py-4 pl-4 align-top">
                    <div className="flex justify-end gap-2">
                      <form action={formAction}>
                        <input type="hidden" name="requestId" value={req.id} />
                        <input type="hidden" name="action" value="approve" />
                        <Button type="submit" disabled={busy}>
                          Approve
                        </Button>
                      </form>
                      <form action={formAction}>
                        <input type="hidden" name="requestId" value={req.id} />
                        <input type="hidden" name="action" value="deny" />
                        <Button type="submit" variant="danger" disabled={busy}>
                          Deny
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}

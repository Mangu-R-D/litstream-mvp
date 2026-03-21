import { cookies } from "next/headers";
import { User } from "@/lib/auth-mock";
import { redirect } from "next/navigation";
import { mockArcQueue } from "@/lib/arc-queue";
import { processArcRequest } from "@/app/actions/admin";

export default async function AdminQueuePage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session_user");
  
  if (!sessionCookie) redirect("/portal/login");

  const user: User = JSON.parse(sessionCookie.value);
  if (user.role !== "admin") redirect("/portal/arc-request");

  const pendingRequests = mockArcQueue.filter(r => r.status === "pending");

  return (
    <div className="min-h-screen py-12 container mx-auto px-6 max-w-5xl">
      <div className="flex justify-between items-center mb-12 border-b border-slate-200 pb-6">
        <div>
          <h1 className="font-serif text-4xl font-bold">Admin Moderation Queue</h1>
          <p className="text-slate-500 mt-2">Manage incoming ARC requests from Partners.</p>
        </div>
        <a href="/portal/arc-request" className="text-slate-500 font-bold uppercase tracking-widest text-sm hover:text-foreground transition-colors">
          ← Back to Portal
        </a>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden">
        {pendingRequests.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No pending ARC requests at this time.
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Partner</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Title / Format</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Justification / Address</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pendingRequests.map(req => (
                <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold">{req.userName}</p>
                    <p className="text-sm text-slate-500">{req.userEmail}</p>
                    <span className="inline-block mt-1 bg-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
                      {req.userRole}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-accent">{req.bookSlug}</p>
                    <p className="text-sm text-slate-500 uppercase tracking-wide mt-1">{req.format}</p>
                  </td>
                  <td className="p-4 max-w-xs">
                    <p className="text-sm text-slate-700 mb-2 italic">"{req.notes || "No notes provided."}"</p>
                    {req.format === "physical" && req.address && (
                      <div className="text-xs bg-slate-100 p-2 rounded text-slate-600">
                        {req.address}
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <form action={processArcRequest} className="inline-flex gap-2">
                      <input type="hidden" name="requestId" value={req.id} />
                      <button 
                        type="submit" 
                        name="action" 
                        value="approve"
                        className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1 rounded text-xs font-bold uppercase tracking-widest transition-colors"
                      >
                        Approve
                      </button>
                      <button 
                        type="submit" 
                        name="action" 
                        value="deny"
                        className="bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1 rounded text-xs font-bold uppercase tracking-widest transition-colors"
                      >
                        Deny
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

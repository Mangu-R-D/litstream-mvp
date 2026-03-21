import { cookies } from "next/headers";
import { User } from "@/lib/auth-mock";
import { redirect } from "next/navigation";
import { getComingSoonBooks } from "@/lib/mock-cms";
import ArcForm from "./ArcForm";

export default async function ArcRequestPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session_user");
  
  if (!sessionCookie) {
    redirect("/portal/login");
  }

  const user: User = JSON.parse(sessionCookie.value);
  const comingSoonBooks = await getComingSoonBooks();

  return (
    <div className="min-h-screen py-12 container mx-auto px-6 max-w-4xl">
      <div className="flex justify-between items-center mb-12 border-b border-slate-200 pb-6">
        <div>
          <h1 className="font-serif text-4xl font-bold">Partner Request Portal</h1>
          <p className="text-slate-500 mt-2">Welcome, {user.name} ({user.role})</p>
        </div>
        {user.role === "admin" && (
          <a href="/portal/admin" className="text-accent font-bold uppercase tracking-widest text-sm hover:underline">
            Admin Dashboard →
          </a>
        )}
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-lg p-8">
        <h2 className="text-xl font-bold mb-6">Request Advance Reader Copy (ARC)</h2>
        <ArcForm comingSoonBooks={comingSoonBooks} />
      </div>
    </div>
  );
}

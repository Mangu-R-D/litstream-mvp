import { Suspense } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { logoutAction } from "@/app/actions/auth";
import { readSession } from "@/lib/session";
import { Button } from "@/components/ui/Button";

async function PortalUserNav() {
  const cookieStore = await cookies();
  const user = readSession(cookieStore);

  if (!user) {
    return (
      <Link className="text-sm font-semibold text-slate-700 hover:text-slate-900" href="/portal/login">
        Sign in
      </Link>
    );
  }

  return (
    <>
      <div className="hidden text-right sm:block">
        <div className="text-sm font-semibold text-slate-900">{user.name}</div>
        <div className="text-xs capitalize text-slate-500">{user.role}</div>
      </div>
      <form action={logoutAction}>
        <Button type="submit" variant="ghost">
          Log out
        </Button>
      </form>
    </>
  );
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-serif text-lg tracking-tight text-slate-900">
              MANGU Publishing
            </Link>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              Partner Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Suspense
              fallback={
                <Link className="text-sm font-semibold text-slate-700 hover:text-slate-900" href="/portal/login">
                  Sign in
                </Link>
              }
            >
              <PortalUserNav />
            </Suspense>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
    </div>
  );
}

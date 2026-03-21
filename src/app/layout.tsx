import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "LitStream | Mangu Publishing",
  description: "A premium book discovery platform by Mangu Publishing.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="font-serif text-lg tracking-tight text-slate-900">
              MANGU Publishing
            </Link>
            <nav className="flex items-center gap-4 text-sm font-semibold text-slate-700">
              <Link className="hover:text-slate-900" href="/">
                Catalog
              </Link>
              <Link className="hover:text-slate-900" href="/portal/login">
                Partner Portal
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

        <footer className="border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
            © Mangu Publishing. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}

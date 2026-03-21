import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "LitStream | Mangu Publishing",
  description: "A premium book discovery platform by Mangu Publishing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} max-w-7xl mx-auto bg-background text-foreground`}>
        {/* Simple Global Header */}
        <header className="flex items-center justify-between py-8 px-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-accent">MANGU</span>
            <span className="font-sans text-sm tracking-widest uppercase text-slate-500 mt-1">Publishing</span>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a href="/" className="hover:text-accent transition-colors">Catalog</a>
            <a href="/portal/arc-request" className="text-brand-red hover:underline">Partner Portal</a>
          </nav>
        </header>

        <main className="min-h-screen">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="py-12 px-6 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Mangu Publishing. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}

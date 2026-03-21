import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/mock-cms";

export default function BookCard({ book }: { book: Book }) {
  const buyLink = book.retailerLinks[0];

  return (
    <div className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={book.coverImage}
          alt={`${book.title} cover`}
          fill
          className="object-cover transition group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 70vw, 280px"
        />

        <div className="absolute left-3 top-3 flex gap-2">
          {book.flags.isNewRelease ? (
            <span className="rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white">New Release</span>
          ) : null}
          {book.flags.isComingSoon ? (
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">Coming Soon</span>
          ) : null}
        </div>
      </div>

      <div className="grid gap-2 p-4">
        <div>
          <div className="font-serif text-lg leading-snug text-slate-900">{book.title}</div>
          {book.subtitle ? <div className="text-sm text-slate-600">{book.subtitle}</div> : null}
        </div>
        <div className="text-sm font-semibold text-slate-700">{book.author}</div>

        <div className="mt-2 flex items-center justify-between">
          <Link href={`/book/${book.slug}`} className="text-sm font-semibold text-slate-800 hover:text-slate-950">
            Explore →
          </Link>

          {buyLink && !book.flags.isComingSoon ? (
            <a
              href={buyLink.url}
              className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50"
            >
              Get Book
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

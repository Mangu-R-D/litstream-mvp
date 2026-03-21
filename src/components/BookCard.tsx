import Image from "next/image";
import Link from "next/link";
import { Book } from "@/lib/mock-cms";

export default function BookCard({ book }: { book: Book }) {
  return (
    <div className="group relative flex flex-col space-y-4">
      {/* Cover Art */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        <Image
          src={book.coverImage}
          alt={`Cover of ${book.title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Merchandising Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {book.flags.isNewRelease && (
            <span className="bg-brand-red text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded shadow">
              New Release
            </span>
          )}
          {book.flags.isComingSoon && (
            <span className="bg-accent text-accent-foreground text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded shadow">
              Coming Soon
            </span>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-col space-y-1">
        <Link href={`/book/${book.slug}`} className="font-serif text-lg font-bold leading-tight group-hover:text-accent transition-colors line-clamp-2">
          {book.title}
        </Link>
        {book.subtitle && (
          <p className="text-sm italic text-slate-600 dark:text-slate-400 line-clamp-1">{book.subtitle}</p>
        )}
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mt-1">{book.author}</p>
      </div>

      {/* Action / Buy */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <Link 
          href={`/book/${book.slug}`}
          className="text-xs font-semibold tracking-widest uppercase hover:text-accent transition-colors"
        >
          Explore →
        </Link>
        {book.retailerLinks.length > 0 && !book.flags.isComingSoon && (
          <a
            href={book.retailerLinks[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            Get Book
          </a>
        )}
      </div>
    </div>
  );
}

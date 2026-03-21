import { getFeaturedBooks, getEditorsPicks, getComingSoonBooks } from "@/lib/mock-cms";
import BookCard from "@/components/BookCard";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const featured = await getFeaturedBooks();
  const editorsPicks = await getEditorsPicks();
  const comingSoon = await getComingSoonBooks();

  const heroBook = featured[0];

  return (
    <div className="flex flex-col gap-24 pb-24">
      
      {/* 1. Cinematic Hero Section */}
      {heroBook && (
        <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden bg-slate-900 border-b border-slate-800">
          {/* Background Blur */}
          <div className="absolute inset-0 opacity-30">
            <Image
              src={heroBook.coverImage}
              alt="Hero Background"
              fill
              className="object-cover blur-3xl scale-110"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 max-w-6xl py-20">
            
            {/* Book Info */}
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="inline-block border border-accent/30 bg-accent/10 px-3 py-1 rounded-full">
                <span className="text-accent text-xs font-bold uppercase tracking-widest">Featured Release</span>
              </div>
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight">
                {heroBook.title}
              </h1>
              {heroBook.subtitle && (
                <p className="text-xl md:text-2xl text-slate-300 font-light italic">
                  {heroBook.subtitle}
                </p>
              )}
              <p className="text-slate-400 max-w-xl text-lg leading-relaxed mx-auto md:mx-0">
                {heroBook.synopsisFull}
              </p>
              
              <div className="pt-6 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <Link
                  href={`/book/${heroBook.slug}`}
                  className="px-8 py-4 bg-white text-slate-900 font-bold uppercase tracking-widest text-sm hover:bg-slate-200 transition-colors w-full sm:w-auto text-center"
                >
                  Read the Prologue
                </Link>
                {heroBook.retailerLinks.length > 0 && (
                  <a
                    href={heroBook.retailerLinks[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-transparent border border-slate-500 text-white font-bold uppercase tracking-widest text-sm hover:border-white hover:bg-white/5 transition-all w-full sm:w-auto text-center"
                  >
                    Order Now
                  </a>
                )}
              </div>
            </div>

            {/* Hero Cover Image */}
            <div className="w-full max-w-xs md:max-w-md shrink-0 relative perspective-1000">
              <div className="relative aspect-[2/3] w-full shadow-2xl shadow-black/80 rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out">
                <Image
                  src={heroBook.coverImage}
                  alt={heroBook.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
          </div>
        </section>
      )}

      <div className="container mx-auto px-6 max-w-7xl flex flex-col gap-24 mt-12">
        {/* 2. Editor's Picks Row */}
        {editorsPicks.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="font-serif text-3xl font-bold">Editor's Picks</h2>
              <Link href="/catalog" className="text-sm font-semibold uppercase tracking-widest text-slate-500 hover:text-accent transition-colors">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {editorsPicks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>
        )}

        {/* 3. Coming Soon Row */}
        {comingSoon.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="font-serif text-3xl font-bold text-slate-400">In Production</h2>
              <span className="text-sm font-semibold uppercase tracking-widest text-slate-500">
                Coming Soon
              </span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 opacity-80 hover:opacity-100 transition-opacity">
              {comingSoon.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>
        )}
      </div>

    </div>
  );
}

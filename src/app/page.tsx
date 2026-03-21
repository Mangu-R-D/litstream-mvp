import Image from "next/image";
import Link from "next/link";
import BookCard from "@/components/BookCard";
import { getComingSoonBooks, getEditorsPicks, getFeaturedBooks } from "@/lib/mock-cms";

export default async function Home() {
  const [featured, editorsPicks, comingSoon] = await Promise.all([
    getFeaturedBooks(),
    getEditorsPicks(),
    getComingSoonBooks(),
  ]);

  const hero = featured[0];

  return (
    <div className="grid gap-12">
      {hero ? (
        <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="absolute inset-0">
            <Image
              src={hero.coverImage}
              alt=""
              fill
              className="object-cover blur-2xl opacity-20"
              sizes="100vw"
              priority
            />
          </div>

          <div className="relative grid gap-8 p-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div className="grid gap-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">Featured Release</div>
              <div>
                <h1 className="font-serif text-4xl leading-tight text-slate-950 md:text-5xl">{hero.title}</h1>
                {hero.subtitle ? <p className="mt-2 text-lg text-slate-600">{hero.subtitle}</p> : null}
              </div>
              <p className="max-w-prose text-slate-700">{hero.synopsisFull}</p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={`/book/${hero.slug}`}
                  className="rounded-md bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Read the Prologue
                </Link>
                {hero.retailerLinks[0]?.url ? (
                  <a
                    href={hero.retailerLinks[0].url}
                    className="rounded-md border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    Order Now
                  </a>
                ) : null}
              </div>
            </div>

            <div className="relative mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
              <Image
                src={hero.coverImage}
                alt={`${hero.title} cover`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 70vw, 320px"
              />
            </div>
          </div>
        </section>
      ) : null}

      {editorsPicks.length ? (
        <section className="grid gap-5">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-serif text-2xl text-slate-950">Editor’s Picks</h2>
            <span className="text-sm font-semibold text-slate-500">Curated favorites</span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {editorsPicks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      ) : null}

      {comingSoon.length ? (
        <section className="grid gap-5">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-serif text-2xl text-slate-950">In Production</h2>
            <Link className="text-sm font-semibold text-slate-700 hover:text-slate-950" href="/portal/login">
              Partner ARC Requests →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoon.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

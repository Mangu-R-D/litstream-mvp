export interface RetailerLink {
  storeName: "Amazon" | "Apple Books" | "Barnes & Noble" | "Bookshop.org";
  url: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  author: string;
  coverImage: string;
  synopsisShort: string;
  synopsisFull: string;
  genres: string[];
  retailerLinks: RetailerLink[];
  flags: {
    isFeatured: boolean;
    isComingSoon: boolean;
    isEditorsPick: boolean;
    isNewRelease: boolean;
  };
}

// Simulated Headless CMS Payload (Sanity / Decap representation)
export const mockCatalog: Book[] = [
  {
    id: "bk_1",
    title: "The Ghost of the Future",
    subtitle: "A November Tale",
    slug: "ghost-of-the-future",
    author: "Mangu Authors",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    synopsisShort: "A gripping tale of what lies ahead.",
    synopsisFull: "In the chilling winds of November, a haunting presence reveals the fragility of time. The Ghost of the Future explores destiny, choice, and the echoes of decisions not yet made.",
    genres: ["Fiction", "Thriller"],
    retailerLinks: [
      { storeName: "Amazon", url: "#" },
      { storeName: "Apple Books", url: "#" }
    ],
    flags: {
      isFeatured: true,
      isComingSoon: false,
      isEditorsPick: true,
      isNewRelease: true
    }
  },
  {
    id: "bk_2",
    title: "Hathor Red",
    subtitle: "The Raw Research",
    slug: "hathor-red",
    author: "Mangu Collective",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800",
    synopsisShort: "The definitive guide to ancient mysteries.",
    synopsisFull: "Uncover the lost texts and raw research from the Hathor Red expedition. A deep dive into mythology, architecture, and forgotten civilizations.",
    genres: ["Non-Fiction", "History"],
    retailerLinks: [
      { storeName: "Amazon", url: "#" }
    ],
    flags: {
      isFeatured: false,
      isComingSoon: true,
      isEditorsPick: false,
      isNewRelease: false
    }
  },
  {
    id: "bk_3",
    title: "LitStream Principles",
    slug: "litstream-principles",
    author: "Software Architect",
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
    synopsisShort: "Operational independence in digital publishing.",
    synopsisFull: "A manifesto on how independent publishers can maintain premium cinematic storefronts without the overhead of heavy technical backends.",
    genres: ["Business", "Technology"],
    retailerLinks: [
      { storeName: "Bookshop.org", url: "#" }
    ],
    flags: {
      isFeatured: false,
      isComingSoon: false,
      isEditorsPick: true,
      isNewRelease: false
    }
  }
];

// Data Fetching Simulators
export async function getFeaturedBooks(): Promise<Book[]> {
  return mockCatalog.filter(book => book.flags.isFeatured);
}

export async function getEditorsPicks(): Promise<Book[]> {
  return mockCatalog.filter(book => book.flags.isEditorsPick);
}

export async function getComingSoonBooks(): Promise<Book[]> {
  return mockCatalog.filter(book => book.flags.isComingSoon);
}

export async function getBookBySlug(slug: string): Promise<Book | undefined> {
  return mockCatalog.find(book => book.slug === slug);
}

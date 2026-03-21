"use client";

import { useActionState, useMemo, useState } from "react";
import { submitArcRequest, type ArcState } from "@/app/actions/arc";
import type { Book } from "@/lib/mock-cms";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

const initialState: ArcState = {};

export default function ArcForm({ comingSoonBooks }: { comingSoonBooks: Book[] }) {
  const [state, formAction, pending] = useActionState(submitArcRequest, initialState);
  const [format, setFormat] = useState<"digital" | "physical">("digital");
  const defaultSlug = useMemo(() => comingSoonBooks[0]?.slug ?? "", [comingSoonBooks]);

  if (state.success) {
    return (
      <Card>
        <h3 className="font-serif text-xl text-slate-900">Request submitted</h3>
        <p className="mt-2 text-slate-600">
          Your ARC request is pending admin review. You’ll be notified once it is approved.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <form action={formAction} className="grid gap-5">
        {state.error ? (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{state.error}</div>
        ) : null}

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-700" htmlFor="bookSlug">
            Select Title
          </label>
          <select
            id="bookSlug"
            name="bookSlug"
            defaultValue={defaultSlug}
            className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900"
            required
          >
            {comingSoonBooks.length === 0 ? (
              <option value="" disabled>
                No coming soon titles available
              </option>
            ) : null}
            {comingSoonBooks.map((book) => (
              <option key={book.id} value={book.slug}>
                {book.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">Format</span>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="format"
                value="digital"
                checked={format === "digital"}
                onChange={() => setFormat("digital")}
              />
              Digital (ePub/PDF)
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="format"
                value="physical"
                checked={format === "physical"}
                onChange={() => setFormat("physical")}
              />
              Physical copy
            </label>
          </div>
        </div>

        {format === "physical" ? (
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="address">
              Shipping Address
            </label>
            <Input id="address" name="address" placeholder="Street, City, State, ZIP, Country" required />
          </div>
        ) : null}

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-700" htmlFor="notes">
            Notes / Rationale
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900"
            placeholder="e.g. syllabus consideration, trade review request, library evaluation…"
          />
        </div>

        <Button type="submit" disabled={pending || comingSoonBooks.length === 0}>
          {pending ? "Submitting..." : "Submit ARC request"}
        </Button>
      </form>
    </Card>
  );
}

"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitArcRequest } from "@/app/actions/arc";
import { Book } from "@/lib/mock-cms";
import { useState } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full bg-foreground text-background font-bold uppercase tracking-widest text-sm py-4 rounded hover:bg-slate-800 disabled:opacity-50 transition-colors"
    >
      {pending ? "Submitting..." : "Submit ARC Request"}
    </button>
  );
}

const initialState = { error: "", success: false };

export default function ArcForm({ comingSoonBooks }: { comingSoonBooks: Book[] }) {
  // @ts-ignore
  const [state, formAction] = useFormState(submitArcRequest, initialState);
  const [format, setFormat] = useState<"digital" | "physical">("digital");

  if (state?.success) {
    return (
      <div className="bg-green-50 text-green-800 p-6 rounded-md border border-green-200">
        <h3 className="font-bold mb-2">Request Submitted Successfully</h3>
        <p className="text-sm">Your ARC request is now pending admin review. You will be notified once it is approved.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col space-y-6">
      {state?.error && (
        <div className="bg-red-50 text-red-800 p-4 rounded text-sm font-medium">
          {state.error}
        </div>
      )}

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-semibold text-slate-700">Select Title</label>
        <select name="bookSlug" required className="px-4 py-3 rounded-md border border-slate-300 bg-white">
          <option value="">-- Choose a Coming Soon Title --</option>
          {comingSoonBooks.map(book => (
            <option key={book.id} value={book.slug}>{book.title}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-semibold text-slate-700">Format</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="format" value="digital" checked={format === "digital"} onChange={() => setFormat("digital")} />
            Digital (ePub/PDF)
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="format" value="physical" checked={format === "physical"} onChange={() => setFormat("physical")} />
            Physical Copy
          </label>
        </div>
      </div>

      {format === "physical" && (
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-slate-700">Shipping Address</label>
          <textarea name="address" rows={3} required className="px-4 py-2 rounded-md border border-slate-300 w-full" placeholder="Full shipping address..." />
        </div>
      )}

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-semibold text-slate-700">Notes / Rationale</label>
        <textarea name="notes" rows={2} className="px-4 py-2 rounded-md border border-slate-300 w-full" placeholder="e.g. Planning to review for X publication, or consider for Fall Syllabus..." />
      </div>

      <SubmitButton />
    </form>
  );
}

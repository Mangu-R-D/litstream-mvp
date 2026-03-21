"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

const initialState: LoginState = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="font-serif text-3xl leading-tight text-slate-900">Partner Portal</h1>
        <p className="mt-2 max-w-prose text-slate-600">
          Sign in to request Advance Reader Copies (ARCs) and access wholesale resources.
        </p>
      </div>

      <Card className="max-w-xl">
        <form action={formAction} className="grid gap-4">
          {state.error ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{state.error}</div>
          ) : null}

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="email">
              Institution or Partner Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@organization.org"
              autoComplete="email"
              required
            />
            <p className="text-xs text-slate-500">
              Hint: try <span className="font-mono">admin@mangupublishing.com</span> or{" "}
              <span className="font-mono">professor@university.edu</span>.
            </p>
          </div>

          <Button type="submit" disabled={pending}>
            {pending ? "Verifying..." : "Access Portal"}
          </Button>
        </form>
      </Card>

      <p className="text-sm text-slate-600">For academic, library, or trade access, please contact us.</p>
    </div>
  );
}

"use client";

import { useActionState } from "react";
import { login } from "@/lib/admin/auth-actions";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-unir-mist/40 px-4">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-2xl border border-unir-mist bg-white p-8 shadow-sm"
      >
        <h1 className="font-heading text-2xl font-semibold text-unir-ink">Painel administrativo</h1>
        <p className="mt-1 text-sm text-unir-slate">Uniradiologia Academy</p>

        <div className="mt-6">
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-unir-ink">
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            className="w-full rounded-lg border border-unir-mist px-3 py-2 text-sm outline-none focus:border-unir-amber focus:ring-2 focus:ring-unir-amber/30"
          />
        </div>

        {state?.error && <p className="mt-3 text-sm text-destructive">{state.error}</p>}

        <Button type="submit" size="lg" disabled={pending} className="mt-6 w-full">
          {pending ? "Entrando…" : "Entrar"}
        </Button>
      </form>
    </div>
  );
}

import Link from "next/link";
import { verifySession } from "@/lib/admin/session";
import { logout } from "@/lib/admin/auth-actions";
import { Button } from "@/components/ui/button";

const SECOES = [
  { href: "/admin", label: "Início" },
  { href: "/admin/cursos", label: "Cursos" },
  { href: "/admin/noticias", label: "Notícias" },
  { href: "/admin/faq", label: "FAQ" },
  { href: "/admin/recursos", label: "Recursos" },
  { href: "/admin/galeria", label: "Galeria de fotos" },
  { href: "/admin/textos", label: "Textos do site" },
  { href: "/admin/configuracoes", label: "Configurações" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await verifySession();

  return (
    <div className="min-h-screen bg-unir-mist/30">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-unir-mist bg-white px-4 py-3 sm:px-6">
        <div>
          <p className="font-heading text-lg font-semibold text-unir-ink">Painel administrativo</p>
          <p className="text-xs text-unir-slate">Uniradiologia Academy</p>
        </div>
        <form action={logout}>
          <Button type="submit" variant="outline" size="sm">
            Sair
          </Button>
        </form>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row">
        <nav className="flex shrink-0 flex-row flex-wrap gap-1 md:w-56 md:flex-col">
          {SECOES.map((secao) => (
            <Link
              key={secao.href}
              href={secao.href}
              prefetch={false}
              className="rounded-lg px-3 py-2 text-sm font-medium text-unir-slate hover:bg-white hover:text-unir-ink"
            >
              {secao.label}
            </Link>
          ))}
        </nav>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

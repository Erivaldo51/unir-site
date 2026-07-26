import Link from "next/link";
import { getContent } from "@/lib/content-store";

const CARDS = [
  { href: "/admin/cursos", label: "Cursos", desc: "Nome, preço, capa, link de checkout, destaque" },
  { href: "/admin/noticias", label: "Notícias", desc: "Fontes externas de notícias e atualidades" },
  { href: "/admin/faq", label: "FAQ", desc: "Perguntas frequentes" },
  { href: "/admin/recursos", label: "Recursos", desc: "Livros, eventos e equipamentos recomendados" },
  { href: "/admin/galeria", label: "Galeria de fotos", desc: "Fotos de eventos e treinamentos" },
  { href: "/admin/textos", label: "Textos do site", desc: "Hero, Quem Somos, Contato, rodapé, menu" },
  { href: "/admin/configuracoes", label: "Configurações", desc: "WhatsApp, redes sociais, endereço, CNPJ, GA4/Pixel" },
];

export default async function AdminDashboardPage() {
  const content = await getContent();

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-unir-ink">O que você quer editar?</h1>
      <p className="mt-1 text-sm text-unir-slate">
        {content.cursos.length} cursos · {content.noticias.length} notícias · {content.faq.length} perguntas ·{" "}
        {content.galeria.length} fotos na galeria
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            prefetch={false}
            className="rounded-xl border border-unir-mist bg-white p-5 transition-colors hover:border-unir-amber"
          >
            <p className="font-medium text-unir-ink">{card.label}</p>
            <p className="mt-1 text-sm text-unir-slate">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

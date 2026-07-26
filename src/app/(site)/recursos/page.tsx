import type { Metadata } from "next";
import { ExternalLinkList } from "@/components/external-link-list";
import { getContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "Recursos",
  description: "Livros, eventos e equipamentos recomendados para profissionais de radiologia.",
};

export default async function RecursosPage() {
  const { afiliados } = await getContent();

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-4xl font-semibold text-unir-ink">Recursos recomendados</h1>
      <p className="mt-4 text-unir-slate">
        Uma curadoria de livros, eventos e equipamentos relacionados à radiologia que recomendamos
        para quem quer se aprofundar na área.
      </p>
      <div className="mt-10">
        <ExternalLinkList
          items={afiliados}
          emptyLabel="Estamos preparando essa curadoria — em breve, novidades por aqui."
        />
      </div>
    </section>
  );
}

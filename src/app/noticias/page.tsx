import type { Metadata } from "next";
import { ExternalLinkList } from "@/components/external-link-list";
import { fontesNoticias } from "@/data/noticias";

export const metadata: Metadata = {
  title: "Notícias",
  description: "Fontes de notícias e atualidades sobre radiologia e a área médica.",
};

export default function NoticiasPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-4xl font-semibold text-unir-ink">Notícias e atualidades</h1>
      <p className="mt-4 text-unir-slate">
        Fique por dentro do que acontece na radiologia e na área médica através dos principais
        sites de comunicação do setor.
      </p>
      <div className="mt-10">
        <ExternalLinkList
          items={fontesNoticias}
          emptyLabel="Estamos organizando as fontes de notícias — em breve, novidades por aqui."
        />
      </div>
    </section>
  );
}

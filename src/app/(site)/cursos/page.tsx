import type { Metadata } from "next";
import { CourseCard } from "@/components/course-card";
import { getContent } from "@/lib/content-store";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cursos",
  description:
    "Conheça os cursos de qualificação profissional em radiologia da Uniradiologia Academy: Tomografia Computadorizada, Proteção Radiológica, PPR e Nefroproteção.",
};

export default async function CursosPage() {
  const { cursos, textos } = await getContent();
  const cursosDisponiveis = cursos.filter((c) => c.checkoutUrl !== null);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: cursosDisponiveis.map((curso, index) => ({
              "@type": "Course",
              position: index + 1,
              name: curso.nome,
              description: curso.resumo,
              url: `${SITE_URL}/cursos`,
              provider: {
                "@type": "Organization",
                name: "Uniradiologia Academy",
                sameAs: SITE_URL,
              },
            })),
          }),
        }}
      />

      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h1 className="font-heading text-4xl font-semibold text-unir-ink">Nossos cursos</h1>
        <p className="mt-4 text-unir-slate">
          Formação prática e direta ao ponto, pensada para quem já atua ou já tem formação na área
          da radiologia e quer se atualizar para o mercado de trabalho.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cursos.map((curso) => (
          <CourseCard key={curso.slug} curso={curso} labels={textos.botoes} />
        ))}
      </div>
    </section>
  );
}

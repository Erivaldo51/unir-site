import type { Metadata } from "next";
import { CourseCard } from "@/components/course-card";
import { getContent } from "@/lib/content-store";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cursos",
  description:
    "14 cursos de qualificação profissional em radiologia: Tomografia, Ressonância Magnética, Mamografia, Densitometria Óssea, Angiotomografia, Proteção Radiológica, Enfermagem no CDI e mais. 100% online ou presencial em João Pessoa.",
  alternates: {
    canonical: `${SITE_URL}/cursos`,
  },
};

// Extrai o valor numérico de strings como "R$ 297,00 (PIX ou parcelado no cartão)" -> 297.00
function precoNumerico(preco: string | null): number | null {
  if (!preco) return null;
  const match = preco.match(/(\d{1,3}(?:\.\d{3})*),?(\d{2})?/);
  if (!match) return null;
  const inteiro = match[1].replace(/\./g, "");
  const centavos = match[2] ?? "00";
  return Number(`${inteiro}.${centavos}`);
}

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
            itemListElement: cursosDisponiveis.map((curso, index) => {
              const valor = precoNumerico(curso.preco);
              return {
                "@type": "Course",
                position: index + 1,
                name: curso.nome,
                description: curso.resumo,
                url: curso.checkoutUrl ?? `${SITE_URL}/cursos`,
                image: curso.imagem,
                provider: {
                  "@type": "Organization",
                  name: "Uniradiologia Academy",
                  sameAs: SITE_URL,
                },
                hasCourseInstance: {
                  "@type": "CourseInstance",
                  courseMode: curso.modalidade === "Online" ? "online" : "onsite",
                },
                ...(valor !== null && {
                  offers: {
                    "@type": "Offer",
                    price: valor.toFixed(2),
                    priceCurrency: "BRL",
                    url: curso.checkoutUrl,
                    availability: "https://schema.org/InStock",
                  },
                }),
              };
            }),
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

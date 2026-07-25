import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "A UNIRadiologia foi fundada em 2017 por Erivaldo Martins, com a intenção de viabilizar educação continuada e prestação de serviços na área da radiologia.",
};

export default function QuemSomosPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-center font-heading text-4xl font-semibold text-unir-ink">Quem somos</h1>

      <div className="mt-8 space-y-5 text-unir-slate">
        <p>
          A UNIRadiologia foi fundada em 2017 por Erivaldo Martins, com a intenção de viabilizar
          educação continuada e prestação de serviços na área da radiologia.
        </p>
        <p>
          Desde então, temos desenvolvido eventos, cursos e prestação de serviços na área
          radiológica — sempre unindo teoria e prática para quem já atua ou está se atualizando
          para o mercado de trabalho.
        </p>
        <p>
          Somos uma empresa que fornece cursos e serviços na área da radiologia, com destaque para
          a formação prática em Tomografia Computadorizada, realizada dentro do Hospital São
          Vicente de Paulo, e para os cursos e materiais online de Proteção Radiológica, Plano de
          Proteção Radiológica (PPR) e Protocolo de Nefroproteção.
        </p>
      </div>
    </section>
  );
}

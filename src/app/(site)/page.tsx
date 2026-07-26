import Link from "next/link";
import { Hero } from "@/components/hero";
import { CourseCard } from "@/components/course-card";
import { CredibilitySection } from "@/components/credibility-section";
import { FaqSection } from "@/components/faq-section";
import { getContent } from "@/lib/content-store";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function Home() {
  const content = await getContent();
  const cursosDestaque = content.cursos.filter((c) => c.destaque);
  const cursosDisponiveis = content.cursos.filter((c) => c.checkoutUrl !== null);
  const destaques = cursosDestaque.length > 0 ? cursosDestaque : cursosDisponiveis.slice(0, 3);

  return (
    <>
      <Hero textos={content.textos.hero} whatsappNumber={content.config.whatsappNumber} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="font-heading text-3xl font-semibold text-unir-ink">Cursos em destaque</h2>
          <Link href="/cursos" className={cn(buttonVariants({ variant: "outline" }))}>
            {content.textos.botoes.homeVerTodos}
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destaques.map((curso) => (
            <CourseCard key={curso.slug} curso={curso} labels={content.textos.botoes} />
          ))}
        </div>
      </section>

      <CredibilitySection textos={content.textos.home} galeria={content.galeria} />

      <FaqSection perguntas={content.faq} />
    </>
  );
}

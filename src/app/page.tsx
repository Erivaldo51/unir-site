import Link from "next/link";
import { Hero } from "@/components/hero";
import { CourseCard } from "@/components/course-card";
import { CredibilitySection } from "@/components/credibility-section";
import { FaqSection } from "@/components/faq-section";
import { cursosDestaque, cursosDisponiveis } from "@/data/cursos";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  const destaques = cursosDestaque.length > 0 ? cursosDestaque : cursosDisponiveis.slice(0, 3);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="font-heading text-3xl font-semibold text-unir-ink">Cursos em destaque</h2>
          <Link href="/cursos" className={cn(buttonVariants({ variant: "outline" }))}>
            Ver todos
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destaques.map((curso) => (
            <CourseCard key={curso.slug} curso={curso} />
          ))}
        </div>
      </section>

      <CredibilitySection />

      <FaqSection />
    </>
  );
}

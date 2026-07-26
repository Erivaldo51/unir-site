import { notFound } from "next/navigation";
import { getContent } from "@/lib/content-store";
import { CursoForm } from "@/components/admin/curso-form";

export default async function EditarCursoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { cursos } = await getContent();
  const curso = cursos.find((c) => c.slug === slug);

  if (!curso) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-unir-ink">Editar curso</h1>
      <div className="mt-6">
        <CursoForm curso={curso} />
      </div>
    </div>
  );
}

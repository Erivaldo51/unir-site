import { notFound } from "next/navigation";
import { getContent } from "@/lib/content-store";
import { RecursoForm } from "@/components/admin/recurso-form";

export default async function EditarRecursoPage({ params }: { params: Promise<{ index: string }> }) {
  const { index } = await params;
  const i = Number(index);
  const { afiliados } = await getContent();
  const item = afiliados[i];

  if (!item) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-unir-ink">Editar recurso</h1>
      <div className="mt-6">
        <RecursoForm item={item} index={i} />
      </div>
    </div>
  );
}

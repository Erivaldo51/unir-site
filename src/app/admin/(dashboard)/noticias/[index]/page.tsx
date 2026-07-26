import { notFound } from "next/navigation";
import { getContent } from "@/lib/content-store";
import { NoticiaForm } from "@/components/admin/noticia-form";

export default async function EditarNoticiaPage({ params }: { params: Promise<{ index: string }> }) {
  const { index } = await params;
  const i = Number(index);
  const { noticias } = await getContent();
  const item = noticias[i];

  if (!item) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-unir-ink">Editar fonte de notícia</h1>
      <div className="mt-6">
        <NoticiaForm item={item} index={i} />
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import { getContent } from "@/lib/content-store";
import { FaqForm } from "@/components/admin/faq-form";

export default async function EditarFaqPage({ params }: { params: Promise<{ index: string }> }) {
  const { index } = await params;
  const i = Number(index);
  const { faq } = await getContent();
  const item = faq[i];

  if (!item) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-unir-ink">Editar pergunta</h1>
      <div className="mt-6">
        <FaqForm item={item} index={i} />
      </div>
    </div>
  );
}

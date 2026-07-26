import Link from "next/link";
import { getContent } from "@/lib/content-store";
import { deleteFaq } from "@/lib/admin/content-actions";
import { Button } from "@/components/ui/button";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { StatusBanner } from "@/components/admin/status-banner";

export default async function AdminFaqPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const { faq } = await getContent();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-unir-ink">Perguntas frequentes</h1>
        <Link href="/admin/faq/novo" prefetch={false}>
          <Button>Nova pergunta</Button>
        </Link>
      </div>

      <div className="mt-4">
        <StatusBanner status={status} />
      </div>

      <div className="mt-6 divide-y divide-unir-mist rounded-xl border border-unir-mist bg-white">
        {faq.length === 0 && <p className="p-5 text-sm text-unir-slate">Nenhuma pergunta cadastrada.</p>}
        {faq.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-4 p-4">
            <p className="min-w-0 truncate font-medium text-unir-ink">{item.pergunta}</p>
            <div className="flex shrink-0 items-center gap-2">
              <Link href={`/admin/faq/${index}`} prefetch={false}>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </Link>
              <form action={deleteFaq}>
                <input type="hidden" name="index" value={index} />
                <ConfirmSubmitButton confirmMessage="Excluir esta pergunta?">Excluir</ConfirmSubmitButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

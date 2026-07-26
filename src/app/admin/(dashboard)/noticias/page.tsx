import Link from "next/link";
import { getContent } from "@/lib/content-store";
import { deleteNoticia } from "@/lib/admin/content-actions";
import { Button } from "@/components/ui/button";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { StatusBanner } from "@/components/admin/status-banner";

export default async function AdminNoticiasPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const { noticias } = await getContent();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-unir-ink">Notícias</h1>
        <Link href="/admin/noticias/novo" prefetch={false}>
          <Button>Nova fonte</Button>
        </Link>
      </div>

      <div className="mt-4">
        <StatusBanner status={status} />
      </div>

      <div className="mt-6 divide-y divide-unir-mist rounded-xl border border-unir-mist bg-white">
        {noticias.length === 0 && <p className="p-5 text-sm text-unir-slate">Nenhuma fonte cadastrada.</p>}
        {noticias.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <p className="truncate font-medium text-unir-ink">{item.titulo}</p>
              <p className="truncate text-sm text-unir-slate">{item.url}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link href={`/admin/noticias/${index}`} prefetch={false}>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </Link>
              <form action={deleteNoticia}>
                <input type="hidden" name="index" value={index} />
                <ConfirmSubmitButton confirmMessage={`Excluir "${item.titulo}"?`}>Excluir</ConfirmSubmitButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

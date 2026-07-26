import Link from "next/link";
import { getContent } from "@/lib/content-store";
import { deleteRecurso } from "@/lib/admin/content-actions";
import { Button } from "@/components/ui/button";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { StatusBanner } from "@/components/admin/status-banner";

export default async function AdminRecursosPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const { afiliados } = await getContent();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-unir-ink">Recursos recomendados</h1>
        <Link href="/admin/recursos/novo" prefetch={false}>
          <Button>Novo recurso</Button>
        </Link>
      </div>

      <div className="mt-4">
        <StatusBanner status={status} />
      </div>

      <div className="mt-6 divide-y divide-unir-mist rounded-xl border border-unir-mist bg-white">
        {afiliados.length === 0 && <p className="p-5 text-sm text-unir-slate">Nenhum recurso cadastrado.</p>}
        {afiliados.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <p className="truncate font-medium text-unir-ink">{item.titulo}</p>
              <p className="text-sm text-unir-slate">{item.categoria}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link href={`/admin/recursos/${index}`} prefetch={false}>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </Link>
              <form action={deleteRecurso}>
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

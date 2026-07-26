import Link from "next/link";
import { getContent } from "@/lib/content-store";
import { deleteCurso } from "@/lib/admin/content-actions";
import { Button } from "@/components/ui/button";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { StatusBanner } from "@/components/admin/status-banner";

export default async function AdminCursosPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const { cursos } = await getContent();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-unir-ink">Cursos</h1>
        <Link href="/admin/cursos/novo">
          <Button>Novo curso</Button>
        </Link>
      </div>

      <div className="mt-4">
        <StatusBanner status={status} />
      </div>

      <div className="mt-6 divide-y divide-unir-mist rounded-xl border border-unir-mist bg-white">
        {cursos.length === 0 && <p className="p-5 text-sm text-unir-slate">Nenhum curso cadastrado.</p>}
        {cursos.map((curso) => (
          <div key={curso.slug} className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="font-medium text-unir-ink">
                {curso.nome} {curso.destaque && <span className="ml-1 text-xs text-unir-amber-press">(destaque)</span>}
              </p>
              <p className="text-sm text-unir-slate">
                {curso.modalidade} · {curso.preco ?? "Consultar valor"}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link href={`/admin/cursos/${curso.slug}`}>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </Link>
              <form action={deleteCurso}>
                <input type="hidden" name="slug" value={curso.slug} />
                <ConfirmSubmitButton confirmMessage={`Excluir o curso "${curso.nome}"?`}>
                  Excluir
                </ConfirmSubmitButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { getContent } from "@/lib/content-store";
import { deleteFoto } from "@/lib/admin/content-actions";
import { GaleriaUploader } from "@/components/admin/galeria-uploader";
import { StatusBanner } from "@/components/admin/status-banner";

export default async function AdminGaleriaPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const { galeria } = await getContent();

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-unir-ink">Galeria de fotos</h1>
      <p className="mt-1 text-sm text-unir-slate">
        Aparece na home, na seção &quot;Nossos alunos em ação&quot;.
      </p>

      <div className="mt-4">
        <StatusBanner status={status} />
      </div>

      <div className="mt-6">
        <GaleriaUploader />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {galeria.map((foto, index) => (
          <div key={foto.src} className="group relative aspect-square overflow-hidden rounded-xl border border-unir-mist">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={foto.src} alt={foto.alt} className="size-full object-cover" />
            <form action={deleteFoto} className="absolute right-1.5 top-1.5">
              <input type="hidden" name="index" value={index} />
              <button
                type="submit"
                className="rounded-full bg-black/60 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                Excluir
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

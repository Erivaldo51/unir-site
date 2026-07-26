import Image from "next/image";
import type { SiteContent, FotoGaleria } from "@/lib/content-store";

export function CredibilitySection({
  textos,
  galeria,
}: {
  textos: SiteContent["textos"]["home"];
  galeria: FotoGaleria[];
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-semibold text-unir-ink">{textos.credibilidadeTitulo}</h2>
        <p className="mt-4 text-unir-slate">{textos.credibilidadeTexto}</p>
      </div>

      {galeria.length > 0 ? (
        <>
          <h3 className="mt-14 text-center font-heading text-2xl font-semibold text-unir-ink">
            {textos.galeriaTitulo}
          </h3>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {galeria.map((foto) => (
              <div key={foto.src} className="relative aspect-square overflow-hidden rounded-xl bg-unir-mist">
                <Image src={foto.src} alt={foto.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-10 text-center text-sm text-unir-gray">
          Galeria de fotos de eventos e treinamentos em breve.
        </p>
      )}
    </section>
  );
}

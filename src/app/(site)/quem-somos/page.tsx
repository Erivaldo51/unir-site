import type { Metadata } from "next";
import Image from "next/image";
import { getContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "A UNIRadiologia foi fundada em 2017 por Erivaldo Martins, com a intenção de viabilizar educação continuada e prestação de serviços na área da radiologia.",
};

export default async function QuemSomosPage() {
  const { textos } = await getContent();
  const { quemSomos } = textos;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-center font-heading text-4xl font-semibold text-unir-ink">Quem somos</h1>

      <div className="mt-8 flex flex-col items-center">
        <div className="relative size-32 overflow-hidden rounded-full ring-4 ring-unir-amber">
          <Image src={quemSomos.fundadorFoto} alt={quemSomos.fundadorNome} fill className="object-cover" />
        </div>
        <p className="mt-3 font-heading text-lg font-semibold text-unir-ink">{quemSomos.fundadorNome}</p>
        <p className="text-sm text-unir-gray">{quemSomos.fundadorCargo}</p>
      </div>

      <div className="mt-8 space-y-5 text-unir-slate">
        {quemSomos.paragrafos.map((paragrafo, index) => (
          <p key={index}>{paragrafo}</p>
        ))}
      </div>
    </section>
  );
}

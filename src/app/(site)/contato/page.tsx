import type { Metadata } from "next";
import { MapPin, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/icons/brand-icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { WhatsappTrackedLink } from "@/components/whatsapp-tracked-link";
import { getContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Uniradiologia Academy pelo WhatsApp, Instagram ou visite nossa unidade em João Pessoa - PB.",
};

export default async function ContatoPage() {
  const { textos, config } = await getContent();
  const { contato } = textos;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-4xl font-semibold text-unir-ink">{contato.titulo}</h1>
      <p className="mt-4 text-unir-slate">{contato.intro}</p>

      <div className="mt-8 grid gap-4">
        <WhatsappTrackedLink
          href={buildWhatsappLink(config.whatsappNumber, config.whatsappMensagemPadrao)}
          origem="contato"
          className="flex items-center gap-4 rounded-xl border border-unir-mist bg-white p-5 transition-colors hover:border-unir-amber"
        >
          <MessageCircle className="size-6 text-state-success" />
          <div>
            <p className="font-medium text-unir-ink">WhatsApp</p>
            <p className="text-sm text-unir-slate">{contato.textoWhatsapp}</p>
          </div>
        </WhatsappTrackedLink>

        <a
          href={config.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-xl border border-unir-mist bg-white p-5 transition-colors hover:border-unir-amber"
        >
          <InstagramIcon className="size-6 text-unir-amber-press" />
          <div>
            <p className="font-medium text-unir-ink">Instagram</p>
            <p className="text-sm text-unir-slate">{contato.textoInstagramHandle}</p>
          </div>
        </a>

        <a
          href={config.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-xl border border-unir-mist bg-white p-5 transition-colors hover:border-unir-amber"
        >
          <MapPin className="size-6 text-unir-amber-press" />
          <div>
            <p className="font-medium text-unir-ink">Endereço</p>
            <p className="text-sm text-unir-slate">{config.address}</p>
          </div>
        </a>
      </div>

      <div className="mt-10 rounded-xl bg-unir-mist/40 p-5 text-sm text-unir-slate">
        <p>
          {contato.textoGrupo}{" "}
          <a href={config.whatsappGrupoUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-unir-ink underline">
            {contato.textoLinkGrupo}
          </a>
          .
        </p>
      </div>

      <p className="mt-10 text-center text-xs text-unir-gray">CNPJ {config.cnpj}</p>

      <div className="mt-6 flex justify-center">
        <WhatsappTrackedLink
          href={buildWhatsappLink(config.whatsappNumber)}
          origem="contato_cta_final"
          className={cn(buttonVariants({ size: "lg" }))}
        >
          {contato.textoBotaoFinal}
        </WhatsappTrackedLink>
      </div>
    </section>
  );
}

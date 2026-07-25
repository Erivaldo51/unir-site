import type { Metadata } from "next";
import { MapPin, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/icons/brand-icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { ADDRESS, CNPJ, INSTAGRAM_URL, MAPS_URL, WHATSAPP_GROUP_TOMOGRAFIA_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Uniradiologia Academy pelo WhatsApp, Instagram ou visite nossa unidade em João Pessoa - PB.",
};

export default function ContatoPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-4xl font-semibold text-unir-ink">Fale com a gente</h1>
      <p className="mt-4 text-unir-slate">
        A forma mais rápida de tirar dúvidas é falando com a Bianca, nossa atendente virtual no
        WhatsApp — ela responde na hora.
      </p>

      <div className="mt-8 grid gap-4">
        <a
          href={buildWhatsappLink("Olá! Vim pelo site e gostaria de saber mais sobre os cursos.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-xl border border-unir-mist bg-white p-5 transition-colors hover:border-unir-amber"
        >
          <MessageCircle className="size-6 text-state-success" />
          <div>
            <p className="font-medium text-unir-ink">WhatsApp</p>
            <p className="text-sm text-unir-slate">Fale agora com a Bianca</p>
          </div>
        </a>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-xl border border-unir-mist bg-white p-5 transition-colors hover:border-unir-amber"
        >
          <InstagramIcon className="size-6 text-unir-ink" />
          <div>
            <p className="font-medium text-unir-ink">Instagram</p>
            <p className="text-sm text-unir-slate">@uniradiologia</p>
          </div>
        </a>

        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-xl border border-unir-mist bg-white p-5 transition-colors hover:border-unir-amber"
        >
          <MapPin className="size-6 text-unir-ink" />
          <div>
            <p className="font-medium text-unir-ink">Endereço</p>
            <p className="text-sm text-unir-slate">{ADDRESS}</p>
          </div>
        </a>
      </div>

      <div className="mt-10 rounded-xl bg-unir-mist/40 p-5 text-sm text-unir-slate">
        <p>
          Quer receber novidades sobre turmas e vagas do curso de Tomografia Computadorizada?{" "}
          <a href={WHATSAPP_GROUP_TOMOGRAFIA_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-unir-ink underline">
            Entre no nosso grupo de divulgação
          </a>
          .
        </p>
      </div>

      <p className="mt-10 text-center text-xs text-unir-gray">CNPJ {CNPJ}</p>

      <div className="mt-6 flex justify-center">
        <a href={buildWhatsappLink()} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ size: "lg" }))}>
          Falar com a Bianca agora
        </a>
      </div>
    </section>
  );
}

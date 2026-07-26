import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { WhatsappTrackedLink } from "@/components/whatsapp-tracked-link";
import type { SiteContent } from "@/lib/content-store";

export function Hero({
  textos,
  whatsappNumber,
}: {
  textos: SiteContent["textos"]["hero"];
  whatsappNumber: string;
}) {
  return (
    <section className="relative overflow-hidden bg-unir-ink">
      <Image
        src="/galeria/evento-21.jpg"
        alt="Técnico operando o workstation de tomografia computadorizada"
        fill
        priority
        className="object-cover opacity-40"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-unir-ink via-unir-ink/90 to-unir-ink/40" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-20 sm:px-6 sm:py-28">
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white/80">
          {textos.selo}
        </span>
        <h1 className="max-w-2xl font-heading text-4xl font-semibold leading-tight text-white sm:text-5xl">
          {textos.titulo}
        </h1>
        <p className="max-w-xl text-lg text-white/70">{textos.subtitulo}</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/cursos" className={cn(buttonVariants({ size: "lg" }), "px-6 text-base")}>
            {textos.ctaVerCursos}
          </Link>
          <WhatsappTrackedLink
            href={buildWhatsappLink(whatsappNumber, "Olá! Vim pelo site e gostaria de saber mais sobre os cursos.")}
            origem="hero"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-white/20 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white"
            )}
          >
            {textos.ctaWhatsapp}
          </WhatsappTrackedLink>
        </div>
      </div>
    </section>
  );
}

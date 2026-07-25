import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/icons/brand-icons";
import {
  ADDRESS,
  CNPJ,
  INSTAGRAM_URL,
  LEGAL_NAME,
  MAPS_URL,
  SITE_NAME,
  YOUTUBE_URL,
} from "@/lib/site-config";
import { buildWhatsappLink } from "@/lib/whatsapp";

export function SiteFooter() {
  const ano = new Date().getFullYear();

  return (
    <footer className="border-t border-unir-mist bg-unir-mist/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Image
            src="/identidade/unir-logo-horizontal.svg"
            alt={SITE_NAME}
            width={170}
            height={34}
            className="mb-3 h-8 w-auto"
          />
          <p className="text-sm text-unir-slate">
            Educação continuada e prestação de serviços na área da radiologia, desde 2017.
          </p>
        </div>

        <div className="text-sm text-unir-slate">
          <h3 className="mb-3 font-heading text-sm font-semibold text-unir-ink">Contato</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 size-4 shrink-0" />
              <a href={buildWhatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-unir-ink">
                Fale com a Bianca no WhatsApp
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-unir-ink">
                {ADDRESS}
              </a>
            </li>
          </ul>
        </div>

        <div className="text-sm text-unir-slate">
          <h3 className="mb-3 font-heading text-sm font-semibold text-unir-ink">Redes sociais</h3>
          <div className="flex items-center gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-unir-mist p-2 hover:bg-white"
            >
              <InstagramIcon className="size-4" />
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="rounded-full border border-unir-mist p-2 hover:bg-white"
            >
              <YoutubeIcon className="size-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-unir-mist px-4 py-4 text-center text-xs text-unir-gray sm:px-6">
        <p>
          © {ano} {LEGAL_NAME} — CNPJ {CNPJ}
        </p>
        <p className="mt-1">
          <Link href="/recursos" className="hover:text-unir-slate">Recursos</Link>
          {" · "}
          <Link href="/noticias" className="hover:text-unir-slate">Notícias</Link>
        </p>
      </div>
    </footer>
  );
}

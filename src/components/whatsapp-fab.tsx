import { MessageCircle } from "lucide-react";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { WhatsappTrackedLink } from "@/components/whatsapp-tracked-link";

export function WhatsappFab() {
  return (
    <WhatsappTrackedLink
      href={buildWhatsappLink("Olá! Vim pelo site e gostaria de saber mais sobre os cursos.")}
      origem="fab"
      ariaLabel="Falar com a Bianca no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-state-success px-4 py-3 text-white shadow-lg shadow-black/15 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-state-success"
    >
      <MessageCircle className="size-5" />
      <span className="hidden text-sm font-semibold sm:inline">Falar com a Bianca</span>
    </WhatsappTrackedLink>
  );
}

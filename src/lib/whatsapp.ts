import { WHATSAPP_NUMBER } from "@/lib/site-config";

export function buildWhatsappLink(mensagem?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!mensagem) return base;
  return `${base}?text=${encodeURIComponent(mensagem)}`;
}

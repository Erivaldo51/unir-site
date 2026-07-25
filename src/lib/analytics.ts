// Helper de rastreamento de conversão — dispara pro GA4 (gtag) e pro Meta Pixel (fbq),
// quando disponíveis. Reaproveita os nomes de evento já configurados como eventos-chave
// no GA4 da Uniradiologia (ver memória do projeto): whatsapp_click, generate_lead.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackWhatsappClick(origem: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "whatsapp_click", { origem });
  window.fbq?.("track", "Contact", { content_name: origem });
}

export function trackCheckoutClick(curso: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "generate_lead", { curso });
  window.fbq?.("track", "Lead", { content_name: curso });
}

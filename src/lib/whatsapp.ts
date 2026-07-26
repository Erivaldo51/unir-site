export function buildWhatsappLink(whatsappNumber: string, mensagem?: string): string {
  const base = `https://wa.me/${whatsappNumber}`;
  if (!mensagem) return base;
  return `${base}?text=${encodeURIComponent(mensagem)}`;
}

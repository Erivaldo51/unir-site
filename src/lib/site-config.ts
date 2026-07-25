// Configuração central do site — números, links e IDs em UM lugar só,
// pra trocar em um ponto quando o dado real for confirmado.

export const SITE_NAME = "Uniradiologia Academy";
export const LEGAL_NAME = "Uniradiologia Cursos e Treinamentos";
export const SITE_URL = "https://www.uniradiologiacademy.com.br";
export const CNPJ = "29.011.684/0001-09";
export const ADDRESS = "Av. João Machado, 1234 - Centro, João Pessoa - PB, CEP: 58013-522";

// Confirmado pelo usuário: é o número conectado à instância Evolution API da Bianca.
export const WHATSAPP_NUMBER = "5583986388435";

export const INSTAGRAM_URL = "https://www.instagram.com/uniradiologia/?hl=pt-br";
export const WHATSAPP_GROUP_TOMOGRAFIA_URL = "https://chat.whatsapp.com/CTKnF6E2CfU4KwtgohWIBJ";
export const MAPS_URL = "https://maps.app.goo.gl/EXQkPEkhnPgvr9q99";

// Facebook removido a pedido do usuário — só Instagram e YouTube nas redes sociais.
export const YOUTUBE_URL = "https://www.youtube.com/@ErivaldoMartins-l6t";

// GA4 — measurement ID confirmado da propriedade "Uniradiologia" (analytics.google.com).
export const GA4_MEASUREMENT_ID = "G-VM28X34JLT";

// Meta Pixel — ainda não configurado. Preencha via variável de ambiente
// NEXT_PUBLIC_META_PIXEL_ID quando o usuário fornecer o ID (Gerenciador de Eventos do Meta).
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || null;

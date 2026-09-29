// Identidade do site — baixa frequência de mudança, por isso fica no código
// em vez do painel /admin (que cobre o conteúdo editável com frequência).
// WhatsApp, redes sociais, endereço, CNPJ, GA4/Pixel etc. agora vêm do
// content-store (editáveis em /admin/configuracoes).

export const SITE_NAME = "Uniradiologia Academy";
export const LEGAL_NAME = "Uniradiologia Cursos e Treinamentos";
// Domínio raiz é o canônico (verificado, sem redirect); www. só existe como
// redirect 308 pra cá — nunca aponte URLs (sitemap, OG, JSON-LD) pro www.
export const SITE_URL = "https://uniradiologiacademy.com.br";
export const MEMBROS_URL = "https://app.uniradiologiacademy.com.br";

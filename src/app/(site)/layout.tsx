import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";
import { getContent } from "@/lib/content-store";
import { fontVariables } from "@/lib/fonts";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Cursos de Radiologia`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Cursos de qualificação profissional em radiologia: Tomografia Computadorizada, Proteção Radiológica (RDC 611/22 e NR 32), PPR e Nefroproteção. Fale com a Bianca, nossa atendente virtual, pelo WhatsApp.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Cursos de Radiologia`,
    description:
      "Cursos de qualificação profissional em radiologia: Tomografia Computadorizada, Proteção Radiológica, PPR e Nefroproteção.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Cursos de Radiologia`,
    description:
      "Cursos de qualificação profissional em radiologia: Tomografia Computadorizada, Proteção Radiológica, PPR e Nefroproteção.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();
  const { config, textos } = content;

  return (
    <html lang="pt-BR" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: SITE_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/identidade/unir-logo-horizontal-1200.png`,
              image: `${SITE_URL}/identidade/unir-logo-horizontal-1200.png`,
              telephone: `+${config.whatsappNumber}`,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Av. João Machado, 1234 - Centro",
                addressLocality: "João Pessoa",
                addressRegion: "PB",
                postalCode: "58013-522",
                addressCountry: "BR",
              },
              sameAs: [config.instagramUrl],
            }),
          }}
        />
        <SiteHeader menuItems={textos.menu} ctaVerCursos={textos.botoes.headerVerCursos} />
        <main className="flex-1">{children}</main>
        <SiteFooter institucional={textos.footer.institucional} config={config} />
        <WhatsappFab whatsappNumber={config.whatsappNumber} mensagem={config.whatsappMensagemPadrao} />

        {config.ga4Id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${config.ga4Id}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${config.ga4Id}');
              `}
            </Script>
          </>
        )}

        {config.metaPixelId && (
          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${config.metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}

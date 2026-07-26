import type { Metadata } from "next";
import "../globals.css";
import { fontVariables } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Painel administrativo | Uniradiologia Academy",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}

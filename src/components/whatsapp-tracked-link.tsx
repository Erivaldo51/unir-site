"use client";

import type { ReactNode } from "react";
import { trackWhatsappClick } from "@/lib/analytics";

export function WhatsappTrackedLink({
  href,
  origem,
  className,
  ariaLabel,
  children,
}: {
  href: string;
  origem: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={() => trackWhatsappClick(origem)}
      className={className}
    >
      {children}
    </a>
  );
}

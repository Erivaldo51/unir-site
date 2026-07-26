"use client";

import { Button } from "@/components/ui/button";

export function ConfirmSubmitButton({
  children,
  confirmMessage,
}: {
  children: React.ReactNode;
  confirmMessage: string;
}) {
  return (
    <Button
      type="submit"
      variant="destructive"
      size="sm"
      onClick={(e) => {
        if (!window.confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </Button>
  );
}

"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export default function ApiTokenControls({ token }: { token: string | null }) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <p role="status" className="text-muted-foreground">
          Generating token…
        </p>
      ) : token ? (
        <p data-testid="token-display" className="break-all text-muted-foreground">
          <code data-testid="api-token">{token}</code>
        </p>
      ) : (
        <p data-testid="no-token-message" className="text-muted-foreground">
          You don&apos;t have any!
        </p>
      )}
      <Button data-testid="generate-token-button" type="submit" disabled={pending}>
        Generate New Token
      </Button>
    </>
  );
}

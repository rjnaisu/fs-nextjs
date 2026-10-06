"use client";

import { useActionState } from "react";
import { markBlogAsReadAction } from "@/app/actions/reading-list";
import { Button } from "@/components/ui/button";

export default function MarkAsReadButton({ blogId }: { blogId: number }) {
  const [state, formAction, isPending] = useActionState(markBlogAsReadAction, { error: null });

  return (
    <form action={formAction} className="shrink-0 space-y-2 text-right">
      <input type="hidden" name="blogId" value={blogId} />
      <Button
        data-testid={`mark-read-${blogId}`}
        type="submit"
        variant="outline"
        size="sm"
        disabled={isPending}
      >
        {isPending ? "Marking…" : "Mark as Read"}
      </Button>
      {state.error && (
        <p role="alert" className="max-w-48 text-sm text-destructive">
          {state.error}
        </p>
      )}
    </form>
  );
}

"use client";

import { useActionState } from "react";
import { addToReadingListAction } from "@/app/actions/reading-list";
import { Button } from "@/components/ui/button";

export default function ReadingListButton({
  blogId,
  isSaved,
}: {
  blogId: number;
  isSaved: boolean;
}) {
  const [state, formAction, isPending] = useActionState(addToReadingListAction, { error: null });

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="blogId" value={blogId} />
      <Button type="submit" variant="outline" disabled={isSaved || isPending}>
        {isSaved ? "In your reading list" : isPending ? "Adding…" : "Add to reading list"}
      </Button>
      {state.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}
    </form>
  );
}

"use client";

import { useOptimistic } from "react";

import { likeBlogAction } from "@/app/actions/blogs";
import { Button } from "@/components/ui/button";

export const LikeButton = ({ id, likes }: { id: number; likes: number }) => {
  const [optimisticLikes, addOptimisticLike] = useOptimistic<number, void>(
    likes,
    (currentLikes) => currentLikes + 1,
  );

  return (
    <>
      <p className="text-sm font-medium">Likes: {optimisticLikes}</p>
      <form
        action={async (formData) => {
          addOptimisticLike();
          await likeBlogAction(formData);
        }}
        className="pt-2"
      >
        <input type="hidden" name="id" value={id} />
        <Button type="submit">Like</Button>
      </form>
    </>
  );
};

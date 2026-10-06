"use client";
import { createBlog } from "@/app/actions/blogs";
import { initialCreateBlogState } from "@/app/blogs/new/state";
import { useNotification } from "@/components/NotificationContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialCreateBlogState);
  const [title, setTitle] = useState(state.values.title);
  const [author, setAuthor] = useState(state.values.author);
  const [url, setUrl] = useState(state.values.url);
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created");
      router.push("/blogs");
    }
  }, [router, showNotification, state.success]);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-6 py-8">
      <h2 className="text-2xl font-semibold tracking-normal">Create a new blog</h2>
      <form action={formAction} className="space-y-4">
        <div>
          <Label className="grid gap-2">
            Title
            <Input
              type="text"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </Label>
          {state.errors.title && (
            <p className="mt-2 text-sm font-medium text-destructive">{state.errors.title}</p>
          )}
        </div>
        <div>
          <Label className="grid gap-2">
            Author
            <Input
              type="text"
              name="author"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              required
            />
          </Label>
          {state.errors.author && (
            <p className="mt-2 text-sm font-medium text-destructive">{state.errors.author}</p>
          )}
        </div>
        <div>
          <Label className="grid gap-2">
            Url
            <Input
              type="text"
              name="url"
              aria-label="URL"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              required
            />
          </Label>
          {state.errors.url && (
            <p className="mt-2 text-sm font-medium text-destructive">{state.errors.url}</p>
          )}
        </div>
        <Button data-testid="create-blog-button" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
};

export default NewBlog;

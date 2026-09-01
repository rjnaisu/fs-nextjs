"use client";
import { createBlog } from "@/app/actions/blogs";
import { initialCreateBlogState } from "@/app/blogs/new/state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialCreateBlogState);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-6 py-8">
      <h2 className="text-2xl font-semibold tracking-normal">Create a new blog</h2>
      <form action={formAction} className="space-y-4">
        <div>
          <Label className="grid gap-2">
            Title
            <Input type="text" name="title" defaultValue={state.values?.title} required />
          </Label>
          {state.errors.title && (
            <p className="mt-2 text-sm font-medium text-destructive">{state.errors.title}</p>
          )}
        </div>
        <div>
          <Label className="grid gap-2">
            Author
            <Input type="text" name="author" defaultValue={state.values?.author} required />
          </Label>
          {state.errors.author && (
            <p className="mt-2 text-sm font-medium text-destructive">{state.errors.author}</p>
          )}
        </div>
        <div>
          <Label className="grid gap-2">
            Url
            <Input type="text" name="url" defaultValue={state.values?.url} required />
          </Label>
          {state.errors.url && (
            <p className="mt-2 text-sm font-medium text-destructive">{state.errors.url}</p>
          )}
        </div>
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};

export default NewBlog;

import { notFound } from "next/navigation";
import { getBlogById } from "@/app/services/blogs";
import { likeBlogAction } from "@/app/actions/blogs";
import { Button } from "@/components/ui/button";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 px-6 py-8">
      <p className="text-2xl font-semibold tracking-normal">{blog.title}</p>
      <p className="text-muted-foreground">{blog.author}</p>
      <p className="break-all text-sm text-muted-foreground">{blog.url}</p>
      <p className="text-sm font-medium">Likes: {blog.likes}</p>
      <form action={likeBlogAction} className="pt-2">
        <input type="hidden" name="id" value={blog.id} />
        <Button type="submit">Like</Button>
      </form>
    </div>
  );
};

export default BlogPage;

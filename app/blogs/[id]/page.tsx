import { notFound } from "next/navigation";
import { getBlogById } from "@/app/services/blogs";
import { LikeButton } from "./like-button";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 px-6 py-8">
      <p className="text-2xl font-semibold tracking-normal">{blog.title}</p>
      <p className="text-muted-foreground">{blog.author}</p>
      <p className="break-all text-sm text-muted-foreground">{blog.url}</p>
      <LikeButton id={blog.id} likes={blog.likes} />
    </div>
  );
};

export default BlogPage;

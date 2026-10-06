import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogById } from "@/app/services/blogs";
import { getCurrentUser } from "@/app/services/session";
import { isInReadingList } from "@/app/services/reading-list";
import ReadingListButton from "@/components/ReadingListButton";
import { LikeButton } from "./like-button";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const [blog, user] = await Promise.all([getBlogById(Number(id)), getCurrentUser()]);

  if (!blog) {
    notFound();
  }

  const isSaved = user ? await isInReadingList(user.id, blog.id) : false;

  return (
    <div data-testid="blog-detail" className="mx-auto w-full max-w-3xl space-y-4 px-6 py-8">
      <p data-testid="blog-title" className="text-2xl font-semibold tracking-normal">
        {blog.title}
      </p>
      <p data-testid="blog-author" className="text-muted-foreground">
        {blog.author}
      </p>
      <p className="break-all text-sm text-muted-foreground">{blog.url}</p>
      <LikeButton id={blog.id} likes={blog.likes} />
      {user ? (
        <ReadingListButton blogId={blog.id} isSaved={isSaved} />
      ) : (
        <Link href="/login" className="text-sm underline underline-offset-4">
          Log in to add this blog to your reading list
        </Link>
      )}
    </div>
  );
};

export default BlogPage;

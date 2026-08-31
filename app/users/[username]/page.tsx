import { notFound } from "next/navigation";
import Link from "next/link";
import { getUserWithBlogs } from "@/app/services/users";

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params;
  const user = await getUserWithBlogs(username);

  if (!user) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-6 py-8">
      <h2 className="text-2xl font-semibold tracking-normal">{user.name}</h2>
      <p className="text-muted-foreground">Username: {user.username}</p>
      <h3 className="text-lg font-semibold tracking-normal">Blogs</h3>
      <ul className="divide-y divide-foreground/10 rounded-md border border-foreground/10">
        {user.blogs.map((blog) => (
          <li key={blog.id} className="px-4 py-3 text-sm">
            <Link
              href={`/blogs/${blog.id}`}
              className="font-medium underline-offset-4 hover:underline"
            >
              {blog.title}
            </Link>
            <p className="text-muted-foreground">by {blog.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;

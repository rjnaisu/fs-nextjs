import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MarkAsReadButton from "@/components/MarkAsReadButton";
import { getReadingList } from "@/app/services/reading-list";
import { getCurrentUser } from "../services/session";
import { generateApiToken } from "../actions/users";

const MePage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const readingList = await getReadingList(user.id);
  const unreadBlogs = readingList.filter((blog) => !blog.read);
  const readBlogs = readingList.filter((blog) => blog.read);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-8">
      <div className="space-y-6 rounded-xl border border-border/70 bg-card p-6 text-card-foreground sm:p-8">
        <h1 className="text-2xl font-semibold tracking-normal">My Profile</h1>
        <section aria-labelledby="profile-details-heading" className="space-y-3">
          <p>Name: {user.name}</p>
          <p className="text-muted-foreground">Username: {user.username}</p>
        </section>
        <hr className="border-border/70" />
        <section id="reading-list" aria-labelledby="reading-list-heading" className="space-y-6">
          <h2 id="reading-list-heading" className="text-lg font-semibold">
            Reading List
          </h2>
          <div className="space-y-3">
            <h3 className="font-medium">Unread</h3>
            {unreadBlogs.length === 0 ? (
              <p className="text-sm text-muted-foreground">No unread blogs.</p>
            ) : (
              <ul className="divide-y divide-border rounded-md border">
                {unreadBlogs.map((blog) => (
                  <li
                    key={blog.id}
                    className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                  >
                    <p className="min-w-0 break-words">
                      <Link
                        href={`/blogs/${blog.id}`}
                        className="font-medium underline-offset-4 hover:underline"
                      >
                        {blog.title}
                      </Link>
                      <span className="text-muted-foreground"> by {blog.author}</span>
                    </p>
                    <MarkAsReadButton blogId={blog.id} />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="space-y-3">
            <h3 className="font-medium">Read</h3>
            {readBlogs.length === 0 ? (
              <p className="text-sm text-muted-foreground">No read blogs yet.</p>
            ) : (
              <ul className="divide-y divide-border rounded-md border">
                {readBlogs.map((blog) => (
                  <li key={blog.id} className="px-4 py-3 text-sm">
                    <Link
                      href={`/blogs/${blog.id}`}
                      className="font-medium underline-offset-4 hover:underline"
                    >
                      {blog.title}
                    </Link>
                    <span className="text-muted-foreground"> by {blog.author}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
        <hr className="border-border/70" />
        <section aria-labelledby="api-token-heading" className="space-y-3">
          <h2 id="api-token-heading" className="text-lg font-semibold">
            API Token
          </h2>
          <p className="break-all text-muted-foreground">{user.token ?? "You don't have any!"}</p>
          <form action={generateApiToken}>
            <Button type="submit">Generate New Token</Button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default MePage;

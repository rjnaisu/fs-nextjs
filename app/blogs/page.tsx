import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { getBlogs } from "../services/blogs";

const Blogs = async ({ searchParams }: { searchParams: Promise<{ filter?: string }> }) => {
  const { filter } = await searchParams;
  const blogs = await getBlogs(filter);
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-6 py-8">
      <h2 className="text-2xl font-semibold tracking-normal">Blogs</h2>
      <form action="/blogs" method="get" className="flex items-end gap-3">
        <Label className="grid flex-1 gap-2">
          Search:
          <Input data-testid="filter-input" type="text" name="filter" defaultValue={filter ?? ""} />
        </Label>
        <Button data-testid="search-button" type="submit">
          Submit
        </Button>
      </form>
      <ul
        data-testid="blogs-list"
        className="divide-y divide-foreground/10 rounded-md border border-foreground/10"
      >
        {sortedBlogs.map((blog) => (
          <li key={blog.id} className="space-y-1 px-4 py-3 text-sm">
            <Link
              href={`/blogs/${blog.id}`}
              className="text-lg font-semibold underline-offset-4 hover:underline"
            >
              {blog.title}
            </Link>
            <p className="text-muted-foreground">{blog.author}</p>
            <p className="break-all text-muted-foreground">{blog.url}</p>
            <p className="font-medium">{blog.likes} likes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;

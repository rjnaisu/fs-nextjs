import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { getBlogs } from "../services/blogs";

const Blogs = async ({ searchParams }: { searchParams: Promise<{ filter?: string }> }) => {
  const { filter } = await searchParams;
  const blogs = getBlogs();
  const filterToLower = filter?.toLowerCase() ?? "";

  const filteredBlogs = blogs.filter((blog) => blog.title.toLowerCase().includes(filterToLower));

  const sortedBlogs = [...filteredBlogs].sort((a, b) => b.likes - a.likes);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-6 py-8">
      <h2 className="text-2xl font-semibold tracking-normal">Blogs</h2>
      <form action="/blogs" method="get" className="flex items-end gap-3">
        <Label className="grid flex-1 gap-2">
          Search:
          <Input type="text" name="filter" defaultValue={filter ?? ""} />
        </Label>
        <Button type="submit">Submit</Button>
      </form>
      <ul className="divide-y divide-foreground/10 rounded-md border border-foreground/10">
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
            <p className="font-medium">Likes: {blog.likes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;

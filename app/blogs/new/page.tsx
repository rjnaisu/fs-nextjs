import { createBlog } from "@/app/actions/blogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NewBlog = () => {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-6 py-8">
      <h2 className="text-2xl font-semibold tracking-normal">Create a new blog</h2>
      <form action={createBlog} className="space-y-4">
        <div>
          <Label className="grid gap-2">
            Title
            <Input type="text" name="title" required />
          </Label>
        </div>
        <div>
          <Label className="grid gap-2">
            Author
            <Input type="text" name="author" required />
          </Label>
        </div>
        <div>
          <Label className="grid gap-2">
            Url
            <Input type="text" name="url" required />
          </Label>
        </div>
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};

export default NewBlog;

"use server";
import { revalidatePath } from "next/cache";
import { addBlog, likeBlog } from "../services/blogs";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import type { CreateBlogState } from "@/app/blogs/new/state";

export const createBlog = async (
  _prevState: CreateBlogState,
  formData: FormData,
): Promise<CreateBlogState> => {
  const session = await auth();

  if (!session) {
    redirect("login");
  }

  const title = String(formData.get("title") ?? "");
  const author = String(formData.get("author") ?? "");
  const url = String(formData.get("url") ?? "");
  const errors: CreateBlogState["errors"] = {};

  if (!title || title.length < 5) {
    errors.title = "Title must be at least 5 characters long";
  }
  if (!author || author.length < 5) {
    errors.author = "Author must be at least 5 characters long";
  }
  if (!url || url.length < 5) {
    errors.url = "Url must be at least 5 characters long";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, values: { title, author, url } };
  }

  await addBlog(title, author, url);

  revalidatePath("/blogs");
  revalidatePath("/me");
  return { success: true, errors: {}, values: { title, author, url } };
};

export const likeBlogAction = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await likeBlog(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
  revalidatePath("/me");
};

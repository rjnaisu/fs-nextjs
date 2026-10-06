"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getBlogById } from "@/app/services/blogs";
import { addToReadingList, markBlogAsRead } from "@/app/services/reading-list";
import { getCurrentUser } from "@/app/services/session";

type ReadingListState = {
  error: string | null;
};

export const addToReadingListAction = async (
  _prevState: ReadingListState,
  formData: FormData,
): Promise<ReadingListState> => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const blogId = Number(formData.get("blogId"));
  if (!Number.isSafeInteger(blogId) || blogId <= 0) {
    return { error: "Invalid blog ID" };
  }

  try {
    const blog = await getBlogById(blogId);
    if (!blog) {
      return { error: "Blog not found" };
    }

    await addToReadingList(user.id, blogId);
  } catch {
    return { error: "Unable to add this blog to your reading list. Please try again." };
  }

  revalidatePath("/me");
  revalidatePath(`/blogs/${blogId}`);
  return { error: null };
};

export const markBlogAsReadAction = async (
  _prevState: ReadingListState,
  formData: FormData,
): Promise<ReadingListState> => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const blogId = Number(formData.get("blogId"));
  if (!Number.isSafeInteger(blogId) || blogId <= 0) {
    return { error: "Invalid blog ID" };
  }

  try {
    const [entry] = await markBlogAsRead(user.id, blogId);
    if (!entry) {
      return { error: "This blog is not in your reading list" };
    }
  } catch {
    return { error: "Unable to mark this blog as read. Please try again." };
  }

  revalidatePath("/me");
  return { error: null };
};

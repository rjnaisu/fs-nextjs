import { notFound } from "next/navigation"
import { getBlogById } from "@/app/services/blogs"
import { likeBlogAction } from "@/app/actions/blogs"

const BlogPage = async ({params}: { params: Promise<{id: string}>
}) => {
    const {id} = await params
    const blog = getBlogById(Number(id))

    if (!blog) {
        notFound()
    }

    return (
        <div>
            <p>{blog.title}</p>
            <p>{blog.author}</p>
            <p>{blog.url}</p>
            <p>{blog.likes}</p>
            <form action={likeBlogAction}>
                <input type="hidden" name="id" value={blog.id}/>
                <button type="submit">
                    Like
                </button>
            </form> 
        </div>
    )
}

export default BlogPage
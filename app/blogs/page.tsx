import Link from "next/link"
import { getBlogs } from "../services/blogs"

  const Blogs = async ({searchParams}: {searchParams: Promise<{filter?: string}>}) => {
    const { filter } = await searchParams
    const blogs = getBlogs()
    const filterToLower = filter?.toLowerCase() ?? ""
    
    const filteredBlogs = blogs.filter((blog) => 
      blog.title.toLowerCase().includes(filterToLower)
    )

    const sortedBlogs = [...filteredBlogs].sort((a,b) => b.likes - a.likes)

    return (
      <div>
        <h2>Blogs</h2>
        <form action={"/blogs"} method="get">
          <label>
            Search:
            <input type="text" name="filter" defaultValue={filter ?? ""} />
          </label>          
          <button type="submit">Submit</button> 
        </form>
        <ul>
          {sortedBlogs.map(blog=> (
            <li key={blog.id}>
              <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
              {blog.author} {blog.url} {blog.likes}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  export default Blogs
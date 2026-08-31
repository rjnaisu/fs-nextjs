const blogs = [
  { id: 1, title: "foo", author: "bar", url: "google.com", likes: 1 },
  { id: 2, title: "foo", author: "bar", url: "google.com", likes: 1 },
  { id: 3, title: "foo", author: "bar", url: "google.com", likes: 1 },
  { id: 4, title: "foo", author: "bar", url: "google.com", likes: 1 },
];

let nextId = 5;

export const getBlogs = () => {
  return blogs;
};

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({ id: nextId++, title, author, url, likes: 0 });
};

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id);
};

export const likeBlog = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id);
  if (blog) {
    blog.likes = blog.likes + 1;
  }
};

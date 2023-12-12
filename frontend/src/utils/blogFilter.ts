export const filterBlogsByCategory = (blogs, category) => {
  return category ? blogs.filter((blog) => blog.category === category) : blogs;
};

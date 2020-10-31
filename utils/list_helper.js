const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  const likes = blogs.map(blog => blog.likes)
  return likes.reduce((acc, val) => acc + val)
}

const favoriteBlog = (blogs) => {
  const bestBlog = blogs.sort((a, b) => b.likes - a.likes) 
  return {
    title: bestBlog[0].title,
    author: bestBlog[0].author,
    likes: bestBlog[0].likes
  }
}

module.exports = {
  favoriteBlog,
  totalLikes,
  dummy
}

const totalLikes = (blogs) => {

  const likes = blogs.map(blog => blog.likes)
  return likes.reduce((acc, val) => acc + val)
}

const mostLikes = (blogs) => {

  let authorArray = []

  blogs.forEach(blog => {

    const existingAuthor = authorArray.find(a => a.author === blog.author)

    if (existingAuthor) {
      authorArray = authorArray.map(a =>
        a.author === existingAuthor.author
          ? { ...a, likes: existingAuthor.likes + blog.likes }
          : a
      )
    } else {
      const newAuthor = {
        author: blog.author,
        likes: blog.likes
      }
      authorArray.push(newAuthor)
    }
  })
  authorArray = authorArray.sort((a, b) => b.likes - a.likes)
  console.log(authorArray)
  return {
    author: authorArray[0].author,
    likes: authorArray[0].likes
  }
}

const mostBlogs = (blogs) => {

  // Pre-define array
  let authorArray = []

  blogs.forEach(blog => {

    const existingAuthor = authorArray.find(author =>
      author.author === blog.author
    )
    // If exist, add one to blogs value
    if (existingAuthor) {
      authorArray = authorArray.map(a =>
        a.author === existingAuthor.author
          ? { ...a, blogs: existingAuthor.blogs + 1 }
          : a
      )
    } else {
      const newAuthor = {
        author: blog.author,
        blogs: 1
      } // Else, make new entry
      authorArray.push(newAuthor)
    }
  }) // End of forEach Loop

  // Sort the array, return top Blogger 🖋
  authorArray = authorArray.sort((a, b) => b.blogs - a.blogs)
  return {
    author: authorArray[0].author,
    blogs: authorArray[0].blogs
  }
}

const favoriteBlog = (blogs) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  return {
    title: sortedBlogs[0].title,
    author: sortedBlogs[0].author,
    likes: sortedBlogs[0].likes
  }
}

module.exports = {
  favoriteBlog,
  totalLikes,
  mostBlogs,
  mostLikes
}
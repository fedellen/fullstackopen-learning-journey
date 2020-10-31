const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  const likes = blogs.map(blog => blog.likes)
  return likes.reduce((acc, val) => acc + val)
}

module.exports = {
  totalLikes,
  dummy
}
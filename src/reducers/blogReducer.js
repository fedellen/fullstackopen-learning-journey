import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data

    case 'NEW_BLOG':
      return [...state, action.data]

    case 'LIKE':
      return state.map((b) => (b.id !== action.data.id ? b : action.data))

    case 'DELETE':
      return state.filter((b) => b.id !== action.data)

    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    // Format for easier use (user: 'user's Object ID')
    const formattedBlogs = blogs.map((b) => {
      return { ...b, user: b.user.id }
    })
    // Sort by likes
    const sortedBlogs = formattedBlogs.sort((a, b) => b.likes - a.likes)
    dispatch({ type: 'INIT', data: sortedBlogs })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const returnedBlog = await blogService.likeBlog(likedBlog)
    dispatch({
      type: 'LIKE',
      data: returnedBlog
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.createBlog(blog)
    dispatch({ type: 'NEW_BLOG', data: newBlog })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch({ type: 'DELETE', data: id })
  }
}

export default blogReducer

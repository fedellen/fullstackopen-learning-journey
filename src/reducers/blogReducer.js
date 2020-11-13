import blogService from '../services/blogs'
import { notify } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data

    case 'NEW_BLOG':
      return [...state, action.data]

    case 'UPDATE_BLOG':
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
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    dispatch({ type: 'INIT', data: sortedBlogs })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      const returnedBlog = await blogService.likeBlog(likedBlog)
      dispatch({
        type: 'UPDATE_BLOG',
        data: returnedBlog
      })
      dispatch(notify(`You liked ${returnedBlog.title}!`))
    } catch {
      dispatch(notify('Request has failed...'))
    }
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.createBlog(blog)
      dispatch({ type: 'NEW_BLOG', data: newBlog })
      dispatch(notify(`${newBlog.title} by ${newBlog.author} has been added!`))
    } catch {
      dispatch(notify('Blog could not be added...'))
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(id)
      dispatch({ type: 'DELETE', data: id })
      dispatch(notify('Blog deleted...'))
    } catch {
      dispatch(notify('Blog could not be deleted...'))
    }
  }
}

export const createComment = (comment) => {
  return async (dispatch) => {
    try {
      console.log(comment)
      const returnedBlog = await blogService.commentBlog(comment)
      dispatch({ type: 'UPDATE_BLOG', data: returnedBlog })
      dispatch(notify('Thanks for commenting!'))
    } catch {
      dispatch(notify('Comment could not be submitted...'))
    }
  }
}

export default blogReducer

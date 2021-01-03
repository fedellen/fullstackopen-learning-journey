import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createComment } from '../reducers/blogReducer'

const NewComment = ({ blogId }) => {
  const content = useField('content')
  const dispatch = useDispatch()

  const handleAddComment = (e) => {
    e.preventDefault()

    const commentObject = {
      content: content.value,
      blogId: blogId
    }

    dispatch(createComment(commentObject))
    content.onChange({ target: { value: '' } })
  }

  return (
    <div>
      <form onSubmit={handleAddComment}>
        <input {...content} placeholder='Leave a comment... ' />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default NewComment

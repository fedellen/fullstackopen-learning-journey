import React from 'react'

const Comments = ({ blog }) => {
  let commentId = 0
  const commentKey = () => commentId++

  return (
    <div>
      <div>
        <h3>comments</h3>
        <ul>
          {blog.comments.map((comment) => (
            <li key={commentKey()}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Comments

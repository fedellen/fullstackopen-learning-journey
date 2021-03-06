import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const SingleUser = () => {
  const id = useParams().id.toString()
  const userList = useSelector((state) => state.userList)
  const user = userList.find((u) => u.id.toString() === id)

  // If user is not loaded up, don't run error
  if (!user) {
    return null
  }

  return (
    <div>
      <h2> {user.name} </h2>
      <h3> added blogs </h3>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>
            {b.title} by {b.author}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SingleUser

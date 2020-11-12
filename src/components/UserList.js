import React from 'react'
import { useSelector } from 'react-redux'

const UserList = () => {
  const userList = useSelector((state) => state.userList)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>
              <em>name</em>
            </th>
            <th>
              <em>blogs created</em>
            </th>
          </tr>
          {userList.map((u) => (
            <tr key={u.id}>
              <td> {u.name} </td>
              <td> {u.blogs.length} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList

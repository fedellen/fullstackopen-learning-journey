import { useQuery } from '@apollo/client'
import React from 'react'
import { USER } from '../queries'

const Recommendations = ({ show, books }) => {
  const result = useQuery(USER)

  if (!show) {
    return null
  }

  const user = result.data.me

  const genreArrays = books.map((b) => b.genres)
  let genres = []
  genreArrays.forEach((array) => {
    array.forEach((genre) => {
      if (!genres.includes(genre)) {
        genres.push(genre)
      }
    })
  })

  let booksToShow = books.filter((b) => b.genres.includes(user.favoriteGenre))

  return (
    <div>
      <h3>Recommendations</h3>
      <p>
        Hello {user.username}, here are some books based on your favorite genre:
        <strong> {user.favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations

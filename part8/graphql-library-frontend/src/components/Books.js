import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = ({ show, books }) => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [sortedBooks, setSortedBooks] = useState(books)

  const sortBooks = (genre) => {
    genre === 'show all' ? getBooks() : getBooks({ variables: { genre } })
  }

  // triggers upon `result` changing, sorts books
  useEffect(() => {
    if (result.data) {
      setSortedBooks(result.data.allBooks)
    }
  }, [result])

  if (!show) {
    return null
  }

  // Get genres; merge genre arrays, avoiding duplication;
  const genreArrays = books.map((b) => b.genres)
  let genres = []
  genreArrays.forEach((array) => {
    array.forEach((genre) => {
      if (!genres.includes(genre)) {
        genres.push(genre)
      }
    })
  })
  genres.push('show all')

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {sortedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => sortBooks(g)}>
          {g}
        </button>
      ))}
    </div>
  )
}

export default Books

import React, { useState } from 'react'

const Books = ({ show, books }) => {
  const [currentGenre, setCurrentGenre] = useState('show all')

  if (!show) {
    return null
  }

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

  let booksToShow = books
  if (currentGenre !== 'show all') {
    booksToShow = books.filter((b) => b.genres.includes(currentGenre))
  }

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
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => setCurrentGenre(g)}>
          {g}
        </button>
      ))}
    </div>
  )
}

export default Books

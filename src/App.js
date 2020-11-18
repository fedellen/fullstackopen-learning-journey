import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const result = useQuery(ALL_BOOKS)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      console.log(addedBook)
      updateCacheWith(addedBook)
      window.alert(`${addedBook.title} was added`)
    }
  })

  const updateCacheWith = (addedBook) => {
    const includedIn = (store, object) =>
      store.map((b) => b.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  // get token from storage
  useEffect(() => {
    const token = localStorage.getItem('libraryUserToken')
    if (token) {
      setToken(token)
    }
  }, [])

  if (result.loading) {
    return <div>loading...</div>
  }
  const books = result.data.allBooks

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  // if logged in, swap to books page; if logged out, leave add new page
  if ((page === 'login' && token) || (page === 'add' && !token)) {
    setPage('books')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <span>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </span>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Login setToken={setToken} show={page === 'login'} />
      <Authors token={token} show={page === 'authors'} />
      <Books books={books} show={page === 'books'} />
      <NewBook updateCacheWith={updateCacheWith} show={page === 'add'} />
      <Recommendations books={books} show={page === 'recommend'} />
    </div>
  )
}

export default App

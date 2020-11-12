import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlog from '../components/NewBlog'

describe('<NewBlog /> Testing', () => {
  let component
  const addBlogHandler = jest.fn()

  beforeEach(() => {
    component = render(<NewBlog addBlog={addBlogHandler} />)
  })

  test('NewBlog creates blog with correct details', () => {
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, { target: { value: 'The Title' } })
    fireEvent.change(author, { target: { value: 'The Author' } })
    fireEvent.change(url, { target: { value: 'www.theurl.com' } })

    fireEvent.submit(form)

    expect(addBlogHandler.mock.calls).toHaveLength(1)

    console.log(`Here is the thing ${addBlogHandler.mock.calls[0][0].title}`)

    expect(addBlogHandler.mock.calls[0][0].title).toBe('The Title')
    expect(addBlogHandler.mock.calls[0][0].author).toBe('The Author')
    expect(addBlogHandler.mock.calls[0][0].url).toBe('www.theurl.com')
  })
})

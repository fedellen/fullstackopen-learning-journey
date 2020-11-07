import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog /> Testing', () => {
  
  const blog = {
    title: 'Component Testing with react-testing-library',
    author: 'Derek R Sonnenberg',
    url: 'https://component-testing-fun-react.dev',
    likes: 0
  }

  let component
  const likeHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} likeBlog={likeHandler} />
    )
  })

  test('renders title and author initially, not likes or url', () => {

    const div = component.container.querySelector('.theBlog')

    expect(div).toHaveTextContent('Component Testing with react-testing-library')
    expect(div).toHaveTextContent('Derek R Sonnenberg')
    expect(div).not.toHaveTextContent('https://component-testing-fun-react.dev')
    expect(div).not.toHaveTextContent('Likes:')

  })

  test('renders likes and url when View button is pressed', () => {

    const div = component.container.querySelector('.theBlog')
    const button = component.getByText('View')

    fireEvent.click(button)

    expect(div).toHaveTextContent('Component Testing with react-testing-library')
    expect(div).toHaveTextContent('Derek R Sonnenberg')
    expect(div).toHaveTextContent('https://component-testing-fun-react.dev')
    expect(div).toHaveTextContent('Likes: 0')

  })

  test('clicking like twice correctly registers event handler twice', () => {
    
    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('💖')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})
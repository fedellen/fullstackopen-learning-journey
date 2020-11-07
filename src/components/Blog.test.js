import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author initially, not likes or url', () => {

  const blog = {
    title: 'Component Testing with react-testing-library',
    author: 'Derek R Sonnenberg',
    url: 'https://component-testing-fun-react.dev'
  }

  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.theBlog')

  expect(div).toHaveTextContent('Component Testing with react-testing-library')
  expect(div).toHaveTextContent('Derek R Sonnenberg')
  expect(div).not.toHaveTextContent('https://component-testing-fun-react.dev')
  expect(div).not.toHaveTextContent('Likes:')

})

test('renders likes and url when View button is pressed', () => {

  const blog = {
    title: 'Component Testing with react-testing-library',
    author: 'Derek R Sonnenberg',
    url: 'https://component-testing-fun-react.dev',
    likes: 0
  }

  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.theBlog')
  const button = component.getByText('View')

  fireEvent.click(button)

  expect(div).toHaveTextContent('Component Testing with react-testing-library')
  expect(div).toHaveTextContent('Derek R Sonnenberg')
  expect(div).toHaveTextContent('https://component-testing-fun-react.dev')
  expect(div).toHaveTextContent('Likes: 0')

})
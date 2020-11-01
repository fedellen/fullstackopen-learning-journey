const listHelper = require ('../utils/list_helper')
const helper = require ('./test_helper')

describe('the most likes', () => {
  test('finds the author with the most likes and displays them with their like total', () => {
    const result = listHelper.mostLikes(helper.dummyBlogs)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 22
    })
  })
})
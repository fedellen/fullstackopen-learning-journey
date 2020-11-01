const listHelper = require ('../utils/list_helper')
const helper = require ('./test_helper')

describe('best blog', () => {

  test('sort through an array of blogs find the best blog based on total likes', () => {
    const result = listHelper.favoriteBlog(helper.dummyBlogs)
    expect(result).toEqual(
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      }
    )
  })
})
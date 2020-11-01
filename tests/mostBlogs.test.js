const listHelper = require ('../utils/list_helper')
const helper = require ('./test_helper')

describe('most blogs', () => {
  
  test('sort through an array of blogs find the author with the most blogs 🍑', () => {
    const result = listHelper.mostBlogs(helper.dummyBlogs)
    expect(result).toEqual(
      {
        author: "Robert C. Martin",
        blogs: 4
      }
    )
  })
})
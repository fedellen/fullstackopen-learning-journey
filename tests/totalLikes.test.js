const listHelper = require ('../utils/list_helper')
const helper = require ('./test_helper')

describe('total likes', () => { 
  test('adds together the total likes for an author', () => {
    const result = listHelper.totalLikes(helper.dummyBlogs)
    expect(result).toBe(47)
  })
})
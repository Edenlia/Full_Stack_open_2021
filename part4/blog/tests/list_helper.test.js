const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('total likes', () => {

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list is empty, equals 0', () => {
    const result = listHelper.totalLikes(helper.zeroBlog)
    expect(result).toBe(0)
  })

  test('list', () => {
    const result = listHelper.totalLikes(helper.allBlog)
    expect(result).toBe(36)
  })
})


describe('favorite blog', () => {

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.favoriteBlog(helper.listWithOneBlog)
    expect(result).toEqual(helper.listWithOneBlog[0])
  })

  test('when list is empty, equals NaN', () => {
    const result = listHelper.favoriteBlog(helper.zeroBlog)
    expect(result).toEqual(NaN)
  })

  test('list', () => {
    const result = listHelper.favoriteBlog(helper.allBlog)
    expect(result).toEqual(
      {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    })
  })
})



describe("blog tests", () => {
  test('return the author with most blogs', () => {
    const result = helper.mostBlogs(helper.allBlog)
    expect(result).toEqual(
      {
        author: "Robert C. Martin",
        blogs: 3
      }
    )
  })

  test('return the author with most likes', () => {
    const result = helper.mostLikes(helper.allBlog)
    expect(result).toEqual(
      {
        author: "Edsger W. Dijkstra",
        likes: 17
      }
    )
  })
})



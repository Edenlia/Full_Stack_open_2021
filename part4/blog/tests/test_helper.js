const Blog = require('../models/blog')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const allBlog = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

const zeroBlog = []

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}
  let ans = {author: "NaN", blogs: 0}
  let dic = {}
  for (const blog of blogs) {
    if (dic[blog.author] === undefined) dic[blog.author] = 0
    dic[blog.author]++
    if (dic[blog.author] > ans.blogs) {
      ans.author = blog.author
      ans.blogs = dic[blog.author]
    }
  }

  return ans
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}
  let ans = {author: "NaN", likes: 0}
  let dic = {}
  for (const blog of blogs) {
    if (dic[blog.author] === undefined) dic[blog.author] = 0
    dic[blog.author] = dic[blog.author] + blog.likes
    if (dic[blog.author] > ans.likes) {
      ans.author = blog.author
      ans.likes = dic[blog.author]
    }
  }

  return ans
}

module.exports = {
  listWithOneBlog,
  allBlog,
  zeroBlog,
  blogsInDb,
  mostBlogs,
  mostLikes
}
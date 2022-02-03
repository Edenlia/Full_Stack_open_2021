const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  // console.log(helper.allBlog)
  for (let item of helper.allBlog) {
    // console.log(item)
    let obj = new Blog(item)
    await obj.save()
  }
})

test("Blog number is right", async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.allBlog.length)
})

test("The definer is id but not _id", async () => {
  const index = helper.allBlog[0]
  const response = await api.get(`/api/blogs/${index._id}`)
  expect(response.body.id).toBeDefined()
}, 100000)

test('HTTP POST, the length of blogs append', async () => {
  const piece = {
    title: "fucker",
    author: "Joker",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  }

  await api.post('/api/blogs').send(piece).expect(200)
  const res = await api.get('/api/blogs')
  // console.log(res.body.length)
  expect(res.body.length).toBe(helper.allBlog.length + 1)
}, 100000)

test('HTTP POST, if likes is undefined, set to 0', async () => {
  const piece = {
    title: "fucker",
    author: "Joker",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html"
  }

  const response = await api.post('/api/blogs').send(piece)
  const res = await api.get(`/api/blogs/${response.body.id}`)
  // console.log(res.body.length)
  expect(res.body.likes).toBe(0)
}, 100000)


test('HTTP POST, if title or url is undefined, return status 400', async () => {
  const piece1 = {
    author: "Joker",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html"
  }

  const piece2 = {
    title: "fucker",
    author: "Joker"
  }

  await api.post('/api/blogs').send(piece1).expect(400)
  await api.post('/api/blogs').send(piece2).expect(400)

}, 100000)



afterAll(() => {
  mongoose.connection.close()
})
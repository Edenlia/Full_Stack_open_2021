const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', {name: 1})
  response.json(blogs)

})

blogsRouter.get('/:id', async (request, response, next) => {

  try {
    const blog = await Blog.findById(request.params.id).populate('user', {name: 1})
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).end()
  }

  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token missing or invalid' })
  // }
  const user = await request.user

  const blog = new Blog({
    title: body.title,
    author: body.author === undefined ? "anonymous" : body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(204).end()
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const userId = decodedToken.id

  console.log("blog user id is ")
  console.log(blog.user.toString())
  console.log("token id is ")
  console.log(userId.toString())

  if (blog.user.toString() === userId.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  } else {
    return response.status(401).json({ error: 'No permission' })
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    content: body.content,
    important: body.important,
  }

  const res = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(res)


})

module.exports = blogsRouter

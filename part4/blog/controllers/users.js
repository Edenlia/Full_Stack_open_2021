const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
  // const users = await User
  //   .find({}).populate('blogs')
  const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, likes: 1})

  response.json(users)
})


usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.username === undefined
    || body.username.length < 3
    || body.password === undefined
    || body.password.length < 3) {
    response.status(400).end()
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  }

})

usersRouter.get('/test', async (request, response) => {
  const root = await User.findOne({})

  root.name = "ff"
  const savedUser = await root.save()

  response.json(savedUser)
})

module.exports = usersRouter
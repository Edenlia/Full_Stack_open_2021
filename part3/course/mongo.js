const mongoose = require('mongoose')

if ( process.argv.length<2 ) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const username = process.env.MONGO_USERNAME
const password = process.env.MONGO_PASSWORD
const app_name = process.env.APP_NAME

const url =
  `mongodb+srv://${username}:${password}@cluster0.duf5r.mongodb.net/${app_name}?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'GET and POST are the most important methods of HTTP protocol',
  date: new Date(),
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })

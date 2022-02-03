const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item.likes

  return blogs.length === 0 ?
    0 :
    blogs.reduce(reducer, 0)
}


const favoriteBlog = (blogs) => {
  const reducer = (index, item) => index.likes > item.likes ? index : item

  return blogs.length === 0 ?
    NaN :
    blogs.reduce(reducer, blogs[0])
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
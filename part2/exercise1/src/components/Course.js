import React from 'react'

const Header = ({name}) => (<h1>{name}</h1>)

const Content = ({parts}) => (
  <div>
    <ul>
      {parts.map(item => <Part item={item}/>)}
    </ul>
    <div>total of {parts.reduce((sum, item) => sum += item.exercises, 0)} exercises  </div>
  </div>

)

const Part = ({item}) => {
  return (
    <li key={item.id}>{item.name} {item.exercises}</li>
  )
}

const Course = ({ course }) => {

  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
    </div>

  )
}

export default Course
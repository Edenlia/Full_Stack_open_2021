import React, { useState } from 'react'

const Button = ({handler, text}) => {
  return (
      <button onClick={handler}>{text}</button>
  )
}

const Letter = ({text, num}) => (
    <div>{text} {num}</div>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodReview = () => {
    setGood(good + 1)
  }

  const neutralReview = () => {
    setNeutral(neutral + 1)
  }

  const badReview = () => {
    setBad(bad + 1)
  }

  return (
      <div>
        <h1>give feedback</h1>
        <Button handler={() => goodReview()} text="good"></Button>
        <Button handler={() => neutralReview()} text="neutral"></Button>
        <Button handler={() => badReview()} text="bad"></Button>
        <h1>statistics</h1>
        <Letter text="good" num={good}></Letter>
        <Letter text="neutral" num={neutral}></Letter>
        <Letter text="bad" num={bad}></Letter>
      </div>
  )
}

export default App
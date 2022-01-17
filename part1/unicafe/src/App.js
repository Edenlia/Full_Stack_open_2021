import React, { useState } from 'react'

const Button = ({handler, text}) => {
  return (
      <button onClick={handler}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
)

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0)
    return (
        <div>No feedBack given</div>
    )
  const average = (good - bad) / (good + neutral + bad)
  const positive = good / (good + neutral + bad) * 100
  return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good}></StatisticLine>
          <StatisticLine text="neutral" value={neutral}></StatisticLine>
          <StatisticLine text="bad" value={bad}></StatisticLine>
          <StatisticLine text="average" value={average}></StatisticLine>
          <StatisticLine text="positive" value={positive.toString() + "%"}></StatisticLine>
        </tbody>
      </table>
  )
}

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

        <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
      </div>
  )
}

export default App
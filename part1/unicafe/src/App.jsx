import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const StatisticsLine = ({text, value}) => (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
)

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad

  if (total != 0) {
    return (
      <div>
        <h1>statistics</h1>

        <table>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={total} />
          <StatisticsLine text="average" value={(good-bad)/total} />
          <StatisticsLine text="positive" value={good/total} />
        </table>
      </div>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => {
    setGood(good+1)
  }
  
  const handleNeutralFeedback = () => {
    setNeutral(neutral+1)
  }
  
  const handleBadFeedback = () => {
    setBad(bad+1)
  }

  return (
    <div>
      
      <h1>give feedback</h1>
      <Button text="good" onClick={handleGoodFeedback} />
      <Button text="neutral" onClick={handleNeutralFeedback} />
      <Button text="bad" onClick={handleBadFeedback} />
      
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
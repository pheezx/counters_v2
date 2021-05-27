import { useState } from 'react'
import styles from './index.module.scss'

const Counter = ({count, id, resetCounter, incrementCounter}) => (
  <div className={styles.counter}>
    <div className={styles.count}>{count}</div>
    <div 
      className={styles.button}
      onClick={() => incrementCounter(id)}
    >
      +
    </div>
    <div 
      className={`${styles.button} ${styles.resetButton}`}
      onClick={() => resetCounter(id)}
    >
      Reset
    </div>
  </div>
)

export default function Home() {
  const [countersData, setCountersData] = useState([])
  const [id, setId] = useState(0)

  const generateId = () => {
    setId(id + 1)
    return id
  }

  const updateCounter = (id, updateFunction) => {
    const updatedCounters = countersData.map((data) => {
      if(data.id !== id)
        return data 
      return {...data, count: updateFunction(data.count)}
    })
    setCountersData(updatedCounters)
  }

  const resetCounter = (id) => updateCounter(id, (count) => 0)

  const incrementCounter = (id) => updateCounter(id, (count) => count + 1)

  const addCounter = (id) => {
    setCountersData([...countersData, {
      count: 0,
      id: generateId()
    }])
  }

  const resetAllCounters = () => {
    const updatedData = countersData.map((data) => ({...data, count: 0}))
    setCountersData(updatedData)
  }

  return (
    <div className={styles.container}>
      <div 
        className={styles.button}
        onClick={addCounter}
      >
        Add Counter
      </div>
      <div 
        className={styles.button}
        onClick={resetAllCounters}
      >
        Reset All
      </div>
      <div className={styles.countersContainer}>
        {countersData.map((data) => (
          <Counter 
            {...data}
            resetCounter={resetCounter}
            incrementCounter={incrementCounter}
          />
        ))}
      </div>
    </div>
  )
}

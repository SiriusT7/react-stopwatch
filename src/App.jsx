import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [time, setTime] = useState(0)
  const [start, setStart] = useState(false)

  useEffect(() => {
    let interval = null;

    if (start) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10)
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval)
  }, [start]);

  const hour = `0${Math.floor((time/3600000000)%60)}`.slice(-2);
  const minute = `0${Math.floor((time/60000)%60)}`.slice(-2);
  const second = `0${Math.floor((time/1000)%60)}`.slice(-2);
  const miliSecond = `0${(time/10)%1000}`.slice(-2);

  const count = () => {
    if (start) {
      setStart(false);
    } else if(!start){
      setStart(true);
    }
  }

  const reset = () => {
    setTime(0);
    setStart(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="time">{hour}:{minute}:{second}:{miliSecond}</h1>
        <div>
          <button onClick={count}>{start? "STOP" : (time === 0)? "START" : "CONTINUE"}</button>
          <button onClick={reset}>RESET</button>
        </div>
      </header>
    </div>
  )
}

export default App

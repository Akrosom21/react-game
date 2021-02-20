import React, {useEffect, useState} from 'react'

export const ScoreHistory = (props) => {
    const [history, setHistory] = useState([{step: 1, result: 'Welcome to the game', score: 0}])
    if (localStorage.getItem('history') == null) {
        localStorage.setItem('history', JSON.stringify(history))
    }
     let localHistory = JSON.parse(localStorage.getItem('history'))

    useEffect(()=> {
        let newHistory = {
            step: localHistory.length + 1,
            result: props.scoreText,
            score: props.score
        }
        setHistory([...history, newHistory])
        if (props.step !== 0 && localHistory.length < 10) {
            localStorage.setItem('history', JSON.stringify([...localHistory, newHistory]))
        } else if (props.step !== 0 && localHistory.length === 10) {
            let reducedHistory = [...localHistory, newHistory]
            reducedHistory.shift()
            localStorage.setItem('history', JSON.stringify(reducedHistory))
        }
    },[props.step])
    return (
        <div>
            <div className="history__title"><span>Step</span><span>Result</span><span>Score</span></div>
            <div className="history__text">
                {localHistory.map((h, i) => <div key={i}><span>{h.step}</span><span>{h.result}</span><span>{h.score}</span></div>)}
            </div>
        </div>
    )
}
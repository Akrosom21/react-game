import React, {useEffect, useState} from 'react'
import styles from './ScoreHistory.module.css'

export const ScoreHistory = (props) => {
    const [history, setHistory] = useState([{step: 1, result: 'Welcome to the game', score: 0}])
    if (localStorage.getItem('history') == null) {
        localStorage.setItem('history', JSON.stringify(history))
    }
     let localHistory = JSON.parse(localStorage.getItem('history'))

    useEffect(()=> {
        let localStep = localHistory[localHistory.length - 1].step + 1
        let newHistory = {
            step: localStep,
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
        <div style={props.theme.tableText} className={styles.history__table}>
            <div className={styles.history__title}><span>Step</span><span>Result</span><span>Score</span></div>
            <div>
                {localHistory.map((h, i) => <div className={styles.history__text} key={i}><span>{h.step}</span><span>{h.result}</span><span>{h.score}</span></div>)}
            </div>
        </div>
    )
}
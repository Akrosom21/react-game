import React, {useEffect, useState} from 'react'
import {GameField} from "./GameField/GameField";
import styles from './Board.module.css'
import {Route, useHistory, useLocation} from "react-router";
import {Gameplay} from "./Gameplay/Gameplay";
import {Score} from "../Score/Score";
import {ScoreHistory} from "./ScoreHistory/ScoreHistory";

export const Board = (props) => {
    const [playerItem, setPlayerItem] = useState('')
    const [autoPickedItem, setAutoPickedItem] = useState('')
    const [score, setScore] = useState(0)
    let localScore = localStorage.getItem('score')
    const [scoreText, setScoreText] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [step, setStep] = useState(0)
    const checkResult = () => {
        let gameScore = 0
        let gameScoreText = ''
        if (playerItem === 'rock' && autoPickedItem === 'paper') {
            gameScore = -1
            gameScoreText = 'you lose'
        } else if (playerItem === 'rock' && autoPickedItem === 'scissors') {
            gameScore = 1
            gameScoreText = 'you win'
        } else if (playerItem === 'paper' && autoPickedItem === 'scissors') {
            gameScore = 1
            gameScoreText = 'you lose'
        } else if (playerItem === 'paper' && autoPickedItem === 'rock') {
            gameScore = 1
            gameScoreText = 'you win'
        } else if (playerItem === 'scissors' && autoPickedItem === 'rock') {
            gameScore = -1
            gameScoreText = 'you lose'
        } else if (playerItem === 'scissors' && autoPickedItem === 'paper') {
            gameScore = 1
            gameScoreText = 'you win'
        } else if (playerItem === 'spock' && autoPickedItem === 'paper') {
            gameScore = -1
            gameScoreText = 'you lose'
        } else if (playerItem === 'spock' && autoPickedItem === 'rock') {
            gameScore = 1
            gameScoreText = 'you win'
        } else if (playerItem === 'spock' && autoPickedItem === 'scissors') {
            gameScore = 1
            gameScoreText = 'you win'
        } else if (playerItem === 'rock' && autoPickedItem === 'spock') {
            gameScore = -1
            gameScoreText = 'you lose'
        } else if (playerItem === 'scissors' && autoPickedItem === 'spock') {
            gameScore = -1
            gameScoreText = 'you lose'
        } else if (playerItem === 'paper' && autoPickedItem === 'spock') {
            gameScore = 1
            gameScoreText = 'you win'
        } else if (playerItem === autoPickedItem) {
            gameScore = 0
            gameScoreText = 'draw'
        }
        setScore(score + gameScore)
        localStorage.setItem('score', String(+localScore + +gameScore))
        setScoreText(gameScoreText)
    }
    useEffect(() => {
        checkResult()
    }, [autoPickedItem, playerItem])
    useEffect(() => {
        document.addEventListener('keydown', onScoreRestart)
        document.addEventListener('keydown', onItemPressed)
        return () => {
            document.removeEventListener('keydown', onScoreRestart)
            document.removeEventListener('keydown', onItemPressed)
        }
    }, [])
    const itemSelected = (i, length) => {
        let random = Math.floor(Math.random() * 3) + 1
        if (length === 4) {
            random = Math.floor(Math.random() * 4) + 1
        }
        let autoItem = random === 1 ? 'rock' :
            random === 2 ? 'paper' :
                random === 3 ? 'scissors' :
                    random === 4 ? 'spock' : ''
        setPlayerItem(i)
        setTimeout(() => {
            setAutoPickedItem(autoItem)
        }, 1000)
        setTimeout(() => {
            setIsLoading(false)
            setStep(step + Math.floor(Math.random() * 100) + 1)
        }, 1000)
    }
    const onItemPressed = (e) => {
        if (e.key === 'ArrowLeft') {
            path.push('/play')
            itemSelected('rock')
        } else if (e.key === 'ArrowRight') {
            path.push('/play')
            itemSelected('paper')
        } else if (e.key === 'ArrowDown') {
            path.push('/play')
            itemSelected('scissors')
        }
    }
    const resetLap = () => {
        setAutoPickedItem('')
        setScoreText('')
        setIsLoading(true)
    }
    const onScoreRestart = (e) => {
        if (e.key === 'Shift') {
            localStorage.clear()
            path.push('/')
            window.location.reload()
        }
    }
    const onScoreReset = () => {
        localStorage.removeItem('score')
        localStorage.removeItem('history')
    }
    let path = useHistory()
    const toGameField = () => {
        path.push('/')
    }
    return (
        <div className={styles.board}>
            <Score theme={props.theme} score={localScore}/>
            <ScoreHistory scoreText={scoreText} score={localScore} step={step} theme={props.theme}/>
            <a href='/' style={props.theme.tableText} onClick={onScoreReset}>New game</a>
            <Route exact path='/' render={() => <GameField itemSelected={itemSelected}/>}/>
            <Route path="/play" render={() => <Gameplay playerItem={playerItem}
                                                        autoPickedItem={autoPickedItem}
                                                        resetLap={resetLap}
                                                        isLoading={isLoading}
                                                        scoreText={scoreText}
                                                        toGameField={toGameField}/>}/>
        </div>
    )
}
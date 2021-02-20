import React, {useEffect, useState} from 'react'
import {GameField} from "./GameField/GameField";
import styles from './Board.module.css'
import {Route} from "react-router";
import {Gameplay} from "./Gameplay/Gameplay";
import {Score} from "../Score/Score";
import {ScoreHistory} from "./ScoreHistory/ScoreHistory";

export const Board = () => {
    const [playerItem, setPlayerItem] = useState('')
    const [autoPickedItem, setAutoPickedItem] = useState('')
    const [score, setScore] = useState(0)
    let localScore = localStorage.getItem('score')
    const [scoreText, setScoreText] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [step, setStep] = useState(0)
    const random = Math.floor(Math.random() * 3) + 1
    const autoItem = random === 1 ? 'rock' :
        random === 2 ? 'paper' :
            random === 3 ? 'scissors' : ''
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
        } else if (playerItem === autoPickedItem) {
            gameScore = 0
            gameScoreText = 'draw'
        }
        setScore(score + gameScore)
        localStorage.setItem('score', String(+localScore + +gameScore))
        setScoreText(gameScoreText)
    }
    useEffect(()=> {
        checkResult()
    }, [autoPickedItem, playerItem])
    const itemSelected = (i) => {
        setPlayerItem(i)
        setTimeout(() => {
            setAutoPickedItem(autoItem)
        }, 1000)
        setTimeout(()=> {
            setIsLoading(false)
            setStep(step + 1)
        },1000)
    }
    const resetLap = () => {
        setAutoPickedItem('')
        setScoreText('')
        setIsLoading(true)
    }
    const onScoreReset = () => {
        localStorage.clear()
    }
    return (
        <div className={styles.board}>
            <Score score={localScore}/>
            <ScoreHistory scoreText={scoreText} score={localScore} step={step}/>
            <a href='/' onClick={onScoreReset}>New game</a>
            <Route exact path="/" render={() => <GameField itemSelected={itemSelected}/>}/>
            <Route path="/play" render={() => <Gameplay playerItem={playerItem}
                                                        autoPickedItem={autoPickedItem}
                                                        resetLap={resetLap}
                                                        isLoading={isLoading}
                                                        scoreText={scoreText}/>}/>
        </div>
    )
}
import React, {useEffect, useState} from 'react'
import {GameField} from "./GameField/GameField";
import styles from './Board.module.css'
import {Route} from "react-router";
import {Gameplay} from "./Gameplay/Gameplay";
import {useDispatch} from "react-redux";
import {Score} from "../Score/Score";

export const Board = () => {
    const [playerItem, setPlayerItem] = useState('')
    const [autoPickedItem, setAutoPickedItem] = useState('')
    const [score, setScore] = useState(0)
    const [scoreText, setScoreText] = useState('')
    const dispatch = useDispatch()
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
        setScoreText(gameScoreText)
    }
    useEffect(()=> {
        checkResult()
    }, [autoPickedItem, playerItem])
    const itemSelected = async (i) => {
        setPlayerItem(i)
        await setTimeout(() => {
            setAutoPickedItem(autoItem)
        }, 1000)
    }
    const resetAutoItem = () => {
        setAutoPickedItem('')
        setScoreText('')
    }
    return (
        <div className={styles.board}>
            <Score score={score}/>
            <Route exact path="/" render={() => <GameField itemSelected={itemSelected}/>}/>
            <Route path="/play" render={() => <Gameplay playerItem={playerItem}
                                                        autoPickedItem={autoPickedItem}
                                                        resetAutoItem={resetAutoItem}
                                                        scoreText={scoreText}/>}/>
        </div>
    )
}
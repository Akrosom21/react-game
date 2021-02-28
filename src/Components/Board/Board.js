import React, {useEffect, useState} from 'react'
import {GameField} from "./GameField/GameField";
import styles from './Board.module.css'
import {Route, useHistory} from "react-router";
import {Gameplay} from "./Gameplay/Gameplay";
import {Score} from "../Score/Score";
import {ScoreHistory} from "./ScoreHistory/ScoreHistory";
import end from '../../music/end.mp3'
import useSound from "use-sound";
import table from '../../img/table.svg'
import close from '../../img/close.svg'

export const Board = (props) => {
    const [playerItem, setPlayerItem] = useState('')
    const [autoPickedItem, setAutoPickedItem] = useState('')
    const [score, setScore] = useState(0)
    let localScore = localStorage.getItem('score')
    const [scoreText, setScoreText] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [step, setStep] = useState(0)
    const [speed, setSpeed] = useState(0)
    const [play] = useSound(end, {soundEnabled: props.soundEnabled})
    const [isAuto, setIsAuto] = useState(true)
    const [historyToggle, setHistoryToggle] = useState({})
    console.log(historyToggle);
    if (!localStorage.getItem('speed')) {
        localStorage.setItem('speed', String(3000))
        setSpeed(3000)
    }
    let localSpeed = localStorage.getItem('speed')
    let speedText
    if (localSpeed == 3000) {
        speedText = 'Fast'
    } else if (localSpeed == 1000) {
        speedText = 'Slow'
    }
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
        path.push('/')
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
        props.play()
        setPlayerItem(i)
        setTimeout(() => {
            setAutoPickedItem(autoItem)
        }, +localSpeed)
        setTimeout(() => {
            setIsLoading(false)
            setStep(step + Math.floor(Math.random() * 100) + 1)
            play()
        }, +localSpeed)
    }
    const autoplay = () => {
        setTimeout(() => {
            let random = Math.floor(Math.random() * 3) + 1
            let autoItem = random === 1 ? 'rock' :
                random === 2 ? 'paper' :
                    random === 3 ? 'scissors' :
                        random === 4 ? 'spock' : ''
            path.push('/play')
            itemSelected(autoItem)
        }, 1000)
        setTimeout(() => {
            path.push('/')
            setAutoPickedItem(null)
            setScoreText('')
            setIsLoading(true)
        }, 5000)
    }
    const onAuto = () => {
        if (isAuto) {
            autoplay()
            setInterval(autoplay, 6000)
            setIsAuto(false)
        } else {
            path.push('/')
            window.location.reload()
        }

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
        } else if (e.key === 'ArrowUp') {
            if (JSON.parse(localStorage.getItem('gameItems')).length === 4) {
                path.push('/play')
                itemSelected('spock')
            }
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
    const onHistoryToggle = () => {
        if (historyToggle.display == 'none') {
            setHistoryToggle({display: 'block'})
        } else if (historyToggle.display === undefined) {
            setHistoryToggle({display: 'block'})
        } else {
            setHistoryToggle({display: 'none'})
        }
    }
    const onFastMode = () => {
        if (localSpeed == 3000) {
            setSpeed(1000)
            localStorage.setItem('speed', String(1000))

        } else if (localSpeed == 1000) {
            setSpeed(3000)
            localStorage.setItem('speed', String(3000))
        }
    }
    return (
        <>
            <div className={styles.board}>
                <Score theme={props.theme} score={localScore}/>
                {(historyToggle.display == 'none' || historyToggle.display == undefined)
                    ?
                    <img className={styles.tableIcon} onClick={onHistoryToggle} src={table} alt="table"/>
                    :
                    <img className={styles.tableIcon} onClick={onHistoryToggle} src={close} alt="table"/>
                }
                <div style={historyToggle} className={styles.board__scoreHistory}>
                    <ScoreHistory scoreText={scoreText} score={localScore} step={step} theme={props.theme}/>
                    <a href='/' style={props.theme.buttonsColors} onClick={onScoreReset}
                       className={styles.board__new}>New
                        game</a>
                </div>
                <Route exact path='/' render={() => <GameField itemSelected={itemSelected} theme={props.theme}/>}/>
                <Route path="/play" render={() => <Gameplay playerItem={playerItem}
                                                            autoPickedItem={autoPickedItem}
                                                            resetLap={resetLap}
                                                            isLoading={isLoading}
                                                            scoreText={scoreText}
                                                            toGameField={toGameField}
                                                            soundEnabled={props.soundEnabled}
                                                            theme={props.theme}/>}/>
            </div>
            <button style={props.theme.buttonsColors} onClick={onFastMode}
                    className={styles.board__speed}>Switch {speedText} Mode
            </button>
            <button style={props.theme.buttonsColors} onClick={onAuto} className={styles.board__auto}>Autoplay on/off
            </button>
        </>
    )
}
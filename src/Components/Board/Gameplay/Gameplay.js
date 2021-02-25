import React, {useEffect} from 'react'
import {NavLink} from "react-router-dom";
import styles from './Gameplay.module.css'
import loading from '../../../img/loading.svg'
import useSound from 'use-sound';
import restart from '../../../music/restart.ogg'

export const Gameplay = (props) => {
    const [play] = useSound(restart, {soundEnabled: props.soundEnabled})
    const onReset = () => {
        play()
        props.resetLap()
    }
    const onRestart = (e) => {
        if (e.key === 'Enter') {
            props.toGameField()
            props.resetLap()
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', onRestart)
        return () => {
            document.removeEventListener('keydown', onRestart)
        }
    }, [])
    return (
        <div>
            <div className="result">{props.scoreText}</div>
            <div className={styles.items}>
                <div className={styles.items__player}>{props.playerItem}</div>
                {props.isLoading && <img src={loading} alt="loading"/>}
                <div className={styles.items__auto}>{props.autoPickedItem}</div>
            </div>
            <NavLink to='/' onClick={onReset}>Play again</NavLink>
        </div>
    )
}
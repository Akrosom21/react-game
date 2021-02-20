import React, {useEffect} from 'react'
import {NavLink} from "react-router-dom";
import styles from './Gameplay.module.css'
import loading from '../../../img/loading.svg'

export const Gameplay = (props) => {
    const onReset = () => {
            props.resetLap()
    }
    const onRestart = (e) => {
        if (e.key === 'Enter') {
            props.toGameField()
            props.resetLap()
        }
    }
    useEffect(()=> {
        document.addEventListener('keydown', onRestart)
        return () => {
            document.removeEventListener('keydown', onRestart)
        }
    },[])
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
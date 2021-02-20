import React from 'react'
import {NavLink} from "react-router-dom";
import styles from './Gameplay.module.css'
import loading from '../../../img/loading.svg'

export const Gameplay = (props) => {
    const onReset = () => {
        props.resetLap()
    }
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
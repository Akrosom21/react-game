import React from 'react'
import {NavLink} from "react-router-dom";
import styles from './Gameplay.module.css'

export const Gameplay = (props) => {
    const onItemReset = () => {
        props.resetAutoItem()
    }
    return (
        <div>
            <div className="result">{props.scoreText}</div>
            <div className={styles.items}>
                <div className={styles.items__player}>{props.playerItem}</div>
                <div className={styles.items__auto}>{props.autoPickedItem}</div>
            </div>
            <NavLink to='/' onClick={onItemReset}>Play again</NavLink>
        </div>
    )
}
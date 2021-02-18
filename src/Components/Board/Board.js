import React from 'react'
import {GameField} from "./GameField/GameField";
import styles from './Board.module.css'

export const Board = () => {
    return (
        <div className={styles.board}>
            <GameField/>
        </div>
    )
}
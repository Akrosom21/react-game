import React from 'react'
import triangle from '../../../img/triangle.svg'
import styles from './GameField.module.css'
import './GameField.css'

export const GameField = () => {
    const item = ['rock', 'paper', 'scissors'].map(i => <div className={i} key={i}/>)
    return (
        <div className={styles.field}>
            <img src={triangle} alt="triangle"/>
            {item}
        </div>
    )
}
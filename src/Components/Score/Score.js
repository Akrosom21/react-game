import React from "react";
import styles from './Score.module.css'

export function Score(props) {
    return (
        <div className={styles.header__score}>
            <span>Score</span>
            <span>{props.score}</span>
        </div>
    )
}
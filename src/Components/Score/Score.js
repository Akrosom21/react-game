import React from "react";
import styles from './Score.module.css'

export function Score(props) {
    return (
        <div style={props.theme.score.scoreBox} className={styles.score}>
            <span>Score</span>
            <span>{props.score}</span>
        </div>
    )
}
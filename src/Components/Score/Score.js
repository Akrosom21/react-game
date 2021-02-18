import React from "react";
import styles from './Score.module.css'

export function Score() {
    return (
        <div className={styles.header__score}>
            <span>Score</span>
            <span>?</span>
        </div>
    )
}
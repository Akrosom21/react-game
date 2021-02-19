import React from 'react'
import styles from './Header.module.css'

export const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.header__name}>
                <span>ROCK</span><span>PAPER</span><span>SCISSORS</span>
            </div>
        </div>
    )
}
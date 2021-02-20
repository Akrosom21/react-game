import React, {useState} from 'react'
import styles from './Header.module.css'

export const Header = (props) => {
    const [modeText, setModeText] = useState('')
    let mode = localStorage.getItem('mode')
    if (!mode) {
        localStorage.setItem('mode', 'Light theme')
    }
    const onSetMode = () => {
        if (mode === 'Light theme') {
            localStorage.setItem('mode', 'Dark theme')
            setModeText('Dark theme')
            props.setDark()
        } else if (mode === 'Dark theme') {
            localStorage.setItem('mode', 'Light theme')
            setModeText('Light theme')
            props.setLight()
        }
    }
    return (
        <div className={styles.header}>
            <div style={props.theme.headerText} className={styles.header__name}>
                <span>ROCK</span><span>PAPER</span><span>SCISSORS</span>
                <button onClick={onSetMode}>{mode}</button>
            </div>
        </div>
    )
}
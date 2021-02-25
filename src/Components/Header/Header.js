import React, {useState} from 'react'
import styles from './Header.module.css'
import {Music} from "./Music/Music";
import {Rules} from "./Rules/Rules";

export const Header = (props) => {
    const [isMusic, setIsMusic] = useState(false)
    const [isRulers, setIsRulers] = useState(false)
    const onMusic = () => {
        setIsMusic(true)
    }
    const onRulers = () => {
        setIsRulers(true)
    }
    const musicClose = () => {
        setIsMusic(false)
    }
    const rulersClose = () => {
        setIsRulers(false)
    }
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
    const onFullscreen = () => {
        document.documentElement.webkitRequestFullscreen()
    }
    return (
        <div className={styles.header}>
            <div style={props.theme.headerText} className={styles.header__name}>
                <span>ROCK</span><span>PAPER</span><span>SCISSORS</span>
                <button onClick={onSetMode}>{mode}</button>
            </div>
            <div className="header__music" onClick={onMusic}>Music</div>
            {isMusic && <Music musicClose={musicClose} soundsSwitch={props.soundsSwitch}/>}
            <div className="header__rulers" onClick={onRulers}>Rulers</div>
            {isRulers && <Rules rulersClose={rulersClose} />}
            <div onClick={onFullscreen}>Fullscreen</div>
        </div>
    )
}
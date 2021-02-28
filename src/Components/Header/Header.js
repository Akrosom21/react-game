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
        localStorage.setItem('mode', 'Dark theme')
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
        <div style={props.theme.headerBorder} className={styles.header}>
            <div style={props.theme.headerText} className={styles.header__name}>
                <span>ROCK</span><span>PAPER</span><span>SCISSORS</span>
            </div>
            <div className={styles.header__btns}>
                <div className={styles.header__btnsInner}>
                    <button style={props.theme.buttonsColors} onClick={onSetMode} className={styles.header__day}></button>
                    <div style={props.theme.buttonsColors} className={styles.header__music} onClick={onMusic}></div>
                    {isMusic && <Music theme={props.theme} musicClose={musicClose} soundsSwitch={props.soundsSwitch}/>}
                    <div style={props.theme.buttonsColors} className={styles.header__rules} onClick={onRulers}></div>
                    {isRulers && <Rules theme={props.theme} rulersClose={rulersClose}/>}
                </div>
                <div onClick={onFullscreen} className={styles.header__full}></div>
            </div>
        </div>
    )
}
import React, {useEffect} from 'react'
import {NavLink} from "react-router-dom";
import styles from './Gameplay.module.css'
import './Gameplay.css'
import loading from '../../../img/loading.svg'
import useSound from 'use-sound';
import restart from '../../../music/restart.ogg'

export const Gameplay = (props) => {
    const [play] = useSound(restart, {soundEnabled: props.soundEnabled})
    const onReset = () => {
        play()
        props.resetLap()
    }
    const onRestart = (e) => {
        if (e.key === 'Enter') {
            props.toGameField()
            props.resetLap()
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', onRestart)
        return () => {
            document.removeEventListener('keydown', onRestart)
        }
    }, [])
    return (
        <div className='gameplay'>
            <div className={styles.items}>
                <div className={props.playerItem}></div>
                {props.isLoading
                    ?
                    <img src={loading} alt="loading" className={styles.result}/>
                    :
                    <div style={props.theme.headerText} className={styles.result}>{props.scoreText}</div>}
                <div className={`${props.autoPickedItem} autopicked`}></div>
            </div>
            <NavLink to='/' onClick={onReset} style={props.theme.buttonsColors} className={styles.gameplay__again}>Play
                again</NavLink>
        </div>
    )
}
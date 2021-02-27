import React, {useState} from 'react'
import styles from './Music.module.css'
import useSound from 'use-sound';
import music from '../../../music/song.mp3'


export const Music = (props) => {
    const [volume, setVolume] = useState(1)
    const [play, {stop, isPlaying, sound}] = useSound(music, {volume: volume})
    const onMusicClose = () => {
        props.musicClose()
    }
    const onPlayToggle = () => {
        isPlaying ? stop() : play()
        sound.loop(true)
    }
    const onVolumeChange = (vol) => {
        setVolume(vol)
    }
    const onSoundsSwitch = () => {
        props.soundsSwitch()
    }
    return (
        <div style={props.theme.tableText} className={styles.music}>
            <span onClick={onMusicClose} className={styles.music__close}></span>
            <div className={styles.music__inner}>
                <button onClick={onPlayToggle} className={styles.music__play}></button>
                <div className="music__volume">
                    <button style={props.theme.buttonsColors} onClick={()=> onVolumeChange(0.2)} className={styles.music__btn}>softly</button>
                    <button style={props.theme.buttonsColors} onClick={()=> onVolumeChange(0.5)} className={styles.music__btn}>average</button>
                    <button style={props.theme.buttonsColors} onClick={()=> onVolumeChange(1)} className={styles.music__btn}>loudly</button>
                </div>
            </div>
            <button style={props.theme.buttonsColors} onClick={onSoundsSwitch} className={styles.music__sound}>On/off sounds</button>
        </div>
    )
}
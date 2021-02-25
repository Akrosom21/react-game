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
        <div className={styles.music}>
            <span onClick={onMusicClose}>close</span>
            <button onClick={onPlayToggle}>Play/stop music</button>
            <div className="music__volume">
                <button onClick={()=> onVolumeChange(0.2)}>softly</button>
                <button onClick={()=> onVolumeChange(0.5)}>average</button>
                <button onClick={()=> onVolumeChange(1)}>loudly</button>
            </div>
            <button onClick={onSoundsSwitch}>On/off sounds</button>
        </div>
    )
}
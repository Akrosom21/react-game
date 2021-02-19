import React, {useState} from 'react'
import triangle from '../../../img/triangle.svg'
import styles from './GameField.module.css'
import './GameField.css'
import {NavLink} from 'react-router-dom'

export const GameField = (props) => {
    const [gameItems, setGameItems] = useState(['rock', 'paper', 'scissors'])
    const onItemSelect = (i) => {
        props.itemSelected(i)
    }
    const item = gameItems.map(i => <NavLink to='/play' className={i} onClick={() => onItemSelect(i)}
                                            key={i}>{i}</NavLink>)
    return (
        <div className={styles.field}>
            <img src={triangle} alt="triangle"/>
            {item}
        </div>
    )
}
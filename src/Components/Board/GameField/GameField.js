import React, {useState} from 'react'
import triangle from '../../../img/triangle.svg'
import styles from './GameField.module.css'
import './GameField.css'
import {NavLink} from 'react-router-dom'

export const GameField = (props) => {
    const [gameItems, setGameItems] = useState([])
    if (!localStorage.getItem('gameItems')) {
        localStorage.setItem('gameItems', JSON.stringify(['rock', 'paper', 'scissors']))
        setGameItems(['rock', 'paper', 'scissors'])
    }
    let localGameItems = JSON.parse(localStorage.getItem('gameItems'))
    const onSpockMode = () => {
        if (localGameItems.length === 3) {
            setGameItems(['rock', 'paper', 'scissors', 'spock'])
            localStorage.setItem('gameItems', JSON.stringify(['rock', 'paper', 'scissors', 'spock']))
        } else if (localGameItems.length === 4) {
            setGameItems(['rock', 'paper', 'scissors'])
            localStorage.setItem('gameItems', JSON.stringify(['rock', 'paper', 'scissors']))
        }
    }
    const onItemSelect = (i, length) => {
        props.itemSelected(i, length)
    }
    const item = localGameItems.map(i => <NavLink to='/play' className={i} onClick={() => onItemSelect(i, localGameItems.length)}
                                            key={i}></NavLink>)
    return (
        <div className={styles.field}>
            <img src={triangle} alt="triangle" className={styles.field__img}/>
            {item}
            <button className={styles.field__btn} onClick={onSpockMode}>Switch Spock Mode</button>
        </div>
    )
}
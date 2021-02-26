import React from 'react'
import styles from './Rules.module.css'
import rules from '../../../img/rules.svg'

export const Rules = (props) => {
    return (
        <div className={styles.rulers}>
            <span onClick={props.rulersClose} className={styles.rules__close}></span>
            <img src={rules} alt="rules" className={styles.rules__img}/>
            <div className={styles.rules__desc}>&#9885; In spock mode: spock beats rock and scissors</div>
            <div className={styles.rules__desc}>&raquo; Hot keys:</div>
            <ul className={styles.rules__list}>
                <li>Rock - '&#8592;'</li>
                <li>Paper - '&#8594;'</li>
                <li>Scissors - '&#8595;'</li>
                <li>Spock - '&#8593;'</li>
                <li>New round - 'Enter'</li>
                <li>New game - 'Shift'</li>
                <li></li>
            </ul>
        </div>
    )
}
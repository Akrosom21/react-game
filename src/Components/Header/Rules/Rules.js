import React from 'react'
import styles from './Rules.module.css'
import rules from '../../../img/rules.svg'

export const Rules = (props) => {
    return (
        <div className={styles.rulers}>
            <span onClick={props.rulersClose}>close</span>
            <img src={rules} alt="rules"/>
            <div>In spock mode: spock beats rock and scissors</div>
            <div>Hot keys:</div>
            <ul>
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
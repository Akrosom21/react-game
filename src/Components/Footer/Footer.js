import React from 'react'
import logo from '../../img/logo.svg'
import styles from './Footer.module.css'

export const Footer = () => {
    return (
        <div className={styles.footer}>
            <a href="https://github.com/Akrosom21">GitHub</a>
            <span>2021</span>
            <a href="https://rs.school/js/"><img className={styles.footer__logo} src={logo} alt="rs-school"/></a>
        </div>
    )
}
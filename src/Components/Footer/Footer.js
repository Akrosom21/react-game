import React from 'react'
import logo from '../../img/logo.svg'
import github from '../../img/github.svg'
import styles from './Footer.module.css'

export const Footer = (props) => {
    return (
        <div style={props.theme.footer} className={styles.footer}>
            <a href="https://github.com/Akrosom21" style={props.theme.footer}><img src={github} alt="github" className={styles.footer__github}/></a>
            <span>2021</span>
            <a href="https://rs.school/js/"><img className={styles.footer__logo} src={logo} alt="rs-school"/></a>
        </div>
    )
}
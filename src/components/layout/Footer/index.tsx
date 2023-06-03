import React from 'react'
import styles from './Footer.module.sass'

import {Link} from 'react-router-dom'

import Logo from 'assets/img/Logo.svg'
import Payments from 'assets/img/footer/Payments.svg'

export const Footer = () => {
  return (
    <div className={styles.layout}>
        <div className={styles.footerUpper}>
            <div className={styles.texts}>
            <div>
                <div className={styles.logoContainer}>
                    <div className={styles.logo}>
                        <img src={Logo} alt='logo' />
                    </div>
                    <div>YourWear</div>
                </div>
                <div className={styles.info}>sales@yourwear.com</div>
                <div className={styles.info}>88005553535</div>
            </div>
            <div className={styles.column}>
                <div className={styles.category}>Shop</div>
                <Link to="">Design a Shirt</Link>
                <Link to="">All goods</Link>
                <Link to="">My orders</Link>
            </div>
            <div className={styles.column}>
                <div className={styles.category}>About Us</div>
                <Link to="">About Page</Link>
                <Link to="">Terms and Conditions</Link>
                <Link to="">Privacy Policy</Link>
            </div>
            </div>
        </div>
        <div className={styles.footerLower}>
            <div className={styles.copyright}>© Copyright 2023 | All Rights Reserved By YourWear</div>
            <div className={styles.payments}>
                <img src={Payments} alt='payments' />
            </div>
        </div>
    </div>
  )
}


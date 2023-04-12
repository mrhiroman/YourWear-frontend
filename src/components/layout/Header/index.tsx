import React from 'react'
import styles from './Header.module.sass'
import { NavLink } from 'react-router-dom'

import City from 'assets/img/header/Map Pin.svg'
import Email from 'assets/img/header/Email.svg'
import Phone from 'assets/img/header/Phone.svg'

import Search from 'assets/img/header/Search.svg'
import Cart from 'assets/img/header/Cart.svg'
import Profile from 'assets/img/header/User.svg'

import Arrow from 'assets/img/header/Arrow.svg'
import Logo from 'assets/img/Logo.svg'
import { Button, ButtonType } from 'components/ui/Button'


export const Header = () => {
  return (
    <div className={styles.layout}>
        <div className={styles.headerUpper}>
            <div className={styles.upperLeft}>
                <div className={styles.elementUpper}>
                    <img src={City} alt='city' /> Kazan
                </div>
                <div className={styles.elementUpper}>
                    <img src={Email} alt='email' /> sales@yourwear.com
                </div>
                <div className={styles.elementUpper}>
                    <img src={Phone} alt='phone' /> 88005553535
                </div>
            </div>
            <div className={styles.upperRight}>
                <div className={styles.picker}>
                    English <img src={Arrow} alt='arrow' />
                </div>
                <div className={styles.picker}>
                    USD <img src={Arrow} alt='arrow' />
                </div>
            </div>
        </div>
        <div className={styles.headerMain}>
            <div className={styles.headerMainLeft}>
                <div className={styles.logoContainer}>
                    <div className={styles.logo}>
                        <img src={Logo} alt='logo' />
                    </div>
                    <div>YourWear</div>
                </div>
                <nav className={styles.navigation}>
                    <NavLink to="">Home</NavLink>
                    <NavLink to="">Shop</NavLink>
                    <NavLink to="">Pages</NavLink>
                    <NavLink to="">Elements</NavLink>
                </nav>
            </div>
            <div className={styles.buttons}>
                <div className={styles.buttonsIcons}>
                    <div className={styles.icon}>
                        <img src={Search} alt='search' />
                    </div>
                    <div className={styles.icon}>
                        <img src={Cart} alt='cart' />
                    </div>
                </div>
                <div className={styles.buttonsFull}>
                    <Button type={ButtonType.Blue} text="Register" />
                    <Button type={ButtonType.White} text="Login" />
                </div>
            </div>
        </div>
    </div>
  )
}

import {useState} from 'react'
import styles from './Header.module.sass'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import City from 'assets/img/header/Map Pin.svg'
import Email from 'assets/img/header/Email.svg'
import Phone from 'assets/img/header/Phone.svg'

import Search from 'assets/img/header/Search.svg'
import Cart from 'assets/img/header/Cart.svg'
import Profile from 'assets/img/header/User.svg'

import Arrow from 'assets/img/header/Arrow.svg'
import Logo from 'assets/img/Logo.svg'
import { Button, ButtonType } from 'components/ui/Button'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

enum headerTheme {
    Basic = 'basic',
    Customizer = 'blue'
}

export const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [currentTheme, setCurrentTheme] = useState(headerTheme.Basic)
    const user = useSelector((state: RootState) => state.user.user)

    if(location.pathname.includes('/customizer') && currentTheme !== headerTheme.Customizer){
        setCurrentTheme(headerTheme.Customizer)
    } else if(!location.pathname.includes('/customizer') && currentTheme !== headerTheme.Basic){
        setCurrentTheme(headerTheme.Basic)
    }

    const onLoginClick = () => {
        navigate("/registration")
    }

    const onProfileClick = () => {
        navigate("/profile")
    }

    return (
    <div className={`${styles.layout} ${currentTheme === headerTheme.Customizer ? styles.blue : ''}`}>
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
                <div className={styles.logoContainer} onClick={() => navigate('')}>
                    <div className={styles.logo}>
                        <img src={Logo} alt='logo' />
                    </div>
                    <div className={styles.logoText}>YourWear {currentTheme === headerTheme.Customizer ? <span className={styles.yellow}>Create</span> : ''}</div>
                </div>
                <nav className={styles.navigation}>
                    <NavLink to="">Home</NavLink>
                    <NavLink to="/shop">Shop</NavLink>
                    <NavLink to="/customizer">Customizer</NavLink>
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
                    {user.email && 
                        <div className={styles.profileButton} onClick={onProfileClick}>
                            <div className={styles.icon}>
                                <img src={Profile} alt='profile' />
                            </div>
                            <div className={styles.name}> {user.name}</div>
                        </div>
                    }
                </div>
                {!user.email &&
                <div className={styles.buttonsFull}>
                    <Button type={ButtonType.Blue} text="Register" onClick={onLoginClick} />
                    <Button type={ButtonType.White} text="Login" onClick={onLoginClick}/>
                </div>
                }
            </div>
        </div>
    </div>
  )
}

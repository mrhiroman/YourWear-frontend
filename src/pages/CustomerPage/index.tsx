import React from 'react'

import styles from './CustomerPage.module.sass'
import { Product, ProductCard } from 'components/ui/ProductCard'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'redux/store'
import { setUser } from 'redux/user/slice'

import Logout from 'assets/img/pages/profile/Logout.svg'

const MockData: Array<Product> = [
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
]

export const CustomerPage = () => {
  const [selectedCategory, setCategory] = React.useState(0)
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const selectCategory = (id: number) => {
    setCategory(id)
  }

  const handleLogout = () => {
    dispatch(setUser({}))
    localStorage.removeItem("token")
    navigate("/")
    window.scrollTo(0,0)
  }

  return (
    <div className={styles.container}>
      <span className={styles.title}>Information</span>  
      <div className={styles.info}>
        <span className={styles.infoName}>Welcome, {user.name}</span>
        <div onClick={handleLogout} className={styles.logoutIcon}>
            <img src={Logout} alt="logout"/>
          </div>
      </div>
      <div className={styles.line}></div>
        <div className={styles.products}>
            <nav className={styles.navigation}>
                <div onClick={() => selectCategory(0)} className={ selectedCategory === 0 ? styles.active : ''}>All</div>
                <div onClick={() => selectCategory(1)} className={ selectedCategory === 1 ? styles.active : ''}>Drafts</div>
                <div onClick={() => selectCategory(2)} className={ selectedCategory === 2 ? styles.active : ''}>Designs</div>
                <div onClick={() => selectCategory(3)} className={ selectedCategory === 3 ? styles.active : ''}>Orders</div>
            </nav>
            <div className={styles.productsList}>
                {MockData.map((item, i) => <ProductCard key={i} product={item}/>)}
            </div>
        </div>
      </div>
  )
}

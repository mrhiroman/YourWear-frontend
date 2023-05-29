import React from 'react'

import styles from './CustomerPage.module.sass'
import { Product, ProductCard } from 'components/ui/ProductCard'
import { NavLink } from 'react-router-dom'

const MockData: Array<Product> = [
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
]

export const CustomerPage = () => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Information</span>  
      <div className={styles.info}>
        <span className={styles.infoName}>Joe</span>
        <span className={styles.infoName}>Admin</span>
      </div>
      <div className={styles.line}></div>
        <div className={styles.products}>
            <nav className={styles.navigation}>
                <NavLink to={''} className={ ({isActive}) => isActive ? styles.active : ''}>Drafts</NavLink>
                <NavLink to={''} className={ ({isActive}) => isActive ? styles.active : ''}>Designs</NavLink>
                <NavLink to={''} className={ ({isActive}) => isActive ? styles.active : ''}>Orders</NavLink>
            </nav>
            <div className={styles.productsList}>
                {MockData.map((item, i) => <ProductCard key={i} product={item}/>)}
            </div>
        </div>
      </div>
  )
}

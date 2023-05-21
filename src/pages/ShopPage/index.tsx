import React from 'react'

import styles from './ShopPage.module.sass'

import SuitModel from '../../assets/img/pages/shop/SuitModel.png'
import { Button, ButtonType } from 'components/ui/Button'
import { NavLink } from 'react-router-dom'
import { Product, ProductCard } from 'components/ui/ProductCard'


const MockData: Array<Product> = [
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
]

export const ShopPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bannerSuits}>
        <div className={styles.content}>
            <span className={styles.title}>Premium Suits</span>
            <div className={styles.line}></div>
            <span className={styles.info}>Our suits are crafted in Italy and France by latest technology
            using some of the world's finest and highest quality fabrics</span>
            <div className={styles.buttons}>
                <Button type={ButtonType.Yellow} text='Customize now' />
                <Button type={ButtonType.Blue} text='Browse suits' />
        </div>
        </div>
            <img src={SuitModel} alt="model" className={styles.poster}/>
      </div>
    <div className={styles.bannerProducts}>
        <div className={styles.navigation}>
        <nav className={styles.navigationBar}>
            <NavLink to={''} className={ ({isActive}) => isActive ? styles.active : ''}>Popular</NavLink>
            <NavLink to={''} className={ ({isActive}) => isActive ? styles.active : ''}>New Arrivals</NavLink>
            <NavLink to={''} className={ ({isActive}) => isActive ? styles.active : ''}>Trending</NavLink>
        </nav>
        <Button type={ButtonType.White} text='Browse more' />
        </div>
        <div className={styles.products}>
            {MockData.map((item, i) => <ProductCard key={i} product={item}/>)}
        </div>
    </div>
    </div>
  )
}

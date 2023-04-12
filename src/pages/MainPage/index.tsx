import React from 'react'
import styles from './MainPage.module.sass'
import { Button, ButtonType } from 'components/ui/Button'

import MainPicture from 'assets/img/pages/main/MainBannerPicture.png'
import { Product, ProductCard } from 'components/ui/ProductCard'

const MockData: Array<Product> = [
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
]

export const MainPage = () => {
  return (
    <div className={styles.layout}>
        <div className={styles.bannerMain}>
            <div className={styles.info}>
                <div className={styles.caption}>
                    Create <span className={styles.textBlue}>Custom Clothes</span> Printed For You
                </div>
                <div className={styles.divisor}></div>
                <div className={styles.description}>
                    Our clothing is crafted from high quality materials, with different types of printing and huge variety of cloth types 
                </div> 
                <div className={styles.buttons}>
                    <Button type={ButtonType.Yellow} text='Customize now' />
                    <Button type={ButtonType.White} text='Learn more' />
                </div>
            </div>
            <div className={styles.picture}>
                <img src={MainPicture} alt='man' />
            </div>
        </div>
        <div className={styles.bannerShop}>
            <div className={styles.info}>
                <div className={styles.caption}>
                    New Arrivals
                </div>
                <div className={styles.divisor}></div>
                <div className={styles.description}>
                    Check out our exclusive selection of this season’s new arrivals, made with world’s highest quality fabric 
                </div> 
                <div className={styles.buttons}>
                    <Button type={ButtonType.Yellow} text='Browse all' />
                </div>
            </div>
            <div className={styles.products}>
                {MockData.map((item, i) => <ProductCard key={i} product={item}/>)}
            </div>
        </div>
        <div className={styles.bannerCustomizer}>

        </div>
        <div className={styles.bannerCards}>

        </div>
        <div className={styles.bannerTestimonials}>

        </div>
    </div>
  )
}

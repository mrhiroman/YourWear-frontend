import React from 'react'
import styles from './MainPage.module.sass'
import { Button, ButtonType } from 'components/ui/Button'

import MainPicture from 'assets/img/pages/main/MainBannerPicture.png'
import CustomizerPicture from 'assets/img/pages/main/CustomizerPicture.png'

import HeartIcon from 'assets/img/pages/main/icons/Heart.svg'
import FlashIcon from 'assets/img/pages/main/icons/Flash.svg'
import FilterIcon from 'assets/img/pages/main/icons/Filter.svg'
import LockIcon from 'assets/img/pages/main/icons/Lock.svg'
import TruckIcon from 'assets/img/pages/main/icons/Truck.svg'
import BagIcon from 'assets/img/pages/main/icons/Bag.svg'

import { Product, ProductCard } from 'components/ui/ProductCard'
import { FeatureCard } from 'components/ui/FeatureCard'

const MockData: Array<Product> = [
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
    {name: 'test', price: 500},
]

const Cards = [
    {icon: HeartIcon, caption: 'Trusted', description: 'You can start from one of the many pre-designed shirts and customise it, or start with the fabric and select each detail one by one, until you’ve created your desired design'},
    {icon: FlashIcon, caption: 'Easy to Use', description: 'You can start from one of the many pre-designed shirts and customise it, or start with the fabric and select each detail one by one, until you’ve created your desired design'},
    {icon: FilterIcon, caption: 'Personalization', description: 'You can start from one of the many pre-designed shirts and customise it, or start with the fabric and select each detail one by one, until you’ve created your desired design'},
    {icon: LockIcon, caption: 'Secure', description: 'You can start from one of the many pre-designed shirts and customise it, or start with the fabric and select each detail one by one, until you’ve created your desired design'},
    {icon: TruckIcon, caption: 'Fast Delivery', description: 'You can start from one of the many pre-designed shirts and customise it, or start with the fabric and select each detail one by one, until you’ve created your desired design'},
    {icon: BagIcon, caption: '24/7 Shopping', description: 'You can start from one of the many pre-designed shirts and customise it, or start with the fabric and select each detail one by one, until you’ve created your desired design'},
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
            <div className={styles.pictures}>
                <img src={CustomizerPicture} alt='customize_picture' />
            </div>
            <div className={styles.info}>
                <div className={styles.caption}>
                    Custom Shirts
                </div>
                <div className={styles.divisor}></div>
                <div className={styles.description}>
                Stay ahead of the competitive tailoring business using our shirt customization tool. It allows your customers to design their shirts themselves with ease
                </div> 
                <div className={styles.buttons}>
                    <Button type={ButtonType.Yellow} text='Browse all' />
                    <Button type={ButtonType.White} text='Learn more' />
                </div>
            </div>
        </div>
        <div className={styles.bannerCards}>
            <div className={styles.info}>
                <div className={styles.caption}>
                    Why Choose Us
                </div>
                <div className={styles.divisor}></div>
            </div>
            <div className={styles.cards}>
                {Cards.map((item, i) => <FeatureCard key={i} icon={item.icon} caption={item.caption} description={item.description} />)}
            </div>
        </div>
        <div className={styles.bannerTestimonials}>

        </div>
    </div>
  )
}

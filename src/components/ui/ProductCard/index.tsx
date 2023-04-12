import React from 'react'
import styles from './ProductCard.module.sass'

import DefaultShirt from 'assets/img/mocks/DefaultShirt.png'

//add currency from global state(?)
export type Product = {
    name: string, 
    price: number,
    imageUrl?: string,
    isPromo?: boolean
}

export const ProductCard = (props: {product: Product}) => {
  return (
    <div className={styles.card}>
        <div className={styles.image}>
            <img src={props.product.imageUrl !== undefined ? props.product.imageUrl : DefaultShirt} alt='product' />
        </div>
        <div className={styles.cardInfo}>
            <div className={styles.name}>{props.product.name}</div>
            <div className={styles.price}>${props.product.price}</div>
        </div>
    </div>
  )
}
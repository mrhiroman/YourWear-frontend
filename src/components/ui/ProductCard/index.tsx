import React from 'react'
import styles from './ProductCard.module.sass'

import BlackTShirt from 'assets/img/mocks/BlackTShirt.png'

import HeartIcon from 'assets/img/pages/main/icons/Heart.svg'
import BagIcon from 'assets/img/pages/main/icons/Bag.svg'
import { Button, ButtonType } from '../Button'
import { setItem } from 'redux/customizer/slice'
import { useAppDispatch } from 'redux/store'
import { useNavigate } from 'react-router-dom'
import { ClothType, OrderModel, WearModel } from 'generated/api'

//add currency from global state(?)
export type Product = {
    name: string, 
    price: number,
    imageUrl?: string,
    isPromo?: boolean
}

export const ProductCard = (props: {product: OrderModel | WearModel}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const img = props.product.imageUrl !== undefined ? props.product.imageUrl : BlackTShirt

  const onCustomizeClick = () => {
      dispatch(setItem({baseImage: img as string, cost: 100, type: props.product.clothType as ClothType})) //fix ClothType
      navigate('/customizer')
      //window.scrollTo(0,0);
  }
  return (
    <div className={styles.card}>
        <div className={styles.image}>
            <img src={img as string} alt='product' />
            <div className={styles.overlay}>
              <div className={styles.circleButton}>
                <img src={BagIcon} alt='buy' />
              </div>
              <Button type={ButtonType.Yellow} text='Customize' onClick={onCustomizeClick}/>
              <div className={styles.circleButton}>
                <img src={HeartIcon} alt='fav' />
              </div>
            </div>
        </div>
        <div className={styles.cardInfo}>
            <div className={styles.name}>{props.product.clothType}</div>
            <div className={styles.price}>${10}</div>
        </div>
    </div>
  )
}
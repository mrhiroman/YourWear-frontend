import React from 'react'
import styles from './ProductCard.module.sass'

import BlackTShirt from 'assets/img/mocks/BlackTShirt.png'

import HeartIcon from 'assets/img/pages/main/icons/Heart.svg'
import BagIcon from 'assets/img/pages/main/icons/Bag.svg'
import { Button, ButtonType } from '../Button'
import { setItem } from 'redux/customizer/slice'
import { useAppDispatch } from 'redux/store'
import { useNavigate } from 'react-router-dom'
import { ClothType, OrderModel, OrderService, OrderStatus, PublishedWearService, WearModel } from 'generated/api'
import { setOrders } from 'redux/user/slice'

//add currency from global state(?)
export type Product = {
    name: string, 
    price: number,
    imageUrl?: string,
    isPromo?: boolean
}

function isOrderModel(value: OrderModel | WearModel): value is OrderModel {
  return value.hasOwnProperty('cost');
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

  const onUndraftClick = () => {
    if(window.confirm("Place Your order? You will not be able to edit it anymore!")){
      OrderService.getApiOrdersUndraft(props.product.id as number).then(resp => 
        alert('Success!')
      ).catch(err => alert(err))
    }
  }

  //TODO: optimize on Backend, get editableobject from Server
  const onPublishClick = () => {
    if(window.confirm("Make your design public? You accept our Terms of Service by doing this!")){
      const name = window.prompt("Enter name: ")
      console.log(name)
      PublishedWearService.postApiWears(
      {
        name: name,
        orderId: props.product.id
      })
      .then(resp => alert('Success'))
      .catch(err => alert(err))
    }
  }

  return (
    <div className={styles.card}>
        <div className={styles.image}>
            <img src={img as string} alt='product' />
            <div className={styles.overlay}>
              {isOrderModel(props.product) && props.product.orderStatus !== OrderStatus.PLACED &&
                <div className={styles.circleButton} onClick={onUndraftClick}>
                  <img src={BagIcon} alt='buy' />
                </div>
              }
              {!(isOrderModel(props.product) && props.product.orderStatus === OrderStatus.PLACED) && <Button type={ButtonType.Yellow} text='Customize' onClick={onCustomizeClick}/>}
              {isOrderModel(props.product) && <Button type={ButtonType.Yellow} text='Publish' onClick={onPublishClick}/>}
              {!isOrderModel(props.product) && 
                <div className={styles.circleButton}>
                  <img src={HeartIcon} alt='fav' />
                </div>
              }
            </div>
        </div>
        <div className={styles.cardInfo}>
            <div className={styles.name}>{isOrderModel(props.product) ? props.product.clothType : props.product.name}</div>
            { isOrderModel(props.product) &&
              <div className={styles.price}>${props.product.cost}</div>
            }
            { isOrderModel(props.product) &&
              <div className={styles.status}>{props.product.orderStatus}</div>
            }
        </div>
    </div>
  )
}
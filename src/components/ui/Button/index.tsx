import React from 'react'
import styles from './Button.module.sass'

export enum ButtonType {
    White = 'White',
    Blue = 'Blue',
    Yellow = 'Yellow'
}

export const Button = (props: {type: ButtonType, text: string, onClick?: () => void}) => {
  return (
    <div onClick={props.onClick} className={`${styles.button} ${styles[props.type]}`}>
        {props.text}
    </div>
  )
}

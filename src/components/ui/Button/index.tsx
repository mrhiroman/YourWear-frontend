import React from 'react'
import styles from './Button.module.sass'

export enum ButtonType {
    White = 'White',
    Blue = 'Blue',
    Yellow = 'Yellow'
}

export const Button = (props: {type: ButtonType, text: string}) => {
  return (
    <div className={`${styles.button} ${styles[props.type]}`}>
        {props.text}
    </div>
  )
}

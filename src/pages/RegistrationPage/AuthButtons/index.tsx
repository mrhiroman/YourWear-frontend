import React from 'react'

import styles from './AuthButtons.module.sass'

import Google from 'assets/img/pages/registration/Google.png'

export enum AuthButtonType {
    Red = 'Red'
}

export const AuthButton = (props: {type: AuthButtonType, text: string, onClick?: () => void}) => {
  return (
    <div onClick={props.onClick} className={`${styles.button} ${styles[props.type]}`}>
        <img src={props.type === 'Red'? Google : 'smth'} alt="Logo" />
        {props.text}
    </div>
  )
}
import React from 'react'
import styles from './FeatureCard.module.sass'

export const FeatureCard = (props: {icon: string, caption: string, description: string}) => {
  return (
    <div className={styles.card}>
        <div className={styles.icon}>
            <img src={props.icon} alt='icon' />
        </div>
        <div className={styles.caption}>{props.caption}</div>
        <div className={styles.description}>{props.description}</div>
    </div>
  )
}

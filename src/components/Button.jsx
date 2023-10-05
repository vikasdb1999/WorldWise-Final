import styles from './Button.module.css';
import React from 'react'

function Button({children,onClick,type}) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
import React from 'react'
import '../../styles//home/button.less'
export const Button = ({title, handleClick, className}) => {
  return (
    <button className={className ? className + ' button' : 'button'} onClick={handleClick}>{ title }</button>
  )
}

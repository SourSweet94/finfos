import React from 'react'
import { Button as BSButton } from 'react-bootstrap'

interface ButtonProps {
  onClick: ()=>void
  children: React.ReactNode
  style?: {}
}

const Button = ({onClick, children, style}: ButtonProps) => {
  return (
    <BSButton style={style} onClick={onClick} className='mx-2'>
      {children}
    </BSButton>
  )
}

export default Button
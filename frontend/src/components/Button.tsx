import React from 'react'
import { Button as BSButton } from 'react-bootstrap'

interface ButtonProps {
  onClick: ()=>void
  children: React.ReactNode
}

const Button = ({onClick, children}: ButtonProps) => {
  return (
    <BSButton onClick={onClick} className='mx-2'>
      {children}
    </BSButton>
  )
}

export default Button
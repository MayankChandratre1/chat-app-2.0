"use client"
import React from 'react'

const Button = ({children, onClick, type, className}:{
    children: React.ReactNode,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    type?:"submit" | "reset" | "button" | undefined ,
    className?:string
}) => {
  return (
    <button onClick={onClick} className={`bg-gray-800 px-3 py-2 rounded-md border border-gray-800 hover:border-gray-400 active:scale-95 m-2 ${className}`} type={type}>
        {children}
    </button>
  )
}

export default Button
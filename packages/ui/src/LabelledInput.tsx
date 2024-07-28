"use client"
import React from 'react'

type LabelledInputProps = {
    name: string,
    placeholder: string,
    type: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const LabelledInput = ({name, placeholder,type, onChange}:LabelledInputProps) => {
  return (
    <div>
        <label htmlFor={name} className='text-2xl'>{name}</label>
        <input type={type} placeholder={placeholder} id={name} />
    </div>
  )
}

export default LabelledInput
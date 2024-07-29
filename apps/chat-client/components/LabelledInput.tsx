"use client"
import React from 'react'

type LabelledInputProps = {
    name: string,
    placeholder: string,
    type: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value?:string
}

const LabelledInput = ({name, placeholder,type, onChange, value}:LabelledInputProps) => {
  return (
    <div className='text-white'>
        <label htmlFor={name} className='text-lg font-semibold'>{name}</label>
        <input type={type} placeholder={placeholder} id={name} name={name.toLowerCase()} className='block w-full text-sm border bg-transparent mt-1 mb-2 p-2 rounded-xl outline-none' onChange={onChange} value={value} />
    </div>
  )
}

export default LabelledInput
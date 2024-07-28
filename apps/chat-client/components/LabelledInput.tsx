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
    <div className='text-white'>
        <label htmlFor={name} className='text-lg font-semibold'>{name}</label>
        <input type={type} placeholder={placeholder} id={name} name={name.toLowerCase()} className='block w-full text-sm border bg-transparent mt-1 mb-2 p-2 rounded-xl outline-none' onChange={onChange} />
    </div>
  )
}

export default LabelledInput
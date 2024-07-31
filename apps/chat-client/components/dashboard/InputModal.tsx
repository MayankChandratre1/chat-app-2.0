"use client"
import React, { useState } from 'react'
import LabelledInput from '../LabelledInput'
import Button from '../Button'

const InputModal = ({title,buttonText, onSubmit, onClick,type}:{
    title:string,
    buttonText:string,
    onSubmit?:(inputField:string)=>void,
    onClick?:React.MouseEventHandler<HTMLButtonElement>,
    type?:string
}) => {

    const [inputField, setInputField] = useState("")
  return (
    <div className='fixed w-screen h-screen top-0 left-0  z-10 grid place-items-center backdrop-blur-sm'>
        <div className='bg-gray-700 text-white p-5 rounded-3xl flex flex-col'>
        <button className=' self-end text-center bg-red-500 w-5 h-5 rounded-full grid place-content-center shadow-xl' onClick={onClick}>x</button>
        <form onSubmit={(e)=> onSubmit ? onSubmit(inputField):null}>
            <fieldset>
            <LabelledInput name={title} placeholder={"Enter here"} type={`${type ? type:"text"}`} onChange={(e)=>{
                setInputField(e.target.value)
            }}/>
            </fieldset>
            <fieldset>
                
            </fieldset>
            <Button type={"submit"}>{buttonText}</Button>
        </form>
    </div>
    </div>
  )
}

export default InputModal
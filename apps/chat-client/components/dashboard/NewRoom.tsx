"use client"
import React, { useState } from 'react'
import Button from '../Button'
import InputModal from './InputModal'
import add_member from '@/app/lib/websocket_actions/add_member'
import deleteRoom from '@/app/lib/actions/deleteRoom'
import { useRouter } from 'next/navigation'
import LabelledInput from '../LabelledInput'
import Avatar from '../Avatar'
import create_room from '@/app/lib/websocket_actions/create_room'

const NewRoom = () => {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const [name, setName] = useState<string>("")
  const [image, setImage] = useState<string>("")


  const toBase64:(file:Blob) => Promise<string | ArrayBuffer | null> = async (file:Blob) => {
    return new Promise((res, rej)=>{
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = ()=>{
            res(fileReader.result)
        }
        fileReader.onerror = ()=>{
            rej(fileReader.error)
        }
    })
}

const handleFileUpload = async (e:React.ChangeEvent<HTMLInputElement>) => {
        
    if(e.target.files){
        if(Number(e.target.files[0].size) > 800000){
            alert("Please choose a smaller image")
            e.target.value = ""
            return "https://www.gravatar.com/avatar/"
        }
        let x:any = ""
        x = await toBase64(e.target.files[0])
        return x
    }
    return "https://www.gravatar.com/avatar/"
}

const handleSubmit = async ()=>{
    if(name){
        const {success, room} = await create_room({name,image})
        if(success){
            router.push("/dashboard/"+room?.id)
        }else{
            alert("Room Cannot be created for some reason, try changing name")
        }
    }
}
  
  return (
    <div className='text-sm'>
        {showModal ? <div className='fixed w-screen h-screen grid place-items-center top-0 left-0 z-30 backdrop-blur-md'>
            <div className='p-2 px-4 bg-gray-600 rounded-xl'>   
                <div className='flex justify-end'>
                   <button className='w-8 h-8 bg-red-500 grid place-items-center rounded-full' onClick={()=>{
                       setShowModal(false)
                   }}>X</button>
                </div>
                <div className='mt-4 flex flex-col'>
                    <form onSubmit={handleSubmit}>
                    <fieldset className='grid grid-cols-1 border border-gray-600 bg-gray-800 rounded-2xl px-5 py-2 gap-5 mb-5'>
                         <legend className=' text-3xl'>Name</legend>
                        <LabelledInput name='Username' type='text' value={name} placeholder="Can't be empty" onChange={(e)=>{
                            setName(e.target.value)
                        }}  />
                     </fieldset>
                    <fieldset className='grid grid-cols-1 place-items-center border border-gray-600 bg-gray-800 rounded-2xl px-5 py-2 gap-5 mb-5'>
                         <legend className=' text-3xl'>Image</legend>
                        <div>
                            <Avatar image={image} size='large' />
                        </div>
                        <div>
                        <input type="file" accept='.png, .jpg, .jpeg, .webp'
                    className='block w-full bg-gray-700 rounded-xl text-sm text-gray-500  file:bg-gray-500 file:inline-block file:border-none file:py-2 file:mr-2  file:text-gray-300 cursor-pointer file:cursor-pointer file:hover:bg-gray-600'
                    onChange={async (e)=>{
                        const x = await handleFileUpload(e)
                        setImage(x)
                    }}
                    />
                    <p  className='mt-2 px-3 text-xs text-gray-500 italic font-mono'>only .png .jpg .jpeg .webp (under 800Kb)</p>
                        </div>
                     </fieldset>
                     <Button className='bg-green-500 w-full border-green-600' type='submit'>Create</Button>
                    </form>
                </div>
            </div>
        </div>:null}
        <Button onClick={()=> setShowModal(true)} className='bg-green-700 border-green-900'>New</Button>
    </div>
  )
}

export default NewRoom
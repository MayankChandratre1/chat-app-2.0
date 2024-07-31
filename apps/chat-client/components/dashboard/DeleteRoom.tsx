"use client"
import React, { useState } from 'react'
import Button from '../Button'
import InputModal from './InputModal'
import add_member from '@/app/lib/websocket_actions/add_member'
import deleteRoom from '@/app/lib/actions/deleteRoom'
import { useRouter } from 'next/navigation'

const DeleteRoom = ({roomId}:{roomId:string}) => {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  
  return (
    <div className='text-sm'>
        {showModal ? <div className='fixed w-screen h-screen grid place-items-center top-0 left-0 z-30 backdrop-blur-md'>
            <div className='p-2 bg-gray-400 rounded-md'>   
                <div className='flex justify-end'>
                   <button className='w-8 h-8 bg-red-500 grid place-items-center rounded-full' onClick={()=>{
                       setShowModal(false)
                   }}>X</button>
                </div>
                <div className='mt-4 flex flex-col'>
                    <p className='text-xl text-black font-semibold'>Delete Room Permanantly?</p>
                    <Button onClick={async ()=> {
                        const {success} = await deleteRoom(roomId)
                        if(success){
                            router.push("/dashboard/base")
                        }
                    }} className='bg-red-500'>Delete</Button>
                </div>

            </div>
        </div>:null}
        <Button onClick={()=> setShowModal(true)} className='bg-red-500'>Delete</Button>
    </div>
  )
}

export default DeleteRoom
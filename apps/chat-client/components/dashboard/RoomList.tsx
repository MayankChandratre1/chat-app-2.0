"use client"
import React, { useState } from 'react'
import Button from '../Button'
import getUser from '@/app/lib/actions/getUser'
import Avatar from '../Avatar'
import InputModal from './InputModal'
import create_room from '@/app/lib/websocket_actions/create_room'
import {  useRouter } from 'next/navigation'
import { create_websocket_room } from '@/app/lib/websocket_actions/websocket_util'
import ProfileCard from './ProfileCard'

const RoomList = ({rooms}:{
    rooms:{
        id: string;
        name: string;
    }[]
}) => {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  return (
    <div className='text-white col-span-2 bg-gray-600 relative'>
        {showModal ? <InputModal title='Create Room' buttonText='Create' onSubmit={async (inputField) => {
        if(inputField.trim().length > 0){
          const {success,room} = await create_room({name: inputField});
          if(success){
            setShowModal(false)
            router.push(`${room ? "/dashboard/"+room?.id:"/dashboard/base"}`)
          }else{
            alert("something went wrong")
            router.push("/dashboard/base")
          }
        }else{
          alert("Enter a valid data")
        }
      }} onClick={()=>{
        setShowModal(false)
      }} />:null}
        <div className='px-3 py-2 flex items-center justify-between'>
            <p className='text-2xl font-bold'>Chat</p>
            <Button onClick={()=> setShowModal(true)}>New</Button>
        </div>
        <div className='max-h-[80vh] overflow-y-scroll no-scrollbar'>
            {rooms.map((room)=> (
                <RoomCard key={room.id} roomId={room.id} name={room.name} />
            ))}
            
        </div>
        <div className=' h-16 w-full absolute bottom-0 z-10'>
            <ProfileCard />
        </div>
    </div>
  )
}


const RoomCard = ({roomId, name}:{roomId:string, name:string})=>{
    const router = useRouter()
    return (
        <button className='w-full bg-gray-700 p-3 flex gap-3 items-center border-b border-b-gray-800 hover:bg-gray-800' onClick={()=>{
            // create_websocket_room({roomId})
            router.push("/dashboard/"+roomId)
        }}>
            <Avatar size='small' name={name} />
            <div>
                <h4 className='text-lg'>{name}</h4>
                {/* <p className='text-sm text-gray-400'>Sometext</p> */}
            </div>
        </button>
    )
}

export default RoomList
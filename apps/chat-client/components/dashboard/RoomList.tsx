"use client"
import React, { useState } from 'react'
import Avatar from '../Avatar'
import {  useRouter } from 'next/navigation'
import ProfileCard from './ProfileCard'
import NewRoom from './NewRoom'

const RoomList = ({rooms}:{
    rooms:{
        id: string;
        name:string;
        image: string;
    }[]
}) => {

  return (
    <div className='text-white col-span-2 bg-gray-600 relative'>
        <div className='px-3 py-2 flex items-center justify-between'>
            <p className='text-2xl font-bold'>Chat</p>
            <NewRoom />
        </div>
        <div className='max-h-[80vh] overflow-y-scroll no-scrollbar'>
            {rooms.map((room)=> (
                <RoomCard key={room.id} roomId={room.id} image={room.image} name={room.name} />
            ))}
            
        </div>
        <div className='h-16 w-[95%] absolute bottom-0 z-10'>
            <ProfileCard />
        </div>
    </div>
  )
}


const RoomCard = ({roomId, image, name}:{roomId:string, image:string, name:string})=>{
    const router = useRouter()
    return (
        <button className='w-full bg-gray-700 p-3 flex gap-3 items-center border-b border-b-gray-800 hover:bg-gray-800' onClick={()=>{
            router.push("/dashboard/"+roomId)
        }}>
            <Avatar size='small' image={image} />
            <div>
                <h4 className='text-md text-start'>{name}</h4>
            </div>
        </button>
    )
}

export default RoomList
"use client"
import React from 'react'
import Button from '../Button'
import getUser from '@/app/lib/actions/getUser'
import Avatar from '../Avatar'

const RoomList = ({rooms}:{
    rooms:{
        id: string;
        name: string;
    }[]
}) => {
  
  return (
    <div className='text-white col-span-2 bg-gray-600'>
        <div className='px-3 py-2 flex items-center justify-between'>
            <p className='text-2xl font-bold'>Chat</p>
            <Button>New</Button>
        </div>
        <div className='max-h-[88vh] overflow-y-scroll no-scrollbar'>
            {rooms.map((room)=> (
                <RoomCard name={room.name} />
            ))}
            
        </div>
    </div>
  )
}


const RoomCard = ({name}:{name:string})=>{
    return (
        <button className='w-full bg-gray-700 p-3 flex gap-3 items-center border-b hover:bg-gray-800'>
            <Avatar size='small' name={name} />
            <div>
                <h4 className='text-lg'>{name}</h4>
                <p className='text-sm text-gray-400'>Sometext</p>
            </div>
        </button>
    )
}

export default RoomList
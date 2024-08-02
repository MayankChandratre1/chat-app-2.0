import React from 'react'
import Avatar from '../Avatar'
import getRoom from '@/app/lib/actions/getRoom'
import Loader from '../Loader'
import AddMember from './AddMember'
import MessagesWindow from './MessagesWindow'
import ViewRoom from './ViewRoom'
import DeleteRoom from './DeleteRoom'


const Room = async ({roomId}:{roomId:string}) => {
  const room = await getRoom(roomId)
  
  if(roomId == 'base'){
    return (
      <div className='text-white col-span-6  max-h-screen grid place-items-center text-sm italic opacity-50'>
        Open a chat
      </div>
    )
  }

  return (
    <div className='text-white col-span-6 flex flex-col max-h-screen'>
      <div className='px-5 py-3 flex items-center justify-between gap-5 text-2xl bg-black'>
          <div className='flex items-center gap-5'>
            <Avatar image={room?.image} size='small' />
            <p>{room?.name}</p>
          </div>
          <div className='flex'>
            <ViewRoom roomId={roomId} />
            <AddMember roomId={roomId} />
            <DeleteRoom roomId={roomId} />
          </div>
      </div>
      <div className='p-3 flex-1 flex flex-col'>
        <div className='flex-1 flex flex-col justify-between'>
          {room ? 
          <MessagesWindow messages={room.messages} roomId={roomId} />:
          <div><Loader/></div>}
        </div>
      </div>
    </div>
  )
}

export default Room
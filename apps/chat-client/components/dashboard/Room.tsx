import React from 'react'
import Avatar from '../Avatar'
import getRoom from '@/app/lib/actions/getRoom'
import Loader from '../Loader'
import SendMessageBox from './SendMessageBox'
import getUser from '@/app/lib/actions/getUser'
import Button from '../Button'
import AddMember from './AddMember'
import MessagesWindow from './MessagesWindow'
import ViewRoom from './ViewRoom'
import DeleteRoom from './DeleteRoom'


const Room = async ({roomId}:{roomId:string}) => {
  const room = await getRoom(roomId)
  const user = await getUser()
  
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

{/* <div className='overflow-y-scroll no-scrollbar max-h-[75vh]'>
            {room.messages.map(message=>{
              if(message.username == user?.username){
                return(
                  <div className='my-4 mx-1 flex flex-col gap-1 items-end text-sm '>
                    <span className='text-green-500 text-xs opacity-90 font-semibold px-3'>{"You"}</span> <p className='px-3 py-2 bg-blue-500 rounded-2xl'>{message.content}</p><p className='text-xs font-thin opacity-50 py-1'>{message.createdAt.toUTCString().split(' ')[1] + " " + message.createdAt.toUTCString().split(' ')[2] + ", " + message.createdAt.toUTCString().split(' ')[4]}</p>
                  </div>
                )
              }
              return(
                <div className='my-4 mx-1 flex flex-col gap-1 items-start text-sm'>
                  <span className='text-blue-600 text-xs opacity-90 font-semibold px-3'>{message.username ? message.username:"Anonymus"}</span> <p className='px-3 py-2 bg-blue-500 rounded-2xl'>{message.content}</p><p className='text-xs font-thin opacity-50 py-1'>{message.createdAt.toUTCString().split(' ')[1] + " " + message.createdAt.toUTCString().split(' ')[2] + ", " + message.createdAt.toUTCString().split(' ')[4]}</p>
                </div>
              )
            })}
          </div> */}
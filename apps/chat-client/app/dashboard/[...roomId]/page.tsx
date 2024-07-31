import getUser from '@/app/lib/actions/getUser'
import create_room from '@/app/lib/websocket_actions/create_room'
import Avatar from '@/components/Avatar'
import InputModal from '@/components/dashboard/InputModal'
import Room from '@/components/dashboard/Room'
import RoomList from '@/components/dashboard/RoomList'
import React from 'react'

const DashboardPage = async ({params}:{params:any}) => {
  const user = await getUser()
  
  return (
    <div className='h-screen w-screen bg-gray-900 grid grid-cols-8'>
      <RoomList rooms={user?.rooms || []}/>
      
      <Room roomId={params.roomId[0]} />
    </div>
  )
}

export default DashboardPage
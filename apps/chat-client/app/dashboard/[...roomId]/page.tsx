import getUser from '@/app/lib/actions/getUser'

import Room from '@/components/dashboard/Room'
import RoomList from '@/components/dashboard/RoomList'
import { signIn } from 'next-auth/react'
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
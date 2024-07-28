import getUser from '@/app/lib/actions/getUser'
import Avatar from '@/components/Avatar'
import Room from '@/components/dashboard/Room'
import RoomList from '@/components/dashboard/RoomList'
import React from 'react'

const DashboardPage = async () => {
  const user = await getUser()
  return (
    <div className='h-screen w-screen bg-gray-900 grid grid-cols-8'>
      <RoomList rooms={user?.rooms || []}/>
      <Room roomId={"e06bfc17-d18c-4e7d-a7af-995074fbb4b5"} />
    </div>
  )
}

export default DashboardPage
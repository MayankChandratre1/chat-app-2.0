import React from 'react'
import ProfileBar from './ProfileBar'
import EditProfile from './EditProfile'
import getUser from '@/app/lib/actions/getUser'


const MyProfile = async () => {
    const user = await getUser()
    
  return (
    <div className='flex flex-col min-h-screen bg-gray-900'>
        <ProfileBar image={user?.profile_pic || "https://avatar.iran.liara.run/public/boy"} username={user?.username || "Anonymus"} phone={user?.phone || "9999999999"} mycard={true}/>
        <EditProfile user={user} />
    </div>
  )
}

export default MyProfile
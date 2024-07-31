import authOptions from '@/app/lib/authOptions'
import { getServerSession } from 'next-auth'
import React from 'react'
import Avatar from '../Avatar'
import Button from '../Button'
import { signOut } from 'next-auth/react'
import InputModal from '../dashboard/InputModal'
import ProfileBar from './ProfileBar'
import EditProfile from './EditProfile'
import getUser from '@/app/lib/actions/getUser'

// {
//     user: {
//       name: undefined,
//       email: 'user1hash@gmail.com',
//       image: 'https://www.gravatar.com/avatar/',
//       id: '8ac1d910-a90f-44a3-965e-d801a471a38b',
//       phone: '9876543211',
//       username: 'User1Hash'
//     }
//   }

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
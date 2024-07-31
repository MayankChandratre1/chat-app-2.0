
import getUser from '@/app/lib/actions/getUser'
import Link from 'next/link'
import React from 'react'
import Button from '../Button'
import { useRouter } from 'next/navigation'

const ProfileCard = () => {
    const router = useRouter()
  return (
    <div className='px-3'>
        <Button className='w-full m-0' onClick={()=> router.push("/profile/myprofile")}>My Profile</Button>
    </div>
  )
}

export default ProfileCard
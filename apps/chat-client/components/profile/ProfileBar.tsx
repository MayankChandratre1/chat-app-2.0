"use client"
import React from 'react'
import Avatar from '../Avatar'
import Button from '../Button'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const ProfileBar = ({image,username, phone, mycard}:{
    image:string,
    username:string,
    phone:string,
    mycard?: boolean
}) => {
  const router = useRouter()
  return (
    <div className='flex items-center gap-5 px-3 py-4 text-white'>
          <Button onClick={()=>{
            router.push("/dashboard/base")
          }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
</svg>
</Button>
           <Avatar image={image} size='large' />
           <div className='text-white flex flex-1 items-baseline gap-2'>
                <p className='text-3xl'>{username}</p>
                <p className='text-sm text-gray-400'>{phone}</p>
           </div>
           {mycard ? <div>
             <Button className='bg-red-500' onClick={async ()=> {
              await signOut({
                redirect:false
              })
              router.push("/auth/signin")
             }}>Sign Out</Button>
           </div>:null}
        </div>
  )
}

export default ProfileBar
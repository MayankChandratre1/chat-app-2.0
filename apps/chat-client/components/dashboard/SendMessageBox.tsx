"use client"
import React, { useState } from 'react'
import Button from '../Button'
import { useSession } from 'next-auth/react'
import saveMessage from '@/app/lib/actions/saveMessage'

const SendMessageBox = ({roomId}:{roomId:string}) => {
  const session = useSession()
  const [message, setMessage] = useState("")

  return (
    <div className='flex items-center'>
        <input type="text" placeholder='Type here' value={message} onChange={(e)=>{
            setMessage(e.target.value)
        }} className='py-1 h-10 px-3 bg-white bg-opacity-20 flex-1 rounded-full outline-none'/>
        <Button onClick={async ()=>{
            await saveMessage({
                content:message,
                username: session.data?.user.username || "Anonymus",
                userId: session.data?.user.id,
                roomId
            })
            setMessage("") 
        }}>Send Message</Button>
    </div>
  )
}

export default SendMessageBox
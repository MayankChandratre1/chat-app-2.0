"use client"
import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button'
import { useSession } from 'next-auth/react'
import saveMessage from '@/app/lib/actions/saveMessage'
import { getConnection } from '@/app/lib/websocket_actions/websocket_util'

const SendMessageBox = ({roomId}:{roomId:string}) => {
  const session = useSession()
  const [message, setMessage] = useState("")
  const ws = useRef<WebSocket | null>(null)
  useEffect(()=>{
    ws.current =  new WebSocket(process.env.WEBSOCKET_URL||"ws://localhost:8080")
    ws.current.onopen = ()=>{
      console.log("CONN");
      if(ws.current){
        ws.current.onmessage = (message)=>{
          console.log(message.data);
        }
      }
    }
    ws.current.onclose = ()=>{
      console.log("Closed");
    }
    return () => {
      ws.current?.close()
    }
  },[roomId])

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
             ws.current?.send(JSON.stringify({
                type:"BROADCAST_MESSAGE",
                roomId,
                message:message,
            }))
            setMessage("") 
        }}>Send</Button>
    </div>
  )
}

export default SendMessageBox
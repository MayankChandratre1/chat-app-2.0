"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button';
import saveMessage from '@/app/lib/actions/saveMessage';

const MessagesWindow = ({messages, roomId}:{
    messages: {
        id: string;
        content: string;
        createdAt: Date;
        username: string | null;
        roomId: string;
    }[],
    roomId:string
}) => {
  const session = useSession()
  const [messagesList, setMessagesList] = useState<typeof messages>(messages)
  const [message, setMessage] = useState("")
  const ws = useRef<WebSocket | null>(null)
  useEffect(()=>{
    ws.current =  new WebSocket(process.env.WEBSOCKET_URL||"ws://localhost:8080")
    ws.current.onopen = ()=>{
      console.log("CONN");
      ws.current?.send(JSON.stringify({
        type:"JOIN_ROOM",
        roomId
      }))
      if(ws.current){
        ws.current.onmessage = async (mes)=>{
          const data:{
            type: string,
            message:string
          } = await JSON.parse(mes.data)
          console.log(mes);
          
          if(data.type === 'CHAT'){
            const message_data = await JSON.parse(data.message)
            console.log(message_data);
            const new_message_data = {
              ...message_data,
              createdAt: new Date(message_data.createdAt)
            }
            setMessagesList(prev => [...prev, new_message_data])
          }
        }
      }
    }
    ws.current.onclose = ()=>{
      console.log("Closed");
    }
    return () => {
      if(ws.current?.readyState === WebSocket.OPEN){
        ws.current?.send(JSON.stringify({
          type:"LEAVE_ROOM",
          roomId:roomId
        }))
      }
      ws.current?.close()
    }
  },[roomId, messagesList])
  return (
    <>
    <div className='overflow-y-scroll flex-1 no-scrollbar max-h-[75vh]'>
            {messagesList.map(message=>{
              if(message.username == session?.data?.user.username){
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
    </div>
    <div>
    <div className='flex items-center'>
        <input type="text" placeholder='Type here' value={message} onChange={(e)=>{
            setMessage(e.target.value)
        }} className='py-1 h-10 px-3 bg-white bg-opacity-20 flex-1 rounded-full outline-none'/>
        <Button onClick={async ()=>{
            const savedMessage = await saveMessage({
                content:message,
                username: session.data?.user.username || "Anonymus",
                userId: session.data?.user.id,
                roomId
            })
            if(savedMessage){
              ws.current?.send(JSON.stringify({
                 type:"BROADCAST_MESSAGE",
                 roomId,
                 message:JSON.stringify(savedMessage),
             }))
            }
            setMessage("") 
        }}>Send</Button>
    </div>
    </div>
    </>
  )
}

export default MessagesWindow
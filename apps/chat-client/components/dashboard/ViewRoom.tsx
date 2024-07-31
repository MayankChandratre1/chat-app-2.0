"use client"
import React, { useState } from 'react'
import Button from '../Button'
import getUsersInRoom from '@/app/lib/actions/getUsersInRoom'
import MembersPanel from './MembersPanel'

const ViewRoom = ({roomId}:{roomId:string}) => {
  const [showModal, setShowModal] = useState(false)
  const [members, setMembers] = useState<{
    email:string,
    username:string,
    phone:string | null,
    profile_pic:string
  }[]>([])
   
  return (
    <div className='text-sm'>
        {showModal ? <div className='fixed grid place-items-center top-0 left-0 w-screen h-screen z-30 backdrop-blur-md'>
          <div>
            <div className='flex justify-between mb-3'>
              <h3 className='text-3xl font-bold'>Members</h3>
              <button className='w-10 h-10 bg-red-500 rounded-full' onClick={()=>{
                setShowModal(false)
              }}>X</button>
            </div>
          <MembersPanel members={members} />
          </div>
        </div>:null}
        <Button onClick={async ()=> {
          const data = await getUsersInRoom(roomId)
          if(!data.error && data.members){
            setMembers(data.members)
            setShowModal(true)
          }
        }}>View Info</Button>
    </div>
  )
}



export default ViewRoom
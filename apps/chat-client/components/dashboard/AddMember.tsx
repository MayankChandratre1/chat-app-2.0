"use client"
import React, { useState } from 'react'
import Button from '../Button'
import InputModal from './InputModal'
import add_member from '@/app/lib/websocket_actions/add_member'

const AddMember = ({roomId}:{roomId:string}) => {
  const [showModal, setShowModal] = useState(false)
  
  return (
    <div className='text-sm'>
        {showModal ? <InputModal 
            title='Add By Phone'
            buttonText='Add'
            onSubmit={
                async (inputField) => {
                    if(inputField.trim().length > 0){
                      const {success,room} = await add_member({roomId, phone:inputField});
                      if(success){
                        setShowModal(false)
                      }else{
                        alert("something went wrong")
                      }
                    }else{
                      alert("Enter a valid data")
                    }
                  }
            }
            onClick={()=>{
                setShowModal(false)
              }}
        />:null}
        <Button onClick={()=> setShowModal(true)}>Add Members</Button>
    </div>
  )
}

export default AddMember
"use client"
import React, { useState } from 'react'
import Button from '../Button'

const ViewRoom = () => {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className='text-sm'>

        <Button onClick={()=> setShowModal(true)}>View Info</Button>
    </div>
  )
}

export default ViewRoom
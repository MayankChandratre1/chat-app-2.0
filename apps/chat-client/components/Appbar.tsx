"use client"

import authOptions from '@/app/lib/authOptions';
import { useSession } from 'next-auth/react';
import React from 'react'

const AppBar = () => {
    const data = useSession()?.data?.user
  return (
    <div>
        <img src={data?.image} />
        {data?.id}
    </div>
  )
}

export default AppBar
"use client"

import authOptions from '@/app/lib/authOptions';
import { useSession } from 'next-auth/react';
import React from 'react'

const AppBar = () => {
    const data = useSession()?.data?.user
  return (
    <div>
      Appbar
    </div>
  )
}

export default AppBar
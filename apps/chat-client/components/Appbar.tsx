"use client"

import signup from '@/app/lib/actions/signup';
import { signIn } from 'next-auth/react'
import React from 'react'
const AppBar = () => {
    console.log(process.env.NEXTAUTH_URL);
    
  return (
    <div>
        <button className='bg-gray-900 p-3 text-white rounded-md' onClick={async ()=>{
          const data = {
            username:"Mayank",
            phone:"1234567890",
            email:"johndoe@gmail.com",
            password:"password"
          }
          const user = await signup(data);
          alert("User Created");
          console.log(user);
        }}>SignIn</button>
    </div>
  )
}

export default AppBar
"use client"
import signup from '@/app/lib/actions/signup'
import Button from '@/components/Button'
import LabelledInput from '@/components/LabelledInput'
import NamedCard from '@/components/NamedCard'
import { log } from 'console'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SignInPage = () => {
    const router = useRouter()
  const [formdata, setFormdata] = useState({
    username: '',
    password: ''
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
}

const handleSubmit = async () => {
    if(formdata.username && formdata.password){
        console.log(formdata);
        
        const res = await signIn('credentials',{
            ...formdata,
            redirect:false
        })
        console.log(res);
        router.push("/")
    }else{
        alert("Check credentials and try again")
        router.push("/auth/signin")
    }
}
  return (
    <div>
        <div className='h-screen grid place-items-center bg-gray-800'>
        <NamedCard name='SignUp'>
            <LabelledInput name='Username' placeholder='John Doe' type='text' onChange={handleChange} />
            <LabelledInput name='Password' placeholder='password' type='password' onChange={handleChange} />
            <Button onClick={async () => {
    if(formdata.username && formdata.password){
        console.log(formdata);
        
        const res = await signIn('credentials',{
            ...formdata,
            redirect:false
        })
        if(!res?.error){
            router.push("/")
        }else{
            alert("Check credentials and try again")
            router.push("/auth/signin")
        }
    }else{
        alert("Check credentials and try again")
        router.push("/auth/signin")
    }
}}>Sign In</Button>
            <div className='text-sm text-gray-400'>Don't Have a account? <Link href={"/auth/signup"} className='italic underline hover:text-white'>Create one</Link></div>
        </NamedCard>
    </div>
    </div>
  )
}

export default SignInPage
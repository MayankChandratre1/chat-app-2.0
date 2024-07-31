"use client"
import React, { ChangeEvent, useState } from 'react'

import LabelledInput from '../LabelledInput'
import Avatar from '../Avatar'
import updateUser from '@/app/lib/actions/updateUser'
import Button from '../Button'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import comparePassword from '@/app/lib/actions/comparePassword'

const EditProfile = ({user}:{
    user: { id:string, email: string; phone: string | null; username: string; profile_pic: string; rooms: { id: string; name: string; }[]; } | null
}) => {

    const [formdata, setFormdata] = useState({
        email:user?.email,
        username:user?.username,
        image:user?.profile_pic
    })

    const [newPassword, setNewPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [currentPassword, setCurrentPassword] = useState<string>("")

    if(!user){
        return (
            <div className='h-[50vh] flex-1 grid place-items-center text-gray-500 text-2xl italic'>
               <p>
               Error in getting user details,
               Try <Link href={"/auth/signin"} className='underline hover:text-gray-400' >Signing in</Link> again.
               </p>
            </div>
        )
    }

    const router = useRouter()
    const handleChange:React.ChangeEventHandler<HTMLInputElement> = (e)=>{
        setFormdata({
            ...formdata,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit:React.FormEventHandler<HTMLFormElement> = async (e)=>{
        e.preventDefault()
        const updated_user = await updateUser({
            update_data:formdata,
            id:user.id
        })
        console.log("Updated");
        await signOut({
            redirect:false
        })
        router.push("/auth/signin")
    }
    const handlePasswordSubmit:React.FormEventHandler<HTMLFormElement> = async (e)=>{
        e.preventDefault()
        
        
        if(currentPassword.trim() != ""){
            const res = await comparePassword(user.id,currentPassword)
            if(res){
                if(newPassword === confirmPassword){
                    const updated_user = await updateUser({
                        update_data:{
                            password:confirmPassword
                        },
                        id:user.id
                    })
                    console.log(updated_user);
                    await signOut({
                        redirect:false
                    })
                    router.push("/auth/signin")
                }
            }
        }
        
    }

    const toBase64:(file:Blob) => Promise<string | ArrayBuffer | null> = async (file:Blob) => {
        return new Promise((res, rej)=>{
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = ()=>{
                res(fileReader.result)
            }
            fileReader.onerror = ()=>{
                rej(fileReader.error)
            }
        })
    }

    const handleFileUpload = async (e:ChangeEvent<HTMLInputElement>) => {
        
        if(e.target.files){
            if(Number(e.target.files[0].size) > 800000){
                alert("Please choose a smaller image")
                e.target.value = ""
                return user.profile_pic
            }
            let x:any = ""
            x = await toBase64(e.target.files[0])
            return x
        }
        return user.profile_pic
    }

  return (
    <div className='text-white px-5 py-2'>
        <form onSubmit={handleSubmit}>
            <fieldset className='grid grid-cols-2 border border-gray-600 bg-gray-800 rounded-2xl px-5 py-2 gap-5 mb-5'>
                <legend className='  text-3xl'>Contact Information</legend>
                <LabelledInput name='Username' type='text' value={formdata.username} placeholder="Can't be empty" onChange={handleChange} />
                <LabelledInput name='Email' type='text' value={formdata.email} placeholder="Can't be empty" onChange={handleChange} />
            </fieldset>
            <fieldset className='grid grid-cols-3 border border-gray-600 bg-gray-800 rounded-2xl px-5 py-4 gap-5 mb-5'>
                <legend className='  text-3xl'>Profile Photo</legend>
                <div className='grid place-items-center'>
                    <img src={formdata.image} alt="a profile image" className={`w-52 h-52 rounded-full object-cover`} />
                </div>
                <div className='col-span-2 flex flex-col justify-center'>
                    <input type="file" accept='.png, .jpg, .jpeg, .webp' onChange={async (e)=>{
                        const x = await handleFileUpload(e)
                        setFormdata({
                            ...formdata,
                            image: x
                        })
                    }}
                    className='block w-full bg-gray-700 rounded-xl text-sm text-gray-500  file:bg-gray-500 file:inline-block file:border-none file:py-2 file:mr-2  file:text-gray-300 cursor-pointer file:cursor-pointer file:hover:bg-gray-600'
                    />
                    <p  className='mt-2 px-3 text-xs text-gray-500 italic font-mono'>only .png .jpg .jpeg .webp (under 800Kb)</p>
                </div>
            </fieldset>
            <div className='flex items-center'>
                <Button type='submit'>Update</Button>
                <p className='text-xs text-gray-500 italic'>You will Need to Sign In again after update...</p>
            </div>
        </form>
            <div>
                <form onSubmit={handlePasswordSubmit}>
                <fieldset className='grid grid-cols-3 border border-gray-600 bg-gray-800 rounded-2xl px-5 py-2 gap-5 mb-5'>
                <legend className='  text-3xl'>Contact Information</legend>
                <LabelledInput name='Current Password' type='password' value={currentPassword} placeholder="Can't be empty" onChange={(e)=>{
                    setCurrentPassword(e.target.value)
                }} />
                <LabelledInput name='New Password' type='password' value={newPassword} placeholder="Can't be empty" onChange={(e)=>{
                    setNewPassword(e.target.value)
                }} />
                <LabelledInput name='Confirm Password' type='password' value={confirmPassword} placeholder="Can't be empty" onChange={(e)=>{
                    setConfirmPassword(e.target.value)
                }} />
            </fieldset>
                <Button type='submit'>Change Password</Button>
                </form>
            </div>
    </div>
  )
}

export default EditProfile
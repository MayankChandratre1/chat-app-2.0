'use server'
import prisma from '@repo/db/prisma'
import { signIn } from 'next-auth/react'

type signupProps = {
    username: string,
    phone: string,
    email: string,
    password: string
}

const signup = async (data:signupProps) =>{
    try{
        const user = await prisma.user.create({
            data:data
        })
        
        return {error: null, user:user};
    }catch(err){
        console.error(err);
        return {error: err, user: null}
    }
}

export default signup
'use server'
import prisma from '@repo/db/prisma'
import bcrypt from "bcrypt"

type signupProps = {
    username: string,
    phone: string,
    email: string,
    password: string
}

const signup = async (data:signupProps) =>{
    try{
        const password = data.password
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data:{...data, password:hashedPassword}
        })
        return {error: null, user:user};
    }catch(err){
        console.error(err);
        return {error: err, user: null}
    }
}

export default signup
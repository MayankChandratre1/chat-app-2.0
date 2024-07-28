"use server"
import { getServerSession } from "next-auth"
import authOptions from "../authOptions"
import prisma from "@repo/db/prisma"
const getUser = async ()=>{
    const session = await getServerSession(authOptions)
    if(!session){
        return null
    }
    const user = {
        ...session.user
    }
    const res = await prisma.user.findUnique({
        where:{
            id:user.id
        },
        select:{
            username:true,
            phone:true,
            email:true,
            profile_pic:true,
            rooms:true
        }
    })
    return res
}

export default getUser
"use server"
import { getServerSession } from "next-auth"
import authOptions from "../authOptions"
import prisma from "@repo/db/prisma"
const getRoom = async (roomId:string)=>{
    const res = await prisma.room.findFirst({
        where:{
            id:roomId
        },
        select:{
            messages:true,
            name:true,
            members:true
        }
    })
    return res    
}

export default getRoom
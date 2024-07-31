"use server"
import prisma from "@repo/db/prisma"
import { log } from "console"
const add_member = async ({roomId, phone}:{roomId:string,phone:string}) => {
    try{
        const room = await prisma.room.update({
            where:{
                id:roomId
            },
            data:{
                members:{
                    connect:{
                        phone: phone
                    }
                }
            }
        })
        return {
            success:true,
            room: room
        }
    }catch(e){
        log(e);
        alert("something went wrong")
        return {
            success:false,
            room: null
        }
    }
}

export default add_member
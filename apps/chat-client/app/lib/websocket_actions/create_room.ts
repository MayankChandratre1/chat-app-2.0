"use server"
import prisma from "@repo/db/prisma"
import getUser from "../actions/getUser"
import { log } from "console"
const create_room = async ({name}:{name:string}) => {
    const user = await getUser()
    try{
        const room = await prisma.room.create({
            data:{
                name,
                members:{
                    connect:{
                        email: user?.email
                    }
                }
            }
        })
        const dbUser = await prisma.user.update({
            where:{
                email:user?.email || ""
            },
            data:{
                rooms:{
                    connect:{
                        id:room.id
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

export default create_room
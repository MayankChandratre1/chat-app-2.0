"use server"
import prisma from "@repo/db/prisma"
const saveMessage = async ({username, content, roomId, userId}:{
    username?:string,
    content:string,
    roomId:string,
    userId?:string
}) => {
    if(username && userId){
        const res = await prisma.message.create({
            data:{
                content,
                username,
                roomId,
            }
        })
        console.log(res);
        return res.id
    }
    return null
}

export default saveMessage
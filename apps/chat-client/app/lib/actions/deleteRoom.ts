"use server"
import prisma from "@repo/db/prisma"
const deleteRoom = async (roomId:string) => {
    try{
        await prisma.room.delete({
            where:{
                id:roomId
            }
        })
        return {
            success:true
        }
    }catch(error){
        console.log(error);
        return {
            success:false
        }
    }
}

export default deleteRoom
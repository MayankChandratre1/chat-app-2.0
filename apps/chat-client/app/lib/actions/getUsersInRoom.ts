"use server"

import getRoom from "./getRoom"

const getUsersInRoom = async (roomId:string) => {
    try{
        const room = await getRoom(roomId);
        if(!room){
            throw new Error("Room Not Found")
        }
        const members = room.members
        
        return {
            error:null,
            members
        }
    }catch(error){
        console.log(error);
        return {
            error,
            members:null
        }
        
    }
}

export default getUsersInRoom
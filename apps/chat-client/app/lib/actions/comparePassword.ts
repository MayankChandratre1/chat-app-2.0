"use server"
import bcrypt from "bcrypt"
import prisma from "@repo/db/prisma";
const comparePassword = async (userId:string,password:string) =>{
    try{
        const userPassword = await prisma.user.findFirst({
            where:{
                id:userId
            },
            select:{
                password:true
            }
        })
        if(!userPassword){
            throw new Error("Error in fetching")
        }
        const result = await bcrypt.compare(password,userPassword.password);
        return result
    }catch(error){
        alert(error);
        return false
    }
}

export default comparePassword
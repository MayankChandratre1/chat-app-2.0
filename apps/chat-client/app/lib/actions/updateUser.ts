'use server'
import prisma from '@repo/db/prisma'
import bcrypt from "bcrypt"
import { error } from 'console'

type updateProps = {
    update_data:{
        username?: string,
        email?: string,
        image?:string,
        password?:string
    },
    id:string
}

const updateUser = async ({update_data, id}:updateProps) =>{
    try{
      let updatedUser = null;
      if(update_data.password){
         updatedUser = await prisma.user.update({
            where:{
                id:id
            },
            data:{
                profile_pic:update_data.image,
                username:update_data.username,
                email:update_data.email,
                password:await bcrypt.hash(update_data.password,10)
            }
           })
      }else{
         updatedUser = await prisma.user.update({
            where:{
                id:id
            },
            data:{
                profile_pic:update_data.image,
                username:update_data.username,
                email:update_data.email,
            }
           })
      }
       console.log(updatedUser);
       return {error:null, user:updatedUser}
    }catch(err){
        console.error(err);
        return {error: err, user: null}
    }
}

export default updateUser
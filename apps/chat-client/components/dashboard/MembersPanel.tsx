import React from 'react'
import Avatar from '../Avatar'

const MembersPanel = ({members}:{
    members:{
        email:string,
        username:string,
        phone:string | null,
        profile_pic:string
      }[]
}) => {
    console.log(members);
    
  return (
    <div className='bg-gray-300 px-3 py-2 rounded-md shadow-lg min-w-[80vw] max-h-[75vh] overflow-y-scroll no-scrollbar'>
        {members.map(member=>{
            return (
                <div key={member.phone} className='border-b border-b-black py-2 flex items-center gap-3'>
                    <Avatar image={member.profile_pic} size='small' />
                    <div>
                        <p className='font-semibold text-xl text-black'>{member.username}</p>
                        <p className='text-sm text-gray-500'>{member.phone}</p>
                        <p className='text-sm text-gray-500'>{member.email}</p>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default MembersPanel
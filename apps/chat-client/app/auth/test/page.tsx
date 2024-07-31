import getRoom from '@/app/lib/actions/getRoom';
import getUser from '@/app/lib/actions/getUser';
import MembersPanel from '@/components/dashboard/MembersPanel';
import MyProfile from '@/components/profile/MyProfile';

import React from 'react'

 const Test = async () => {
    const data = await getUser()
    const members = [
      {
        email: 'mayankmchandratre@gmail.com',
        phone: '7843065180',
        username: 'MayankChandratre',
        profile_pic: "https://www.gravatar.com/avatar/"
      },
      {
        email: 'mayankmchandratre@gmail.com',
        phone: '7843065180',
        username: 'MayankChandratre',
        profile_pic: "https://www.gravatar.com/avatar/"
      },
    ]
  return (
    <div className='bg-gray-900 min-h-screen'>
      <div className=' px-3 py-2 rounded-md'>
        <div className='text-xs bg-red-500 rounded-full w-5 h-5 grid place-items-center m-2'>X</div>
        <MembersPanel members={members}/>
      </div>
    </div>
  )
}

export default Test
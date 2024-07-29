import getRoom from '@/app/lib/actions/getRoom';
import getUser from '@/app/lib/actions/getUser';
import MyProfile from '@/components/profile/MyProfile';

import React from 'react'

 const Test = async () => {
    const data = await getUser()
    
  return (
    <div className='bg-gray-900 min-h-screen'>
        <MyProfile />
    </div>
  )
}

export default Test
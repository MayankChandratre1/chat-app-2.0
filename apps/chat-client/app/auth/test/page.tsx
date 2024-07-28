import getRoom from '@/app/lib/actions/getRoom';
import getUser from '@/app/lib/actions/getUser';

import React from 'react'

 const Test = async () => {
    const data = await getUser()
    
  return (
    <div>
        {"Test Data"}
    </div>
  )
}

export default Test
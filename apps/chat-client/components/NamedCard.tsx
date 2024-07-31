import React from 'react'

const NamedCard = ({name,children}:{
    name: string,
    children: React.ReactNode
}) => {

    
  return (
    <div className='px-3 py-5 bg-gray-700 text-white min-w-[50vw] rounded-xl shadow-lg'>
        <div className='text-2xl text-center font-bold mb-5'>{name}</div>
        <div className='px-5'>
            {children}
        </div>
    </div>
  )
}

export default NamedCard
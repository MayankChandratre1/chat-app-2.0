import Image from 'next/image'
import React from 'react'

const Avatar = ({image, size, name}:{image?:string, size:"small"|"large", name?:string}) => {
  return (
    <div>
        {image ? 
       <Image src={image} alt='Profile' width={50} height={50} className={`${size == "small"? "w-10 h-10":"w-16 h-16"} rounded-full object-cover`} />:
        <div className={`${size == "small"? "w-10 h-10":"w-16 h-16"} grid place-items-center bg-gray-500 rounded-full`}>{name?.toUpperCase().charAt(0) || "N"}</div>
        }
    </div>
  )
}

export default Avatar
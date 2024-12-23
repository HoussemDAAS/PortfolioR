import React, { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
const Orbit = (props:HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={twMerge('size-[200px] border border-black-500 rounded-full',props.className)}>
      
    </div>
  )
}

export default Orbit

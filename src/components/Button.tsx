import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge';
const Button = (
    props:{
    variant: 'primary' | 'secondary' | 'text';
    iconAfter?:ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
    const {className,children,variant,iconAfter,...rest} = props;
  return (
    <button className={twMerge(
        '  font-bold relative h-11 px-6 uppercase rounded-xl inline-flex items-center justify-center gap-2 transition duration-500 ease-in-out group/button',
        variant==="primary"&&'bg-orange-500 hover:bg-orange-700 text-white animate-pulse',
        variant==="secondary"&&' border-orange-500 border-2 text-black-800 hover:bg-orange-500 hover:text-black-900',
        variant==="text"&&"h-auto px-0 text-black-800 after:transition-all after:duration-500 after:content-[''] after:h-px after:w-0 after:absolute after:top-full after:bg-orange-500 hover:after:w-full",
        className)}{...rest}>
        <span>{children}</span>
        {iconAfter && <span>{iconAfter}</span>}
    </button>
  )
}

export default Button

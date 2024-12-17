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
        '  font-bold h-11 px-6 uppercase rounded-xl inline-flex items-center justify-center gap-2',
        variant==="primary"&&'bg-orange-500 hover:bg-orange-700 text-white animate-pulse',
        variant==="secondary"&&' border-orange-500 border-2 text-black-800',
        variant==="text"&&'h-auto px-0 text-black-800',
        className)}{...rest}>
        <span>{children}</span>
        {iconAfter && <span>{iconAfter}</span>}
    </button>
  )
}

export default Button

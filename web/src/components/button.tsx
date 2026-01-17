import { Loader2 } from 'lucide-react'
import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  isLoading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  onClick?: () => void
}

const Button = ({
  children,
  isLoading = false,
  disabled = false,
  type = 'button',
  className = '',
  onClick,
}: ButtonProps) => {
  const isDisabled = disabled || isLoading

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`w-full rounded-md bg-[#642AF5] hover:bg-[#642AF5]/90 cursor-pointer px-4 py-3 font-medium text-white transition-colors disabled:cursor-not-allowed disabled:bg-[#CBCBCB] disabled:opacity-50 ${className} `}
    >
      {isLoading ?
        <Loader2 className='animate-spin mx-auto' />
 : children}
    </button>
  )
}

export default Button

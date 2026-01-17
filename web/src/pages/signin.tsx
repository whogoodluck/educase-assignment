import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { signinSchema, type SigninInput } from '../schemas/user.schema'
import Button from '../components/button'
import { Info } from 'lucide-react'
import { Link } from 'react-router-dom'


export default function Signin() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SigninInput>({
    resolver: zodResolver(signinSchema),
  })

  const onSubmit = async (data: SigninInput) => {
    try {
      setError('')
      setIsLoading(true)
      await login(data.email, data.password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='h-screen flex md:p-4'>
      <div className='mx-auto h-full w-full max-w-93.75 md:border border-gray-200 bg-[#F7F8F9] px-5 py-8'>
        <div className='mb-6'>
          <h1 className='mb-3.5 text-[28px] font-semibold text-[#1D2226]'>
            Signin to your <br /> PopX account
          </h1>
          <p className='text-[18px] leading-relaxed text-[#919191]'>
            Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit,
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-3.5'>
          <div className='flex flex-col'>
            <label
              htmlFor='email'
              className={`font- z-10 -mb-2.5 ml-3 block w-min bg-[#F7F8F9] px-1 text-sm whitespace-nowrap ${errors.email ? 'text-[#DD4A3D]' : 'text-[#6C25FF]'}`}
            >
              Email Address
            </label>
            <input
              {...register('email')}
              type='text'
              id='email'
              placeholder='Enter email address'
              className={`w-full rounded-md border text-sm border-[#CBCBCB] px-4 py-3 focus:border-transparent focus:ring-1 focus:outline-none ${errors.email ? 'border-[#DD4A3D] focus:ring-[#DD4A3D]' : 'focus:ring-[#6C25FF]'}`}
            />
            {errors.email && <p className='mt-1 text-sm text-[#DD4A3D]'>{errors.email.message}</p>}
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='password'
              className={`font- z-10 -mb-2.5 ml-3 block w-min bg-[#F7F8F9] px-1 text-sm whitespace-nowrap ${errors.password ? 'text-[#DD4A3D]' : 'text-[#6C25FF]'}`}
            >
              Password
            </label>
            <input
              {...register('password')}
              type='password'
              id='password'
              placeholder='Enter password'
              className={`w-full rounded-md border text-sm border-[#CBCBCB] px-4 py-3 focus:border-transparent focus:ring-1 focus:outline-none ${errors.password ? 'border-[#DD4A3D] focus:ring-[#DD4A3D]' : 'focus:ring-[#6C25FF]'}`}
            />
            {errors.password && (
              <p className='mt-1 text-sm text-[#DD4A3D]'>{errors.password.message}</p>
            )}
          </div>

          {error && (
          <div className="flex items-center text-[#B02105] text-sm space-x-1">
            <Info className='rotate-180 size-4' strokeWidth={3} /> <p className="">{error}</p>
          </div>
        )}

          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!watch('email') || !watch('password')}
          >
            Login
          </Button>
        </form>
          <div className='text-[#1D2226] mt-4 text-center text-sm'>
          Don&apos;t have an account?{' '}
          <Link
            to='/signup'
            className='text-[#6C25FF] font-medium underline-offset-4 hover:underline active:underline'
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

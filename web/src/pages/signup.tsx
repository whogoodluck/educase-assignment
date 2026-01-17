import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { signupSchema, type SignupInput } from '../schemas/user.schema'
import Button from '../components/button'
import { Info } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Signup() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      isAgency: false,
    },
  })

  const isAgency = watch('isAgency')
  const allFieldsFilled = watch('fullName') && watch('phoneNumber') && watch('email') && watch('password')

  const onSubmit = async (data: SignupInput) => {
    try {
      setError('')
      setIsLoading(true)
      await signup(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='h-screen flex md:p-4'>
      <div className='mx-auto h-full flex flex-col w-full max-w-93.75 md:border border-gray-200 bg-[#F7F8F9] px-5 py-8'>
        <div className='mb-5.5'>
          <h1 className='text-[28px] font-semibold text-[#1D2226]'>
            Create your <br /> PopX account
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className=' h-full flex flex-col justify-between gap-4'>
          <div className='space-y-3.5'>
          <div className='flex flex-col'>
            <label
              htmlFor='fullName'
              className={`z-10 -mb-2.5 ml-3 block w-min bg-[#F7F8F9] px-1 text-sm whitespace-nowrap ${errors.fullName ? 'text-[#ED3712]' : 'text-[#6C25FF]'}`}
            >
              Full Name<span className='text-[#ED3712]'>*</span>
            </label>
            <input
              {...register('fullName')}
              type='text'
              id='fullName'
              placeholder='Enter  full name'
              className={`w-full rounded-md border border-[#CBCBCB] text-sm px-4 py-3 focus:border-transparent focus:ring-1 focus:outline-none ${errors.fullName ? 'border-[#ED3712] focus:ring-[#ED3712]' : 'focus:ring-[#6C25FF]'}`}
            />
            {errors.fullName && (
              <p className='mt-1 text-sm text-[#ED3712]'>{errors.fullName.message}</p>
            )}
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='phoneNumber'
              className={`z-10 -mb-2.5 ml-3 block w-min bg-[#F7F8F9] px-1 text-sm whitespace-nowrap ${errors.phoneNumber ? 'text-[#ED3712]' : 'text-[#6C25FF]'}`}
            >
              Phone number<span className='text-[#ED3712]'>*</span>
            </label>
            <input
              {...register('phoneNumber')}
              type='tel'
              id='phoneNumber'
              placeholder='Enter  phone number'
              className={`w-full rounded-md border border-[#CBCBCB] text-sm px-4 py-3 focus:border-transparent focus:ring-1 focus:outline-none ${errors.phoneNumber ? 'border-[#ED3712] focus:ring-[#ED3712]' : 'focus:ring-[#6C25FF]'}`}
            />
            {errors.phoneNumber && (
              <p className='mt-1 text-sm text-[#ED3712]'>{errors.phoneNumber.message}</p>
            )}
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='email'
              className={`z-10 -mb-2.5 ml-3 block w-min bg-[#F7F8F9] px-1 text-sm whitespace-nowrap ${errors.email ? 'text-[#ED3712]' : 'text-[#6C25FF]'}`}
            >
              Email address<span className='text-[#ED3712]'>*</span>
            </label>
            <input
              {...register('email')}
              type='text'
              id='email'
              placeholder='Enter  email address'
              className={`w-full rounded-md border border-[#CBCBCB] text-sm px-4 py-3 focus:border-transparent focus:ring-1 focus:outline-none ${errors.email ? 'border-[#ED3712] focus:ring-[#ED3712]' : 'focus:ring-[#6C25FF]'}`}
            />
            {errors.email && <p className='mt-1 text-sm text-[#ED3712]'>{errors.email.message}</p>}
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='password'
              className={`z-10 -mb-2.5 ml-3 block w-min bg-[#F7F8F9] px-1 text-sm whitespace-nowrap ${errors.password ? 'text-[#ED3712]' : 'text-[#6C25FF]'}`}
            >
              Password <span className='text-[#ED3712]'>*</span>
            </label>
            <input
              {...register('password')}
              type='password'
              id='password'
              placeholder='Enter  password'
              className={`w-full rounded-md border border-[#CBCBCB] text-sm px-4 py-3 focus:border-transparent focus:ring-1 focus:outline-none ${errors.password ? 'border-[#ED3712] focus:ring-[#ED3712]' : 'focus:ring-[#6C25FF]'}`}
            />
            {errors.password && (
              <p className='mt-1 text-sm text-[#ED3712]'>{errors.password.message}</p>
            )}
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='companyName'
              className='z-10 -mb-2.5 ml-3 block w-min bg-[#F7F8F9] px-1 text-sm whitespace-nowrap text-[#6C25FF]'
            >
              Company name
            </label>
            <input
              {...register('companyName')}
              type='text'
              id='companyName'
              placeholder='Enter  company name'
              className='w-full rounded-md border border-[#CBCBCB] text-sm px-4 py-3 focus:border-transparent focus:ring-1 focus:outline-none focus:ring-[#6C25FF]'
            />
          </div>

          <div>
            <p className='text-sm text-[#1D2226] mb-3'>
              Are you an Agency?<span className='text-[#DD4A3D]'><span className='text-[#ED3712]'>*</span></span>
            </p>
            <div className='flex items-center space-x-6'>
              <label className='flex items-center cursor-pointer'>
                <input
                  type='radio'
                  checked={isAgency === true}
                  onChange={() => setValue('isAgency', true)}
                  className='w-5 h-5 text-[#6C25FF] border-gray-300 focus:ring-[#6C25FF]'
                />
                <span className='ml-2 text-[#1D2226]'>Yes</span>
              </label>
              <label className='flex items-center cursor-pointer'>
                <input
                  type='radio'
                  checked={isAgency === false}
                  onChange={() => setValue('isAgency', false)}
                  className='w-5 h-5 text-[#6C25FF] border-gray-300 focus:ring-[#6C25FF]'
                />
                <span className='ml-2 text-[#1D2226]'>No</span>
              </label>
            </div>
          </div>

          {error && (
            <div className="flex items-center text-[#B02105] text-sm space-x-1">
              <Info className='rotate-180 size-4' strokeWidth={3} /> <p className="">{error}</p>
            </div>
          )} 
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!allFieldsFilled}
          >
            Create Account
          </Button>
        </form>
        <div className='text-[#1D2226] mt-4 text-center text-sm'>
          Already have an account?{' '}
          <Link
            to='/signin'
            className='text-[#6C25FF] font-medium underline-offset-4 hover:underline active:underline'
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
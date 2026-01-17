import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useEffect } from 'react'
import Button from '../components/button'

export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      navigate('/profile')
    }
  }, [user, navigate])

  return (
    <div className="h-screen flex md:p-4">
      <div className="mx-auto h-full w-full flex flex-col justify-end md:max-w-93.75 md:border border-gray-200 bg-[#F7F8F9] px-5 py-8">
        <div className="text-start mb-7">
          <h1 className="mb-2.5 text-[28px] font-semibold text-[#1D2226]">
            Welcome to PopX
          </h1>
          <p className="text-[18px] leading-relaxed text-[#919191]">
            Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit,
          </p>
        </div>

        <div className="space-y-2.5">
          <Button onClick={() => navigate('/signup')}>
            Create Account
          </Button>

          <button
            onClick={() => navigate('/signin')}
            className="w-full bg-[#6C25FF4B] hover:bg-[#6C25FF4B]/90 cursor-pointer text-[#1D2226] font-medium py-3 px-4 rounded-md transition-colors"
          >
            Already Registered? Login
          </button>
        </div>
      </div>
    </div>
  )
}
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Button from '../components/button'
import { Camera } from 'lucide-react'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/signin')
  }

  if (!user) {
    return null
  }

  return (
    <div className="h-screen flex p-4">
      <div className="mx-auto h-full w-full max-w-93.75 border border-gray-200 bg-[#F7F8F9]">
        <div className="px-4 py-5 bg-white shadow-xs">
          <h1 className="text-lg text-[#1D2226]">
            Account Settings
          </h1>
        </div>

        <div className="px-5 py-7">
          <div className="flex items-start space-x-4 mb-6">
            <div className="relative">
              <div className="size-19 rounded-full flex items-center justify-center bg-gray-200 overflow-hidden">
                <h3 className='text-4xl font-semibold'>
                  {
                  user.fullName.charAt(0).toUpperCase()
                }
                </h3>
              </div>
              <button className="absolute bottom-1 cursor-pointer -right-1 text-white bg-[#6C25FF] hover:bg-[#6C25FF]/90 rounded-full border-2 border-white p-1">
                <Camera className='size-4' strokeWidth={3} />
              </button>
            </div>

            <div>
              <h2 className="font-semibold text-[#1D2226]">
                {user.fullName}
              </h2>
              <p className="text-[#1D2226]">{user.email}</p>
            </div>
          </div>

          <div>
            <p className="text-[#1D2226] text-sm leading-relaxed">
              Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
              Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam
              Erat, Sed Diam
            </p>
          </div>
        </div>

        <div className="px-5 py-6 border-t border-dashed border-gray-300">
          <Button onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
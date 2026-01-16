import { Loader2 } from 'lucide-react'

function Loader() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Loader2 className='animate-spin' />
    </div>
  )
}

export default Loader

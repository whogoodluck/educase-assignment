import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

import Loader from './loader'

export const PublicRoute = () => {
  const { user, loading } = useAuth()

  const isAuthenticated = !!user

  if (loading) return <Loader />

  return !isAuthenticated ? <Outlet /> : <Navigate to='/' replace />
}

export const ProtectedRoute = () => {
  const { user, loading } = useAuth()

  const isAuthenticated = !!user

  if (loading) return <Loader />

  return isAuthenticated ? <Outlet /> : <Navigate to='/signin' replace />
}

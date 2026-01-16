import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ProtectedRoute, PublicRoute } from './components/route-guard'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/home'
import Profile from './pages/profile'
import Signin from './pages/signin'
import Signup from './pages/signup'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<PublicRoute />}>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App

import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../../App'
import { Button } from '@mui/material'

interface HomePageProps {
  user?: User
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

const HomePage: React.FC<HomePageProps> = ({ user, setUser }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate('/login')
  }, [navigate, user])

  const handleLogout = useCallback(() => {
    setUser(undefined)
    navigate('/login')
  }, [navigate, setUser])

  if (!user) return null

  return (
    <main style={{ padding: '2rem', width: '100%' }}>
      <h1>Company</h1>
      <div style={{ display: 'flex', width: '50%', marginBottom: '1rem' }}>
        Welcome {user.firstName} {user.lastName}
      </div>
      <Button variant="contained" onClick={handleLogout}>
        Log out
      </Button>
    </main>
  )
}

export default HomePage

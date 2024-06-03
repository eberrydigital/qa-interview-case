import React, { useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User } from '../../App'
import { Form } from './Form'
import { Button } from '@mui/material'
import { clearDatabase } from '../../database'

interface LoginPageProps {
  user?: User
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

const LoginPage: React.FC<LoginPageProps> = ({ user, setUser }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/')
  }, [navigate, user])

  const handleClearDatabase = useCallback(() => {
    clearDatabase()
    setUser(undefined)
  }, [setUser])

  return (
    <main style={{ padding: '2rem', width: '100%' }}>
      <h1>Company</h1>
      <div style={{ display: 'flex', width: '50%' }}>
        <div style={{ width: '50%' }}>
          <h2>Login</h2>
          <Form setUser={setUser} />
        </div>
      </div>
      <br />
      Don't have an account? <Link to={`/signup`}>Signup</Link>
      <br />
      <br />
      <Button onClick={handleClearDatabase} variant="contained">
        Clear database
      </Button>
    </main>
  )
}

export default LoginPage

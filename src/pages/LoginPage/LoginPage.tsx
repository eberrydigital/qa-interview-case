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
    <main style={{ overflow: 'auto', height: '100%', width: '100%' }} id="login-page">
      <div className="login">
        <h1>Strawberry QA</h1>
        <h2>Login</h2>
        <Form setUser={setUser} />
        <br />
        Don't have an account? <Link to={`/signup`}>Signup</Link>
        <br />
        <br />
        <Button onClick={handleClearDatabase} variant="contained">
          Clear database
        </Button>
      </div>
      <div className="background">
        <h1>Welcome to the Strawberry QA Chapter website!</h1>
      </div>
    </main>
  )
}

export default LoginPage

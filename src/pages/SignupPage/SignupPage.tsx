import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User } from '../../App'
import { Form } from './Form'

interface SignupPageProps {
  user?: User
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

const SignupPage: React.FC<SignupPageProps> = ({ user, setUser }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/')
  }, [navigate, user])

  return (
    <main style={{ padding: '2rem', width: '100%' }}>
      <h1>Company</h1>
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ width: '100%', paddingRight: '2rem' }}>
          <h2>Signup</h2>
          <Form setUser={setUser} />
        </div>
        <div style={{ width: '100%' }}>
          <h2>You should join us because:</h2>
          <p>* We are a nice company</p>
          <p>* Free breakfast!</p>
        </div>
      </div>
      Already have an account? <Link to={`/login`}>Login</Link>
    </main>
  )
}

export default SignupPage

import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User } from '../../App'
import { Form } from './Form'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'

export type Language = 'EN' | 'SV'
interface SignupPageProps {
  user?: User
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

const SignupPage: React.FC<SignupPageProps> = ({ user, setUser }) => {
  const [language, setLanguage] = useState<Language>('EN')
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/')
  }, [navigate, user])

  const handleChange = useCallback((e: SelectChangeEvent<Language>) => {
    setLanguage(e.target.value as Language)
  }, [])

  return (
    <div style={{ padding: '2rem', width: '100%' }}>
      <main>
        <h1>Company</h1>
        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ width: '100%', paddingRight: '2rem' }}>
            <h2>Signup</h2>
            <Form setUser={setUser} language={language} />
          </div>
          <div style={{ width: '100%' }}>
            <h2>You should join us because:</h2>
            <p>* We are a nice company</p>
            <p>* Free breakfast!</p>
          </div>
        </div>
        Already have an account? <Link to={`/login`}>Login</Link>
      </main>
      <div style={{ marginTop: '5rem' }}>
        <p>Language:</p>
        <Select
          id="language-picker"
          value={language}
          label="Language"
          variant="standard"
          onChange={handleChange}
        >
          <MenuItem value={'SV'}>SV</MenuItem>
          <MenuItem value={'EN'}>EN</MenuItem>
        </Select>
      </div>
    </div>
  )
}

export default SignupPage

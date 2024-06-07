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

  const labels = getLocalizedLabels(language)

  return (
    <div style={{ padding: '2rem', width: '100%' }}>
      <main>
        <h1>Company</h1>
        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ width: '100%', paddingRight: '2rem' }}>
            <h2>{labels.title}</h2>
            <Form setUser={setUser} language={language} />
          </div>
          <div style={{ width: '100%' }}>
            <h2>{labels.aboutTitle}</h2>
            {labels.perks.map((perk) => (
              <p key={perk}>* {perk}</p>
            ))}
          </div>
        </div>
        {labels.login.text} <Link to={`/login`}>{labels.login.cta}</Link>
      </main>
      <div style={{ marginTop: '5rem' }}>
        <p>{labels.language}</p>
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

const getLocalizedLabels = (
  language: Language,
): {
  aboutTitle: string
  perks: string[]
  language: string
  login: { text: string; cta: string }
  title: string
} => {
  switch (language) {
    case 'EN':
      return {
        aboutTitle: 'You should just us because:',
        perks: ['We are a nice company', 'Free breakfast!'],
        language: 'Language',
        login: { text: 'Already have an account?', cta: 'Login' },
        title: 'Become a member',
      }
    case 'SV':
      return {
        aboutTitle: 'Du borde gå med oss för att:',
        perks: ['Vi är ett bra företag', 'Gratis frukost!'],
        language: 'Språk',
        login: { text: 'Har du redan ett konto?', cta: 'Logga in' },
        title: 'Bli medlem',
      }
  }
}

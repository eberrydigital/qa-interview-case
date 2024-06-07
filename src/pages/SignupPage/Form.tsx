import React, { useCallback, useState } from 'react'
import { TextField, Button } from '@mui/material'
import { validateSignupFields } from '../../utils/validations'
import { PasswordField } from '../../components/PasswordField'
import { User } from '../../App'
import { createUser } from '../../database'
import { Language } from './SignupPage'

const styleProps = {
  fullWidth: true,
  required: true,
  variant: 'filled',
} as const

interface FormProps {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
  language: Language
}

export const Form: React.FC<FormProps> = ({ setUser, language }) => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = useCallback(async () => {
    if (validateSignupFields(firstName, lastName, email, password)) {
      console.log('creating and setting user')
      await createUser({ firstName, lastName, email, password })
      setUser({ firstName, lastName, email, password })
    }
  }, [firstName, lastName, email, password, setUser])

  const labels = getLocalizedLabels(language)

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <TextField
        id="firstName"
        label={labels.firstName}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        {...styleProps}
      />
      <TextField
        id="lastName"
        label={labels.lastName}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        {...styleProps}
      />
      <TextField
        id="email"
        label={labels.email}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        {...styleProps}
      />
      <PasswordField
        id="password"
        label={labels.password}
        password={password}
        setPassword={setPassword}
        {...styleProps}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!validateSignupFields(firstName, lastName, email, password)}
      >
        {labels.submit}
      </Button>
    </form>
  )
}

const getLocalizedLabels = (
  language: Language,
): {
  firstName: string
  lastName: string
  email: string
  password: string
  submit: string
} => {
  switch (language) {
    case 'EN':
      return {
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email',
        password: 'Password',
        submit: 'Submit',
      }
    case 'SV':
      return {
        firstName: 'Förnamn',
        lastName: 'Efternamn',
        email: 'Email',
        password: 'Lösenord',
        submit: 'Skapa',
      }
  }
}

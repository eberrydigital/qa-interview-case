import React, { useCallback, useState } from 'react'
import { TextField, Button } from '@mui/material'
import { validateSignupFields } from '../../utils/validations'
import { PasswordField } from '../../components/PasswordField'
import { User } from '../../App'
import { createUser } from '../../database'

const styleProps = {
  fullWidth: true,
  required: true,
  variant: 'filled',
} as const

interface FormProps {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const Form: React.FC<FormProps> = ({ setUser }) => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = useCallback(() => {
    if (validateSignupFields(firstName, lastName, email, password)) {
      console.log('creating and setting user')
      createUser({ firstName, lastName, email, password })
      setUser({ firstName, lastName, email, password })
    }
  }, [firstName, lastName, email, password, setUser])

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
        label="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        {...styleProps}
      />
      <TextField
        id="lastName"
        label="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        {...styleProps}
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        {...styleProps}
      />
      <PasswordField
        id="password"
        password={password}
        setPassword={setPassword}
        {...styleProps}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!validateSignupFields(firstName, lastName, email, password)}
      >
        Submit
      </Button>
    </form>
  )
}

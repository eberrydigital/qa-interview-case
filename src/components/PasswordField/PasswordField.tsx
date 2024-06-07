import { VisibilityOff, Visibility } from '@mui/icons-material'
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from '@mui/material'
import React, { useState } from 'react'

interface PasswordFieldProps {
  id: string
  fullWidth: boolean
  required: boolean
  variant: 'filled'
  password: string | undefined
  setPassword: React.Dispatch<React.SetStateAction<string>>
  label: string
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  fullWidth,
  required,
  variant,
  password,
  setPassword,
  label,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormControl variant={variant}>
      <InputLabel htmlFor="password">{label}</InputLabel>
      <Input
        id={id}
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        fullWidth={fullWidth}
        required={required}
      />
    </FormControl>
  )
}

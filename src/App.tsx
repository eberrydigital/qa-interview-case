import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import SignupPage from './pages/SignupPage/SignupPage'
import HomePage from './pages/HomePage/HomePage'

export interface User {
  email: string
  password: string
  firstName: string
  lastName: string
}

function App() {
  const [user, setUser] = useState<User | undefined>()

  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage user={user} setUser={setUser} />,
    },
    {
      path: '/signup',
      element: <SignupPage user={user} setUser={setUser} />,
    },
    {
      path: '/',
      element: <HomePage user={user} setUser={setUser} />,
    },
  ])
  return <RouterProvider router={router} />
}

export default App

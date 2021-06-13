import React, { useContext } from 'react'
import Login from './Login'
import Register from './Register'
import { UserContext } from '../../utils/UseUserContext'
import { Redirect, useLocation } from 'react-router-dom'

function Auth() {
  const location = useLocation()
  const [user,] = useContext(UserContext)

  if (!user || !user.uid) {
    return <Login />
  }

  console.log(user, user.username)
  if (!user.username) {
    return <Register />
  }

  return (
    <Redirect to={{ pathname: location.state ? location.state.prevPath : '/' }} />
  )
}

export default Auth

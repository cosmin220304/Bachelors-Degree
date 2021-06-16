//inspired by:
//https://stackoverflow.com/questions/57660849/how-to-use-private-route-using-react-router
import React from 'react'
import { useContext } from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'
import { UserContext } from './UseUserContext'

export default function PrivateRoute({ component: Component, ...rest }) {
  const location = useLocation()
  const [user,] = useContext(UserContext)
  console.log("auth", user)

  return (
    <Route
      {...rest}
      render={(props) =>
        !user || !user.token
          ? <Redirect to={{ pathname: '/auth', state: { prevPath: location.pathname } }} />
          : <Component {...props} />
      }
    />
  )
}
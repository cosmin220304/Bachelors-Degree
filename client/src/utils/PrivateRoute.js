//inspired by:
//https://stackoverflow.com/questions/57660849/how-to-use-private-route-using-react-router
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'
import { UserContext } from './UseUserContext'
import { useHistory } from 'react-router-dom'

export default function PrivateRoute({ component: Component, ...rest }) {
  let location = useLocation()
  let history = useHistory();
  const [user, setUser] = useContext(UserContext)

  useEffect(() => {
    if (!user) {
      if (!JSON.parse(localStorage.getItem('user'))) return

      setUser(JSON.parse(localStorage.getItem('user')))
      history.push(Component.name.toLowerCase() || '/')
      return
    }
    localStorage.setItem('user', JSON.stringify(user))

  }, [user, history, Component, setUser])

  return (
    <Route
      {...rest}
      render={(props) =>
        user && user.id
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/login', state: { prevPath: location.pathname } }} />
      }
    />
  )
}
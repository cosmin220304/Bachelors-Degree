import React, { useEffect, useContext } from 'react'
import firebaseConfig from '../../utils/firebaseConfig'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import firebase from 'firebase'
import { UserContext } from '../../utils/UseUserContext'
import axios from 'axios'

function Login() {
  const [, setUser] = useContext(UserContext)

  useEffect(() => {
    !firebase.apps.length
      ? firebase.initializeApp(firebaseConfig)
      : firebase.app()

    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: async (authResult) => {
          const user = authResult.user
          try {
            const { data } = await axios.get(`/api/users/${user.uid}`)
            setUser({ ...data.user })
          } catch (err) {
            setUser({ phoneNumber: user.phoneNumber, uid: user.uid })
          }
          finally {
            return false
          }
        }
      },
      signInOptions: [
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          defaultCountry: 'RO',
        },
      ],
    }
    var ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', uiConfig)
  }, [setUser])

  return (
    <div id='firebaseui-auth-container' className='md: mt-4' />
  )
}

export default Login

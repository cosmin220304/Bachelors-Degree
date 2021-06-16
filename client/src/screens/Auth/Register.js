import React, { useState, useContext } from 'react'
import { UserContext } from '../../utils/UseUserContext'
import { useFormik } from 'formik'
import InputField from './components/InputField'
import axios from 'axios'

function Register() {
  const [error, setError] = useState({ username: false, email: false })
  const [user, setUser] = useContext(UserContext)

  const formik = useFormik({
    initialValues: {
      username: '',
      email: ''
    },
    onSubmit: async (values) => {
      let newErrors = { username: false, email: false }
      let hasErrors = false

      if (values.username === '') {
        newErrors.username = true
        hasErrors = true
      }

      if (values.email === '') {
        newErrors.email = true
        hasErrors = true
      }

      setError(newErrors)
      if (hasErrors) return

      try {
        const { data } = await axios.post(`/api/users`, {
          phoneNumber: user.phoneNumber,
          uid: user.uid,
          username: values.username,
          email: values.email,
        })
        setUser({ ...data })
      } catch (err) {
        alert('username or email already taken!')
        setError({ username: true, email: true })
      }
    },
  })

  return (
    <div className='h-3/6 grid place-items-center gap-4 md:shadow-lg md:w-6/12 md:m-auto md:mt-8'>

      <div className='text-lg font-bold mt-4 text-center'>
        Wait, you are new here...
        <br />
        Create an account!
      </div>

      <form onSubmit={formik.handleSubmit} className='grid place-items-center gap-2'>
        <InputField error={error.username} name={'username'} changeHandler={formik.handleChange} />
        <InputField error={error.email} name={'email'} changeHandler={formik.handleChange} />
        <button className='bg-red-500 font-bold mt-4 p-2 w-32 rounded' type='submit' >Done</button>
      </form>

    </div>
  )
}

export default Register
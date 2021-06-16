import React, { useState, useEffect } from 'react'
const UserContext = React.createContext()

const UserContextWrapper = ({ children }) => {

  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)

  useEffect(() => {
    if (!user) return
    localStorage.setItem('user', JSON.stringify(user))
  }, [user]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContextWrapper, UserContext }
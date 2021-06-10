import React, { useState } from 'react'

const UserContext = React.createContext()

const UserContextWrapper = ({ children }) => {
  const [user, setUser] = useState()

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContextWrapper, UserContext }
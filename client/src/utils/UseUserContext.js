import React, { useState, useEffect } from 'react'
import { useCookies } from "react-cookie"

const UserContext = React.createContext()

const UserContextWrapper = ({ children }) => {
  const [cookies, setCookie] = useCookies(["user"]);
  const [user, setUser] = useState(cookies.user);

  useEffect(() => {
    setCookie("user", user);
  }, [user]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContextWrapper, UserContext }
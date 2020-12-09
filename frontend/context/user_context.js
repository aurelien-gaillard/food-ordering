import React, { useContext, useEffect, useState } from 'react'
import Cookie from 'js-cookie'

const UserContext = React.createContext({ isAuthenticated: false })

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    // grab token value from cookie
    const token = Cookie.get('token')

    if (token) {
      // authenticate the token on the server and place set user object
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          Cookie.remove('token')
          setUser(null)
          return null
        }
        const user = await res.json()
        setUser(user)
      })
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

// creation of the customs hook to be used in the components
export const useUserContext = () => {
  return useContext(UserContext)
}

export { UserContext, UserProvider }

// Dont forget to wrap the App with the Provider
// <AppProvider>
//   <App />
// </AppProvider>

import React, { useEffect, useState } from 'react'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cookie from 'js-cookie'
import Layout from '../components/Layout'
import UserContext from '../context/user_context'

function MyApp({ Component, pageProps }) {
  const [user, SetUser] = useState(null)
  useEffect(() => {
    // grab token value from cookie
    const token = Cookie.get('token')

    if (token) {
      // authenticate the token on the server and place set user object
      fetch(`${process.env.NEXT_PUBLIC_API_URL}users/me`, {
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
    <UserContext.Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  )
}

export default MyApp

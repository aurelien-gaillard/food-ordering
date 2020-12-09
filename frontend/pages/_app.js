import React from 'react'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from '../components/Layout'
import { UserProvider } from '../context/user_context'
import { CartProvider } from '../context/cart_context'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </UserProvider>
  )
}

export default MyApp

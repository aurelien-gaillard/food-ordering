import React from 'react'

import { Row, Col } from 'reactstrap'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import InjectedCheckoutForm from '../components/checkout/CheckoutForm'

import Cart from '../components/Cart'
import { useUserContext } from '../context/user_context'

function Checkout() {
  // isAuthenticated is passed to the cart component to display order button
  const { isAuthenticated } = useUserContext

  // load stripe to inject into elements components
  const stripePromise = loadStripe('YOUR STRIPE PUBLIC (pk_) KEY')

  return (
    <Row>
      <Col style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
        <h1 style={{ margin: 20 }}>Checkout</h1>
        <Cart isAuthenticated={isAuthenticated} />
      </Col>
      <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
        <Elements stripe={stripePromise}>
          <InjectedCheckoutForm />
        </Elements>
      </Col>
    </Row>
  )
  // }
}
export default Checkout

import React, { useContext, useEffect, useState } from 'react'
import Cookie from 'js-cookie'

const CartContext = React.createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 })
  console.log(cart)

  const addItem = (item) => {
    let { items } = cart
    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i) => i.id === item.id)
    // if item is not new, add to cart, set quantity to 1
    if (!newItem) {
      //set quantity property to 1
      item.quantity = 1
      setCart({
        items: [...items, item],
        total: cart.total + item.price,
      })
    } else {
      setCart({
        items: cart.items.map((item) =>
          item.id === newItem.id
            ? Object.assign({}, item, { quantity: item.quantity + 1 })
            : item
        ),
        total: cart.total + item.price,
      })
    }
  }

  const removeItem = (item) => {
    let { items } = cart
    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i) => i.id === item.id)
    if (newItem.quantity > 1) {
      setCart({
        items: cart.items.map((item) =>
          item.id === newItem.id
            ? Object.assign({}, item, { quantity: item.quantity - 1 })
            : item
        ),
        total: cart.total - item.price,
      })
    } else {
      const items = [...cart.items]
      const index = items.findIndex((i) => i.id === newItem.id)

      items.splice(index, 1)

      setCart({ items: items, total: cart.total - item.price })
    }
  }

  useEffect(() => {
    const cart = Cookie.get('cart')
    //if items in cart, set items and total from cookie
    console.log(cart)
    if (typeof cart === 'string' && cart !== 'undefined') {
      console.log('foyd')
      let totalValue = 0
      JSON.parse(cart).forEach((item) => {
        totalValue += item.price * item.quantity
      })

      setCart({ items: JSON.parse(cart), total: totalValue })
    }
  }, [])

  useEffect(() => {
    Cookie.set('cart', cart.items)
  }, [cart])

  return (
    <CartContext.Provider
      value={{
        cart,
        removeItem,
        addItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// creation of the customs hook to be used in the components
export const useCartContext = () => {
  return useContext(CartContext)
}

export { CartContext, CartProvider }

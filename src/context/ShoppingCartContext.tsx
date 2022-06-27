import { createContext, ReactNode, useContext, useState } from "react";

type ShoppingCartProviderProps = {
  children: ReactNode
}
type ShoppingCartItems = {
  getQty: (id: number) => number,
  increaseQty: (id: number) => void,
  decreaseQty: (id: number) => void,
  removeFromCart: (id: number) => void
}
type CartItem = {
  id: number,
  quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartItems)

export function ShoppingCart() {
  return useContext(ShoppingCartContext)
}


export function ShoppingCartProvider({children}: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  function getQty(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }
  function increaseQty(id: number) {
    setCartItems(currItem => {
      if (currItem.find(item =>item.id === id) == null) {
        return [...currItem, {id, quantity: 1}]
      } else {
        return currItem.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity + 1}
          } else return item
        })
      }
    })
  }
  function decreaseQty(id: number) {
    setCartItems(currItem => {
      if (currItem.find(item =>item.id === id)?.quantity == 1) {
        return currItem.filter(item => item.id !== id)
      } else {
        return currItem.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity - 1}
          } else return item
        })
      }
    })
  }
  function removeFromCart(id: number) {
    return setCartItems(currItem => {
      return currItem.filter(item => item.id !== id)
    })
  }
  return (
    <ShoppingCartContext.Provider value={{ getQty, increaseQty, decreaseQty, removeFromCart }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
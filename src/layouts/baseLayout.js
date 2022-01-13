import React, { useContext, useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Nav from "../components/Nav"
import { titleIfy, slugify, calculateTotal } from "../../utils/helpers"

const STORAGE_KEY = "supersecretkey"

export const initialState = {
  cart: [],
  numberOfItemsInCart: 0,
  total: 0,
}

const addToCart = item => {
  const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
  let { cart } = storageState

  cart.push(item)

window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      cart,
      numberOfItemsInCart: cart.length,
      total: calculateTotal(cart),
    })
  )
}

const removeFromCart = item => {
  const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
  let { cart } = storageState

  const index = cart.map(e => e.id).indexOf(item.id)

  if (index > -1) {
    cart.splice(index, 1)
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      cart,
      numberOfItemsInCart: cart.length,
      total: calculateTotal(cart),
    })
  )
}

const clearCart = () => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
}

export const SiteContext = React.createContext({
  initialState,
  addToCart,
  removeFromCart,
  clearCart,
})

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      navInfo {
        data
      }
    }
  `)

  let {
    navInfo: { data: links },
  } = data

  links = links.map(link => {
    const newLink = {}
    newLink.link = slugify(link)
    newLink.name = titleIfy(link)
    return newLink
  })

  const [context, setContext] = useState(initialState)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storageState = window.localStorage.getItem(STORAGE_KEY)
      const storedContext = JSON.parse(storageState)
      if (!storageState) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
      } else {
        setContext({
          ...context,
          cart: storedContext.cart,
          numberOfItemsInCart: storedContext.cart.length,
          total: calculateTotal(storedContext.cart),
        })
      }
    }
  }, [])

  return (
    <SiteContext.Provider
      value={{ context, setContext, addToCart, removeFromCart, clearCart }}
    >
      <div className="min-h-screen">
        <Nav links={links} />
        <div className="mobile:px-10 px-4 pb-10 flex justify-center">
          <main className="w-fw">{children}</main>
        </div>
        <footer className="flex justify-center">
          <div className="flex w-fw px-8 desktop:px-0 border-solid border-t border-gray-300 items-center">
            <span className="block text-gray-700 pt-4 pb-8 mt-2 text-xs">
              Copyright © 2021 All rights reserved.
            </span>
          </div>
        </footer>
      </div>
    </SiteContext.Provider>
  )
}

export default Layout

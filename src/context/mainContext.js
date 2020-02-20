import React from "react"
import { StaticQuery, graphql } from "gatsby"

const mainQuery = graphql`
  query {
    navInfo {
      data
    }
  }
`

const STORAGE_KEY = "STRIJK"

const initialState = {
  cart: [],
  count: {},
  numberOfItemsInCart: 0,
  total: 0,
}

const SiteContext = React.createContext()

function calculateTotal(cart) {
  const total = cart.reduce((acc, next) => {
    acc = acc + JSON.parse(next.price)
    return acc
  }, 0)
  return total
}

function compressArray(array) {
  const count = {}
  array.forEach(item => {
    count[item.id] = (count[item.id] || 0) + 1
  })

  return count
}

class ContextProviderComponent extends React.Component {
  componentDidMount() {
    if (typeof window !== "undefined") {
      const storageState = window.localStorage.getItem(STORAGE_KEY)
      if (!storageState) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
      }
    }
  }
  addToCart = item => {
    const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    let { cart, count } = storageState

    cart.push(item)
    count = compressArray(cart)

    console.log("count here 1: ", count)

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        cart,
        count,
        numberOfItemsInCart: cart.length,
        total: calculateTotal(cart),
      })
    )
    this.forceUpdate()
  }

  removeFromCart = item => {
    const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    let { cart, count } = storageState
    cart = cart.filter(c => c.id !== item.id)

    count = compressArray(cart)

    console.log("count here 2: ", count)

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        cart,
        count,
        numberOfItemsInCart: cart.length,
        total: calculateTotal(cart),
      })
    )
    this.forceUpdate()
  }

  clearCart = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
    this.forceUpdate()
  }

  render() {
    let state = initialState
    if (typeof window !== "undefined") {
      const storageState = window.localStorage.getItem(STORAGE_KEY)
      if (storageState) {
        state = JSON.parse(storageState)
      }
    }

    return (
      <StaticQuery query={mainQuery}>
        {queryData => {
          return (
            <SiteContext.Provider
              value={{
                ...state,
                navItems: queryData,
                addToCart: this.addToCart,
                clearCart: this.clearCart,
                removeFromCart: this.removeFromCart,
              }}
            >
              {this.props.children}
            </SiteContext.Provider>
          )
        }}
      </StaticQuery>
    )
  }
}

export { SiteContext, ContextProviderComponent }

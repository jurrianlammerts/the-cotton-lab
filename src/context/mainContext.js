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
    this.forceUpdate()
  }

  removeFromCart = item => {
    const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    let { cart } = storageState

    const index = cart.map(e => e.id).indexOf(item.id)

    if (index > -1) {
      const item = cart.splice(index, 1)
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        cart,
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

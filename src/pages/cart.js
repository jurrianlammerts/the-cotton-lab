import React from "react"

import { SiteContext, ContextProviderComponent } from "../context/mainContext"
import { DENOMINATION } from "../../providers/inventoryProvider"
import { FaTimes, FaLongArrowAltRight } from "react-icons/fa"
import { Link } from "gatsby"
import SEO from "../components/seo"
import CartLink from "../components/CartLink"
import { slugify } from "../../utils/helpers"
import Image from "../components/Image"

function removeDuplicates(myArr) {
  return Array.from(new Set(myArr.map(JSON.stringify))).map(JSON.parse)
}

const Cart = ({ context }) => {
  const { numberOfItemsInCart, cart, removeFromCart, total } = context
  const cartEmpty = numberOfItemsInCart === Number(0)
  const counter = {}

  // Counts all the products
  !cartEmpty &&
    cart.forEach(obj => {
      counter[obj.id] = (counter[obj.id] || 0) + 1
    })

  // Removes all duplicates from cart
  const uniqueCart = removeDuplicates(cart)

  // Adds the quantity to the product
  uniqueCart.forEach(obj => {
    for (let [key, value] of Object.entries(counter)) {
      if (key === obj.id) obj.quantity = value
    }
  })

  return (
    <>
      <CartLink />
      <SEO title="Cart" />
      <div className="flex flex-col items-center pb-10">
        <div
          className="
          flex flex-col w-full
          c_large:w-c_large
        "
        >
          <div className="pt-10 pb-8">
            <h1 className="text-5xl font-light">Your Cart</h1>
          </div>

          {cartEmpty ? (
            <h3>No items in cart.</h3>
          ) : (
            <div className="flex flex-col">
              {uniqueCart.map((item, index) => {
                return (
                  <div className="border-b py-10" key={`${item.id + index}`}>
                    <div className="flex items-center">
                      <Link to={slugify(item.name)}>
                        <Image
                          className="w-32 m-0"
                          src={item.image}
                          alt={item.name}
                        />
                      </Link>
                      <Link to={slugify(item.name)}>
                        <p className="m-0 pl-10 text-gray-600 text-sm">
                          {item.name}
                        </p>
                      </Link>
                      <div className="flex flex-1 justify-end">
                        <p className="m-0 pl-10 text-gray-900 tracking-tighter font-semibold">
                          {`${item.quantity}  x  ${DENOMINATION + item.price}`}
                        </p>
                      </div>
                      <div
                        role="button"
                        onClick={() => removeFromCart(item)}
                        className="m-0 ml-10 text-gray-900 text-s cursor-pointer"
                      >
                        <FaTimes />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          <div className="flex flex-1 justify-end py-8">
            <p className="text-sm pr-10">Total</p>
            <p className="font-semibold tracking-tighter">
              {DENOMINATION + total}
            </p>
          </div>
          {!cartEmpty && (
            <Link to="/checkout" className="flex flex-1 justify-end">
              <div className="cursor-pointer flex">
                <p className="text-gray-600 text-sm mr-2">
                  Proceed to check out
                </p>
                <FaLongArrowAltRight className="text-gray-600 mt-1" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

function CartWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {context => <Cart {...props} context={context} />}
      </SiteContext.Consumer>
    </ContextProviderComponent>
  )
}

export default CartWithContext

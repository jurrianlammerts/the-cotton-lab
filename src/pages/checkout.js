import React, { useState, useContext } from "react"
import { Link } from "gatsby"
import { FaLongArrowAltLeft } from "react-icons/fa"
import uuid from "uuid/v4"

import { SiteContext } from "../layouts/baseLayout"
import { DENOMINATION } from "../../providers/inventoryProvider"
import { removeDuplicates } from "../../utils/helpers"
import Image from "../components/Image"

import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_DvXwcKnVaaZUpWJIbh9cjgZr00IjIAjZAA")

function CheckoutWithContext(props) {
  const { context } = useContext(SiteContext)
  const { total, clearCart, numberOfItemsInCart } = context
  return (
    <Elements stripe={stripePromise}>
      <Checkout
        {...props}
        total={total}
        clearCart={clearCart}
        numberOfItemsInCar={numberOfItemsInCart}
      />
    </Elements>
  )
}

const calculateShipping = () => {
  return 0
}

const Input = ({ onChange, value, name, placeholder }) => (
  <input
    onChange={onChange}
    value={value}
    className="mt-2 text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    type="text"
    placeholder={placeholder}
    name={name}
  />
)

const Checkout = ({ numberOfItemsInCart, cart = [], total, clearCart }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [input, setInput] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    postal_code: "",
    state: "",
  })

  const stripe = useStripe()
  const elements = useElements()

  const onChange = (e) => {
    setErrorMessage(null)
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { name, email, street, city, postal_code, state } = input

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    // Validate input
    if (!street || !city || !postal_code || !state) {
      setErrorMessage("Please fill in the form!")
      return
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement)

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: { name: name },
    })

    if (error) {
      setErrorMessage(error.message)
      return
    }

    const order = {
      email,
      amount: total,
      address: state, // should this be {street, city, postal_code, state} ?
      payment_method_id: paymentMethod.id,
      receipt_email: "customer@example.com",
      id: uuid(),
    }

    // TODO call API
    setOrderCompleted(true)
    clearCart()
  }

  const cartEmpty = numberOfItemsInCart === Number(0)

  if (orderCompleted) {
    return (
      <div>
        <h3>Thanks! Your order has been successfully processed.</h3>
      </div>
    )
  }

  const counter = {}

  // Counts all the products
  !cartEmpty &&
    cart?.forEach((obj) => {
      counter[obj.id] = (counter[obj.id] || 0) + 1
    })

  // Removes all duplicates from cart
  const uniqueCart = removeDuplicates(cart)

  // Adds the quantity to the product
  uniqueCart.forEach((obj) => {
    for (let [key, value] of Object.entries(counter)) {
      if (key === obj.id) obj.quantity = value
    }
  })

  return (
    <div className="flex flex-col items-center pb-10">
      <div
        className="
            flex flex-col w-full
            c_large:w-c_large
          "
      >
        <div className="pt-10 pb-8">
          <h1 className="text-5xl font-light">Checkout</h1>
          <Link to="/cart">
            <div className="cursor-pointer flex">
              <FaLongArrowAltLeft className="mr-2 text-gray-600 mt-1" />
              <p className="text-gray-600 text-sm">Edit Cart</p>
            </div>
          </Link>
        </div>

        {cartEmpty ? (
          <h3>No items in cart.</h3>
        ) : (
          <div className="flex flex-col">
            <div className="">
              {uniqueCart.map((item, index) => {
                return (
                  <div className="border-b py-10" key={`${item.id + index}`}>
                    <div className="flex items-center">
                      <Image
                        className="w-32 m-0"
                        src={item.image[0].url}
                        alt={item.name}
                      />
                      <p className="m-0 pl-10 text-gray-600 text-sm">
                        {item.name}
                      </p>
                      <div className="flex flex-1 justify-end">
                        <p className="m-0 pl-10 text-gray-900 tracking-tighter font-semibold">
                          {`${item.quantity}  x  ${DENOMINATION + item.price}`}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-1 flex-col md:flex-row">
              <div className="flex flex-1 pt-8 flex-col">
                <div className="mt-4 border-t pt-10">
                  <form onSubmit={handleSubmit}>
                    {errorMessage ? <span>{errorMessage}</span> : ""}
                    <Input
                      onChange={onChange}
                      value={input.name}
                      name="name"
                      placeholder="Cardholder name"
                    />
                    <CardElement className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    <Input
                      onChange={onChange}
                      value={input.email}
                      name="email"
                      placeholder="Email"
                    />
                    <Input
                      onChange={onChange}
                      value={input.street}
                      name="street"
                      placeholder="Street"
                    />
                    <Input
                      onChange={onChange}
                      value={input.city}
                      name="city"
                      placeholder="City"
                    />
                    <Input
                      onChange={onChange}
                      value={input.state}
                      name="state"
                      placeholder="State"
                    />
                    <Input
                      onChange={onChange}
                      value={input.postal_code}
                      name="postal_code"
                      placeholder="Postal Code"
                    />
                    <button
                      type="submit"
                      disabled={!stripe}
                      onClick={handleSubmit}
                      className="hidden md:block bg-secondary hover:bg-black text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Confirm order
                    </button>
                  </form>
                </div>
              </div>
              <div className="md:pt-20">
                <div className="ml-4 pl-2 flex flex-1 justify-end pt-2 md:pt-8 pr-4">
                  <p className="text-sm pr-10">Subtotal</p>
                  <p className="tracking-tighter w-38 flex justify-end">
                    {DENOMINATION + total}
                  </p>
                </div>
                <div className="ml-4 pl-2 flex flex-1 justify-end pr-4">
                  <p className="text-sm pr-10">Shipping</p>
                  <p className="tracking-tighter w-38 flex justify-end">
                    FREE SHIPPING
                  </p>
                </div>
                <div className="md:ml-4 pl-2 flex flex-1 justify-end bg-gray-200 pr-4 pt-6">
                  <p className="text-sm pr-10">Total</p>
                  <p className="font-semibold tracking-tighter w-38 flex justify-end">
                    {DENOMINATION + (total + calculateShipping())}
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={!stripe}
                  onClick={handleSubmit}
                  className="md:hidden bg-secondary hover:bg-black text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Confirm order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckoutWithContext

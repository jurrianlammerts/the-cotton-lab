import React, { useContext } from "react"
import { SiteContext } from "../layouts/baseLayout"
import { FaShoppingCart } from "react-icons/fa"
import { Link } from "gatsby"
import Circle from "./icons/CircleIcon"

const CartLink = () => {
  const { context } = useContext(SiteContext)
  const { numberOfItemsInCart } = context
  return (
    <div className="hidden sm:flex flex-1 justify-end relative pt-2">
      <Link to="/cart">
        <FaShoppingCart size="24" />
        {/* {numberOfItemsInCart > Number(0) && (
          <div className="card-bubble">
            <Circle text={numberOfItemsInCart} />
          </div>
        )} */}
      </Link>
    </div>
  )
}

export default CartLink

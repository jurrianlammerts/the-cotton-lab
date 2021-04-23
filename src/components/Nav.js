import React, { useState } from "react"
import { Spiral as Hamburger } from "hamburger-react"
import { Link } from "gatsby"
import Logo from "./Logo"
import CartLink from "./CartLink"
import { colors } from "../theme"

const Nav = ({ links }) => {
  const [isOpen, setOpen] = useState(false)

  const toggleMenu = () => {
    setOpen(!isOpen)
  }
  return (
    <nav className="max-w-fw mx-auto">
      <div className="flex align-center justify-between sm:justify-start w-full mobile:px-10 desktop:px-0 px-4 py-6">
        <Link to="/">
          <Logo />
        </Link>
        <div className="hidden sm:flex flex-row mt-2">
          {links.map((l, i) => (
            <Link
              to={`/${l.link}`}
              key={i}
              className="ml-4"
              activeStyle={{ color: colors.secondary }}
            >
              <p
                key={i}
                className="text-left m-0 text-smaller pr-4 font-semibold sm:pl-2"
              >
                {l.name}
              </p>
            </Link>
          ))}
        </div>
        <CartLink />
        <div className="block sm:hidden">
          <Hamburger toggled={isOpen} toggle={setOpen} size={24} />
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col">
          {links.map((l, i) => (
            <Link
              to={`/${l.link}`}
              key={i}
              className="ml-4"
              activeStyle={{ color: colors.secondary }}
            >
              <p className="text-left m-0 text-smaller pr-4 font-semibold sm:pl-2">
                {l.name}
              </p>
            </Link>
          ))}
          <Link
            key="123"
            to="/cart"
            activeStyle={{ color: colors.secondary }}
            className="ml-4"
          >
            <p className="text-left m-0 text-smaller pr-4 font-semibold sm:pl-2">
              Cart
            </p>
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Nav

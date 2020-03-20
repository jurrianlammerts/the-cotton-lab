/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { Link } from "gatsby"
import { SiteContext, ContextProviderComponent } from "../context/mainContext"
import { titleIfy, slugify } from "../../utils/helpers"
import { colors } from "../theme"

const logo = require("../images/logo.svg")

const activeStyle = {
  color: "#00baa6",
}

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <ContextProviderComponent>
        <SiteContext.Consumer>
          {context => {
            let {
              navItems: {
                navInfo: { data: links },
              },
            } = context

            links = links.map(link => {
              const newLink = {}
              newLink.link = slugify(link)
              newLink.name = titleIfy(link)
              return newLink
            })

            return (
              <div className="min-h-screen">
                <nav>
                  <div className="flex justify-center">
                    <div
                      className="
                    w-fw
                    mobile:px-10 desktop:px-0 px-4 pt-4 pb-6
                    flex  
                    sm:flex-row"
                    >
                      <Link to="/">
                        <img className="w-6" alt="Logo" src={logo} />
                      </Link>
                      <div className="flex flex-wrap mt-3">
                        {links.map((l, i) => (
                          <Link
                            to={l.link}
                            key={i}
                            className="ml-4"
                            activeStyle={activeStyle}
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
                    </div>
                  </div>
                </nav>
                <div className="mobile:px-10 px-4 pb-10 flex justify-center">
                  <main className="w-fw">{children}</main>
                </div>
                <footer className="flex justify-center">
                  <div className="flex w-fw px-8 desktop:px-0 border-solid border-t border-gray-300 items-center">
                    <span className="block text-gray-700 pt-4 pb-8 mt-2 text-xs">
                      Copyright © 2020 All rights reserved.
                    </span>
                    {/* <div className="flex flex-1 justify-end">
                      <Link to="/admin">
                        <p className="pt-4 text-xs">Admin</p>
                      </Link>
                    </div> */}
                  </div>
                </footer>
              </div>
            )
          }}
        </SiteContext.Consumer>
      </ContextProviderComponent>
    )
  }
}

export default Layout

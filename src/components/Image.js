import React from "react"

const Image = ({ src, ...props }) => {
  return src ? (
    <img src={`${process.env.GATSBY_API_URL}${src}`} {...props} />
  ) : null
}

export default Image

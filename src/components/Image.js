import React from "react"

const Image = ({ src, ...props }) => {
  return src ? <img src={src} {...props} /> : null
}

export default Image

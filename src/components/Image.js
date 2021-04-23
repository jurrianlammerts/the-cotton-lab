import React from "react"

const Image = ({ src, ...props }) => {
  return src ? <img src={src} {...props} alt="image" /> : null
}

export default Image

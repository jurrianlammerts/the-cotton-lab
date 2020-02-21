import React, { useState, useEffect } from "react"

async function fetchImage(src, updateSrc) {
  updateSrc(src)
}

const Image = ({ src, ...props }) => {
  const [imageSrc, updateSrc] = useState(null)
  useEffect(() => {
    fetchImage(src, updateSrc)
  }, [])

  return imageSrc ? <img src={imageSrc} {...props} /> : null
}

export default Image

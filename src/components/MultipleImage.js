import React, { useState } from "react"

const MultipleImage = ({ src, ...props }) => {
  const [imageSrc, setImageSrc] = useState(src[0].url)

  if (src && src.length > 1) {
    return (
      <img
        src={imageSrc}
        {...props}
        onMouseEnter={() => {
          setImageSrc(src[1].url)
        }}
        onMouseOut={() => {
          setImageSrc(src[0].url)
        }}
      />
    )
  } else return null
}

export default MultipleImage

import React from "react"
import Image from "../Image"

const Showcase = ({ imageSrc }) => {
  return (
    <div className="z-10">
      <Image
        src={imageSrc[0].url}
        className="w-136 mb-12"
        alt="Showcase item"
      />
    </div>
  )
}

export default Showcase

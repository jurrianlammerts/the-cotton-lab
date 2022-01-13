import React from "react"
import { Link } from "gatsby"
import Image from "../Image"

const DisplayMedium = ({ imageSrc, title, subtitle, link }) => {
  let src
  if (imageSrc instanceof Array) src = imageSrc[0].url
  else src = imageSrc.url
  return (
    <div className="mb-4 lg:mb-0 bg-light p-8 pb-0 hover:bg-light-200">
      <Link to={`/${link}`}>
        <div className="item-card flex flex-column justify-center items-center h-56">
          <Image src={src} alt={title} className="w-3/5 lg:w-2/5" />
        </div>
        <div className="">
          <p className="text-3xl font-semibold mb-1">{title}</p>
          <p className="text-xs text-gray-700">{subtitle}</p>
        </div>
      </Link>
    </div>
  )
}

export default DisplayMedium

import React from "react"
import { Link } from "gatsby"
import { getTrimmedString } from "../../../utils/helpers"
import Image from "../Image"

const DisplaySmall = ({ link, title, subtitle, imageSrc }) => (
  <div className="bg-light px-6 pt-10 pb-2 lg:p-6 lg:pb-0 hover:bg-light-200 lg:mb-0 mb-4">
    <Link to={`/${link}`}>
      <div className="item-card flex flex-column justify-center items-center h-32">
        <Image alt={title} src={imageSrc[0].url} className="w-2/5 md:w-3/5" />
      </div>
      <div className="relative">
        <p className="text-xl font-semibold mb-1">{title}</p>
        <p className="text-xs text-gray-700 mb-4">
          {getTrimmedString(subtitle, 150)}
        </p>
      </div>
    </Link>
  </div>
)

export default DisplaySmall

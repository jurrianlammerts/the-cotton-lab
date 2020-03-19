import React, { useState } from "react"
import Image from "../components/Image"

const Slider = ({ images }) => {
  const [index, setIndex] = useState(0)

  //Minus 1 for array offset from 0
  const length = images.length - 1

  const handleNext = () =>
    index === length ? setIndex(0) : setIndex(index + 1)

  const handlePrevious = () =>
    index === 0 ? setIndex(length) : setIndex(index - 1)

  console.log(images)

  return (
    <div
      className="w-full md:w-1/2 h-112 flex flex-1 bg-light hover:bg-light-200 slider"
      onClick={() => handlePrevious()}
      style={{ cursor: "pointer" }}
    >
      <div className="py-16 p10 flex flex-1 justify-center items-center">
        <Image
          src={images[index].url}
          className="max-w-lg m-0 max-h-96 w-64 noselect"
          key={index.toString()}
          alt="Inventory item"
        />
      </div>
    </div>
  )
}

export default Slider

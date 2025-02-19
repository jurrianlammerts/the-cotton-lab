import React, { useContext } from "react"
import { SiteContext } from "../layouts/baseLayout"
import Button from "../components/Button"
import SEO from "../components/seo"
import Image from "../components/Image"
import Slider from "../components/Slider"

const ItemView = ({ pageContext }) => {
  const { addToCart } = useContext(SiteContext)

  const item = pageContext.content
  const { price, image, name, description } = item

  function addItemToCart(item) {
    addToCart(item)
  }

  return (
    <>
      <SEO title={name} description={description} />
      <div className="py-6 flex flex-1 flex-col md:flex-row w-full my-0 mx-auto">
        {image.length <= 1 ? (
          <div className="w-full md:w-1/2 h-112 flex flex-1 bg-light hover:bg-light-200">
            <div className="py-16 p10 flex flex-1 justify-center items-center">
              <Image
                src={image[0].url}
                className="max-w-lg m-0 max-h-96 w-64"
                alt="Inventory item"
              />
            </div>
          </div>
        ) : (
          <Slider images={image} />
        )}
        <div className="pt-2 px-0 md:px-10 pb-8 w-full md:w-1/2">
          <h1 className="text-5xl font-light noselect">{name}</h1>
          <h2 className="text-2xl tracking-tighter">€{price}</h2>
          <p className="text-gray-600 text-sm">{description}</p>
          <Button
            full
            title="Add to Cart"
            onClick={() => addItemToCart(item)}
          />
        </div>
      </div>
    </>
  )
}

export default ItemView

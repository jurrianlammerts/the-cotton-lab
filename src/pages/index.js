import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import {
  Center,
  Footer,
  Tag,
  Showcase,
  DisplaySmall,
  DisplayMedium,
} from "../components"
import { titleIfy, slugify } from "../../utils/helpers"

const Home = ({ data: gqlData }) => {
  const { categories, products } = gqlData

  const inventory = products.nodes.slice(Math.max(products.nodes.length - 4, 0))

  const topProduct = products.nodes.filter((item) => item.onTop)

  return (
    <>
      <></>
      <SEO title="Exclusive streetwear" />
      <div className="w-full">
        <div className="bg-green-200 lg:h-hero p-6 pb-10 smpb-6 flex lg:flex-row flex-col">
          <div className="pt-4 pl-2 sm:pt-12 sm:pl-12 flex flex-col">
            <Tag year="2021" category="SNEAKERS" />
            <Center
              price="1250"
              title={topProduct[0].name}
              link={slugify(topProduct[0].name)}
            />
            <Footer designer={topProduct[0].brand} />
          </div>
          <div className="flex flex-1 justify-center items-center relative">
            <Showcase imageSrc={topProduct[0].image} />
            <div className="absolute w-48 h-48 sm:w-72 sm:h-72 xl:w-88 xl:h-88 bg-white z-0 rounded-full" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 my-4">
        <DisplayMedium
          imageSrc={categories.nodes[1].products[0].image}
          subtitle={`${categories.nodes[1].products.length} items`}
          title={titleIfy(categories.nodes[1].name)}
          link={slugify(categories.nodes[1].name)}
        />
        <DisplayMedium
          imageSrc={
            categories.nodes[categories.nodes.length - 1].products[0].image
          }
          subtitle={`${
            categories.nodes[categories.nodes.length - 1].products.length
          } items`}
          title={titleIfy(categories.nodes[categories.nodes.length - 1].name)}
          link={slugify(categories.nodes[categories.nodes.length - 1].name)}
        />
      </div>
      <div className="pt-10 pb-6 flex flex-col items-center">
        <h2 className="text-4xl mb-3">Trending Now</h2>
        <p className="text-gray-600 text-sm">
          Find the perfect piece or accessory to finish off your collection.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 my-8">
        <DisplaySmall
          imageSrc={inventory[0].image}
          title={inventory[0].name}
          subtitle={inventory[0].categories[0].name}
          link={slugify(inventory[0].name)}
        />

        <DisplaySmall
          imageSrc={inventory[1].image}
          title={inventory[1].name}
          subtitle={inventory[1].categories[0].name}
          link={slugify(inventory[1].name)}
        />

        <DisplaySmall
          imageSrc={inventory[2].image}
          title={inventory[2].name}
          subtitle={inventory[2].categories[0].name}
          link={slugify(inventory[2].name)}
        />

        <DisplaySmall
          imageSrc={inventory[3].image}
          title={inventory[3].name}
          subtitle={inventory[3].categories[0].name}
          link={slugify(inventory[3].name)}
        />
      </div>
    </>
  )
}

export const pageQuery = graphql`
  query {
    navInfo {
      data
    }
    categories: allStrapiCategory(
      filter: { products: { elemMatch: { onTop: { eq: false } } } }
    ) {
      nodes {
        name
        products {
          image {
            url
          }
        }
      }
    }
    products: allStrapiProduct {
      nodes {
        id
        description
        name
        brand
        onTop
        image {
          url
        }
        categories {
          name
        }
      }
    }
  }
`

export default Home

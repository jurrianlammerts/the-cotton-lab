// import getInventory from "./providers/inventoryProvider.js"
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const axios = require("axios")
import { slugify } from "./utils/helpers"

const ItemView = require.resolve("./src/templates/ItemView")
const CategoryView = require.resolve("./src/templates/CategoryView")

async function getUserAsync(name) {
  let response = await fetch(``)
  let data = await response.json()
  return data
}

function makeRequest(graphql, request) {
  new Promise((resolve, reject) => {
    // Query for article nodes to use in creating pages.
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        return result
      })
    )
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const products = await makeRequest(
    graphql,
    `
      {
        products: allStrapiProduct {
          nodes {
            id
            name
            description
            price
            inventory
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
  )

  const {
    data: {
      products: { nodes: inventory },
    },
  } = products

  createPage({
    path: "all",
    component: CategoryView,
    context: {
      content: inventory,
      title: "all",
      type: "categoryPage",
    },
  })

  const inventoryByCategory = inventory.reduce((acc, next) => {
    console.log("acc 1: ", acc)

    const categories = next.categories.map(a => a.name)
    console.log("categories: ", categories)
    categories.forEach(c => {
      if (acc[c]) {
        acc[c].items.push(next)
      } else {
        acc[c] = {}
        acc[c].items = []
        acc[c].items.push(next)
      }
    })
    console.log("acc 2: ", acc)
    return acc
  }, {})

  console.log("inventoryByCategory: ", inventoryByCategory)

  inventoryByCategory.map(async (category, index) => {
    const previous =
      index === categories.length - 1 ? null : categories[index + 1].node
    const next = index === 0 ? null : categories[index - 1]
    createPage({
      path: slugify(category),
      component: CategoryView,
      context: {
        content: inventoryByCategory[category],
        title: category,
        type: "categoryPage",
        previous,
        next,
      },
    })
  })

  inventory.map(async (item, index) => {
    const previous =
      index === inventory.length - 1 ? null : inventory[index + 1].node
    const next = index === 0 ? null : inventory[index - 1]
    createPage({
      path: slugify(item.name),
      component: ItemView,
      context: {
        content: item,
        title: item.name,
        type: "itemPage",
        previous,
        next,
      },
    })
  })
}

exports.sourceNodes = async ({
  graphql,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  try {
    const inventory = await axios.get(`${process.env.API_URL}/products`)
    return inventory
  } catch (e) {
    console.log("Error: ", e)
  }

  // /* create nav info for categories */

  const categoryNames = inventory.reduce((acc, next) => {
    const categories = Object.values(next.categories)
    categories.forEach(c => {
      if (!acc.includes(c)) acc.push(c)
    })
    return acc
  }, [])

  const navData = {
    key: "nav-info",
    data: categoryNames,
  }

  const navNodeContent = JSON.stringify(navData)
  const navNodeMeta = {
    id: createNodeId(`my-data-${navData.key}`),
    parent: null,
    children: [],
    internal: {
      type: `NavInfo`,
      mediaType: `json`,
      content: navNodeContent,
      contentDigest: createContentDigest(navData),
    },
  }

  const navNode = Object.assign({}, navData, navNodeMeta)
  createNode(navNode)

  /* create category info for home page */
  const inventoryByCategory = inventory.reduce((acc, next) => {
    const categories = Object.values(next.categories)

    categories.forEach(c => {
      const index = acc.findIndex(item => item.name === c)
      if (index !== -1) {
        const item = acc[index]
        item.itemCount = item.itemCount + 1
        acc[index] = item
      } else {
        const item = {
          name: c,
          image: Object.values(next.image)[0],
          itemCount: 1,
        }
        acc.push(item)
      }
    })
    return acc
  }, [])

  const catData = {
    key: "category-info",
    data: inventoryByCategory,
  }

  const catNodeContent = JSON.stringify(catData)
  const catNodeMeta = {
    id: createNodeId(`my-data-${catData.key}`),
    parent: null,
    children: [],
    internal: {
      type: `CategoryInfo`,
      mediaType: `json`,
      content: catNodeContent,
      contentDigest: createContentDigest(catData),
    },
  }

  const catNode = Object.assign({}, catData, catNodeMeta)
  createNode(catNode)

  /* all inventory */
  const inventoryData = {
    key: "all-inventory",
    data: inventory,
  }

  const inventoryNodeContent = JSON.stringify(inventoryData)
  const inventoryNodeMeta = {
    id: createNodeId(`my-data-${inventoryData.key}`),
    parent: null,
    children: [],
    internal: {
      type: `InventoryInfo`,
      mediaType: `json`,
      content: inventoryNodeContent,
      contentDigest: createContentDigest(inventoryData),
    },
  }

  const inventoryNode = Object.assign({}, inventoryData, inventoryNodeMeta)
  createNode(inventoryNode)
}

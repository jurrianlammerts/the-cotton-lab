async function getInventory(graphql) {
  try {
    const { data } = await graphql(
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
      products: { nodes: inventory },
    } = data

    if (!inventory) return null
    return inventory
  } catch (err) {
    console.log("Error: ", err)
  }
}

const DENOMINATION = "€"

export { DENOMINATION, getInventory as default }

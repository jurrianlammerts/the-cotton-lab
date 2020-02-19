import uuid from "uuid/v4"

let inventory = [
  {
    categories: ["new arrivals"],
    name: "Nike Air Max 1997",
    price: "250",
    image: "../images/products/sneaker1.png",
    description:
      "Stay a while. This classic Air Max is every dads dream. Now limited in stock!",
    brand: "Nike",
    currentInventory: 4,
  },
  {
    categories: ["sneakers"],
    name: "Nike Air Max 1 suede",
    price: "1000",
    image: "../images/products/sneaker2.jpg",
    description:
      "Stay a while. This classic Air Max is every kids dream. Now limited in stock!",
    brand: "Nike",
    currentInventory: 4,
  },
  {
    categories: ["sneakers"],
    name: "Nike Air Max 97",
    price: "1250",
    image: "../images/products/sneaker17.jpg",
    description:
      "Real sneaker heads cannot live without the streamlined design of the Nike Air Max 97. Give your look an upgrade with the Nike Air Max '97 Ultra. Or impress with the famous waffle sole and looks of a high-speed train and shop Nike Air Max 97 OG shoes.",
    brand: "Nike",
    currentInventory: 2,
  },
  {
    categories: ["new arrivals", "sneakers"],
    name: "Nike flyknit fall edition",
    price: "800",
    image: "../images/products/sneaker4.jpg",
    description:
      "Easy to love. This classic Air Max is every kids dream.Now limited in stock!",
    brand: "Nike",
    currentInventory: 8,
  },
  {
    categories: ["new arrivals", "sneakers"],
    name: "Nike air Jordan",
    price: "900",
    image: "../images/products/sneaker5.jpg",
    description:
      "Stay a while. This classic Air Max is every kids dream. Now limited in stock!",
    brand: "Nike",
    currentInventory: 10,
  },
  {
    categories: ["on sale", "sneakers"],
    name: "Nike Air Max 97 QS",
    price: "1200",
    image: "../images/products/sneaker6.jpg",
    description:
      "Stay a while. This classic Air Max is every kids dream. Now limited in stock!",
    brand: "Nike",
    currentInventory: 7,
  },
  {
    categories: ["sneakers"],
    name: "Nike air force 1",
    price: "800",
    image: "../images/products/sneaker10.jpg",
    description:
      "Stay a while. This classic Air force is every kids dream. Now limited in stock!",
    brand: "Nike",
    currentInventory: 43,
  },
]

inventory.map(i => {
  i.id = uuid()
  return i
})

export default inventory

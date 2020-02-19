import uuid from "uuid/v4"

let inventory = [
  {
    categories: ["new arrivals", "sneakers"],
    name: "Nike airmax 1997",
    price: "250",
    image: "../images/products/sneaker1.png",
    description:
      "Stay a while. This classic Airmax is every dads dream. Now limited in stock!",
    brand: "Nike",
    currentInventory: 4,
  },
  {
    categories: ["new arrivals", "sneakers"],
    name: "Nike airmax 1 suede",
    price: "1000",
    image: "../images/products/sneaker2.jpg",
    description:
      "Stay a while. This classic Airmax is every kids dream. Now limited in stock!",
    brand: "Nike",
    currentInventory: 4,
  },
  {
    categories: ["sneakers"],
    name: "Nike airmax 1 O.G.",
    price: "1000",
    image: "../images/products/sneaker3.jpg",
    description:
      "Stay a while. This classic Airmax is every kids dream. Now limited in stock!",
    brand: "Nike",
    currentInventory: 2,
  },
  {
    categories: ["new arrivals", "sneakers"],
    name: "Nike flyknit fall edition",
    price: "800",
    image: "../images/products/sneaker4.jpg",
    description:
      "Easy to love. This classic Airmax is every kids dream.Now limited in stock!",
    brand: "Nike",
    currentInventory: 8,
  },
  {
    categories: ["new arrivals", "sneakers"],
    name: "Nike air Jordan",
    price: "900",
    image: "../images/products/sneaker5.jpg",
    description:
      "Stay a while. This classic Airmax is every kids dream. Now limited in stock!",
    brand: "Nike",
    currentInventory: 10,
  },
  {
    categories: ["on sale", "sneakers"],
    name: "Nike airmax 97",
    price: "1200",
    image: "../images/products/sneaker6.jpg",
    description:
      "Stay a while. This classic Airmax is every kids dream. Now limited in stock!",
    brand: "Nike",
    currentInventory: 7,
  },
  {
    categories: ["on sale", "sneakers"],
    name: "Nike air foam",
    price: "500",
    image: "../images/products/sneaker7.jpg",
    description:
      "Stay a while. This classic Airmax is every kids dream. Now limited in stock!",
    brand: "Nike",
    currentInventory: 13,
  },
  {
    categories: ["on sale", "sneakers"],
    name: "Nike airmax 97 undefeated",
    price: "650",
    image: "../images/products/sneaker8.jpg",
    description:
      "Stay a while. This classic Airmax is every kids dream. Now limited in stock!",
    brand: "Nike",
    currentInventory: 9,
  },
  {
    categories: ["sneakers"],
    name: "Nike air Jordan",
    price: "1230",
    image: "../images/products/sneaker9.jpg",
    description:
      "Stay a while. This classic Jordan is every kids dream. Now limited in stock!",
    brand: "Nike",
    currentInventory: 24,
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
  {
    categories: ["new arrivals", "sneakers"],
    name: "Nike airmax 200",
    price: "900",
    image: "../images/products/sneaker11.jpg",
    description:
      "Stay a while. This classic Airmax is every kids dream. Now limited in stock!",
    brand: "Nike",
    currentInventory: 2,
  },
  {
    categories: ["on sale", "sneakers"],
    name: "Nike signal 500",
    price: "1200",
    image: "../images/products/sneaker12.jpg",
    description:
      "Stay a while. This classic Airmax is every kids dream. Now limited in stock!",
    currentInventory: 14,
  },

  {
    categories: ["on sale", "chairs"],
    name: "Nike airmax anniversary red",
    price: "300",
    image: "../images/products/sneaker13.jpg",
    description:
      "Stay a while. This classic Airmax is every kids dream. Now limited in stock!",
    brand: "Nike",
    currentInventory: 12,
  },
  {
    categories: ["on sale", "chairs"],
    name: "Nike signal 750",
    price: "825",
    image: "../images/products/sneaker14.jpg",
    description:
      "Stay a while. This classic Airmax is every kids dream. Now limited in stock!",
    brand: "Nike",
    currentInventory: 13,
  },
  {
    categories: ["on sale", "chairs"],
    name: "Nike airmax 270",
    price: "720",
    image: "../images/products/sneaker15.jpg",
    description:
      "Stay a while. This classic Airmax is every kids dream. Now limited in stock!",
    brand: "Nike",
    currentInventory: 33,
  },
]

inventory.map(i => {
  i.id = uuid()
  return i
})

export default inventory

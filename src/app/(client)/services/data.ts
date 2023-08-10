import dummy from "@/assets/images/dummy.png";

const randNumber = Math.floor(Math.random() * 50);

export const services = [
  {
    title: "Service Title",
    image: dummy,
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quas dolor voluptatibus odit architecto debitis obcaecati nobis ducimus accusamus unde? Magnam quas dolor voluptatibus odit architecto debitis obcaecati nobis ducimus accusamus unde?",
    volumes: [
      {
        name: "Volume 1",
        qualities: [
          { type: "Type 1", price: randNumber },
          { type: "Type 2", price: randNumber + 2 },
        ],
      },

      {
        name: "Volume 2",
        qualities: [
          { type: "Type 1", price: randNumber + 2 },
          { type: "Type 2", price: randNumber + 5 },
          { type: "Type 3", price: randNumber + 9 },
        ],
      },
    ],
  },
  {
    title: "Service Title",
    image: dummy,
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quas dolor voluptatibus odit architecto debitis obcaecati nobis ducimus accusamus unde? Magnam quas dolor voluptatibus odit architecto debitis obcaecati nobis ducimus accusamus unde?",
    volumes: [
      {
        name: "Volume 1",
        qualities: [
          { type: "Volume 1 Type 1", price: randNumber + 2 },
          { type: "Volume 1 Type 2", price: randNumber + 5 },
        ],
      },

      {
        name: "Volume 2",
        qualities: [
          { type: "Volume 2Type 1", price: randNumber + 6 },
          { type: "Volume 2Type 2", price: randNumber + 7 },
          { type: "Volume 2Type 3", price: randNumber + 8 },
        ],
      },
    ],
  },
  {
    title: "Service Title",
    image: dummy,
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quas dolor voluptatibus odit architecto debitis obcaecati nobis ducimus accusamus unde? Magnam quas dolor voluptatibus odit architecto debitis obcaecati nobis ducimus accusamus unde?",
    volumes: [
      {
        name: "Volume 1",
        qualities: [
          { type: "Type 1", price: randNumber + 4 },
          { type: "Type 2", price: randNumber + 6 },
        ],
      },

      {
        name: "Volume 2",
        qualities: [
          { type: "Type 1", price: randNumber + 6 },
          { type: "Type 2", price: randNumber + 9 },
          { type: "Type 3", price: randNumber + 12 },
        ],
      },
    ],
  },
  {
    title: "Service Title",
    image: dummy,
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quas dolor voluptatibus odit architecto debitis obcaecati nobis ducimus accusamus unde? Magnam quas dolor voluptatibus odit architecto debitis obcaecati nobis ducimus accusamus unde?",
    volumes: [
      {
        name: "Volume 1",
        qualities: [
          { type: "Type 1", price: randNumber + 10 },
          { type: "Type 2", price: randNumber + 13 },
        ],
      },

      {
        name: "Volume 2",
        qualities: [
          { type: "Type 1", price: randNumber + 11 },
          { type: "Type 2", price: randNumber + 13 },
          { type: "Type 3", price: randNumber + 17 },
        ],
      },
    ],
  },
];

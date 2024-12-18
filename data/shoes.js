// data/shoes.js
let shoes = [];

export const getShoes = () => shoes;

export const addShoe = (shoe) => {
  shoes.push(shoe);
};

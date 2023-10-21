
export const getCategories = (products)=> {
  const categories = products?.map((product) => product.category);
  const obj = {};
  categories?.forEach((element) => {
    obj[element] === undefined ? (obj[element] = 1) : obj[element]++;
  });
  return Object.keys(obj);
}
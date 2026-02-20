const BASE_URL = "https://dummyjson.com/products";

export const getAllProduct = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data.products;
};

export const getCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`);
  const data = await response.json();
  return data;
};

export const getProductsByCategory = async (category: any) => {
  const response = await fetch(`${BASE_URL}/category/${category}`);
  const data = await response.json();
  return data.products;
};

export const getLatestProducts = async () => {
  const response = await fetch(`${BASE_URL}?sortBy=id&order=desc&limit=5`);
  const data = await response.json();
  return data.products;
};

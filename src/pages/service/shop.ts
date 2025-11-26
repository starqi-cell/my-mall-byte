import appRequest from "../../service/index";

export const getProductList = async (categorySlug: string = 'all') => {
  let url = 'https://dummyjson.com/products';

  if (categorySlug && categorySlug !== 'all') {
    url = `https://dummyjson.com/products/category/${categorySlug}`;
  }
  
  const response = await appRequest.get({ 
    url,
    params: {
      limit:0
    }
   });
  return response;
};

export function getCategoryList() {
  return appRequest.get({
    url: "/products/categories"
  });
}

export function getProductByCategory(category: string) {
  return appRequest.get({
    url: `/products/category/${category}`,
  });
}
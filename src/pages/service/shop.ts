// src/pages/service/shop.ts
// 商品相关的请求函数


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
   console.log("获取了一次数据");
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
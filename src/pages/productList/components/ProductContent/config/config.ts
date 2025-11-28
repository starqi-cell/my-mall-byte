// src/pages/productList/components/ProductContent/config.ts
// 商品列表内容组件配置文件

import { Product } from '../../../../../types';

// @ts-ignore
import fallbackImage from '../../../../../assets/fallbackImage.png';

const PLACEHOLDER_IMG = fallbackImage;

export const SKELETON_PRODUCT: Product = {
  id: -1,
  title: 'Loading...', 
  description: 'Loading description...', 
  category: 'loading',
  brand: '',
  tags: [],
  thumbnail: fallbackImage,
  images: [fallbackImage, fallbackImage, fallbackImage], 

  
  price: 0,
  discountPercentage: 0,
  stock: 0,
  sku: 'LOADING',
  minimumOrderQuantity: 1,

  
  weight: 0,
  dimensions: {
    width: 0,
    height: 0,
    depth: 0,
  },

  rating: 0, 
  reviews: [], 

  returnPolicy: '',
  warrantyInformation: '',
  shippingInformation: '',
  availabilityStatus: 'In Stock',


  meta: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    barcode: '',
    qrCode: '',
  },


  image: PLACEHOLDER_IMG, 
  sales: 0,
  specs: {
    colors: [],
    sizes: [],
  },
};
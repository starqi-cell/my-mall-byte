// src/types/index.ts
// 类型定义文件

// 1. DummyJSON 原始单品结构
export interface DummyJsonProduct {

  //基础信息
  id: number;                    // 商品编号
  title: string;                 // 商品标题
  description: string;           // 商品描述
  category: string;              // 商品类别
  brand?: string;                // 品牌
  tags: string[];                // 标签
  thumbnail: string;             // 列表缩略图
  images: string[];              // 详情轮播图


  //价格库存 
  price: number;                 // 售价
  discountPercentage: number;    // 折扣百分比
  stock: number;                 // 库存
  sku?: string;                  // SKU
  minimumOrderQuantity?: number; // 最小起订量


  //规格参数 Specifications
  weight?: number;               // 重量（g）
  dimensions?: {
    width: number;               // 宽(mm)
    height: number;              // 高(mm)
    depth: number;               // 深(mm)
  };


  //评价 
  rating: number;                // 商品评分
  reviews?: Array<{
    rating: number;              // 用户评分
    comment: string;             // 评价内容
    date: string;                // 日期
    reviewerName: string;        // 昵称
    reviewerEmail: string;       // 邮箱
  }>;


  //售后/交易信息
  returnPolicy?: string;         // 退货政策
  warrantyInformation?: string;  // 保修说明
  shippingInformation?: string;  // 物流说明
  availabilityStatus?: string;   // 商品状态

  //元数据 
  meta?: {
    createdAt: string;             // 创建时间
    updatedAt: string;             // 更新时间
    barcode: string;               // 条码
    qrCode: string;                // 二维码
  };
}
// 2. DummyJSON 列表响应结构
export interface DummyJsonResponse {
  products: DummyJsonProduct[];     // 商品列表
  total: number;                    // 商品总数
  skip: number;                     // 跳过数量
  limit: number;                    // 限制数量
}

// 3. 应用内部使用的商品结构

// 商品规格，前端模拟
export interface ProductSpec {
  colors: string[];                 // 可选颜色
  sizes: string[];                  // 可选尺寸
}

// 商品模型
export interface Product extends DummyJsonProduct {
    // 适配字段
  image: string;                    // 商品图片
    
    // 前端模拟字段
  sales: number;                    // 销量，前端模拟  
  specs: ProductSpec;               // 规格，前端模拟
}

// 购物车项
export interface CartItem extends Product {
  selectedColor: string;            // 选中的颜色
  selectedSize: string;             // 选中的尺寸
  quantity: number;                 // 购买数量
}

// 状态管理相关接口 
export interface FilterState {
  keyword: string;                  // 搜索关键词
  category: string;                 // 商品类别
  minPrice: string;                 // 最低价格
  maxPrice: string;                 // 最高价格
}

export interface SortState {
  by: 'default' | 'price' | 'sales' | 'discountPercentage' | 'title' | 'rating';  // 排序依据
  order: 'asc' | 'desc';              // 排序顺序
}

export interface PaginationState {
  current: number;                    // 当前页码
  pageSize: number;                   // 每页条数
}

export interface ShopState {
  products: Product[];                // 商品列表
  categories: string[];               // 商品类别列表
  cart: CartItem[];                   // 购物车列表     
  loading: boolean;                   // 加载状态
  error: string | null;               // 错误信息
  view: 'list' | 'detail';            // 视图模式
  currentProduct: Product | null;     // 当前选中的商品
  filters: FilterState;               // 过滤状态
  sort: SortState;                    // 排序状态
  pagination: PaginationState;        // 分页状态
}

export interface Category {
  slug: string;                       // 类别标识 
  name: string;                       // 类别名称 
  url: string;                        // 类别URL  
}

export interface FilterState {
  keyword: string;                    // 搜索关键词
  category: string;                   // 商品类别
  minPrice: string;                   // 最低价格
  maxPrice: string;                   // 最高价格
}
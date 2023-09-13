export interface ProductColor {
  name: string;
  clrCode: string;
}

export interface ProductImage {
  color: ProductColor;
  img: string;
}

export interface Product {
  _id: string;
  sku: string;
  img: string;
  title: string;
  slug: string;
  unit: string;
  imageURLs: ProductImage[];
  parent: string;
  children: string;
  price: number;
  discount: number;
  quantity: number;
  brand: {
    name: string;
    id: string;
  };
  category: {
    name: string;
    id: string;
  };
  status: string;
  reviews: string[];
  productType: string;
  description: string;
  additionalInformation: {
    key: string;
    value: string;
  }[];
  featured: boolean;
  sellCount: number;
  tags: string[];
}
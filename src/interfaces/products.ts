export enum Colors {
  red = "#E6262F",
  purple = "#785AA5",
  green = "#B3D34B",
  pink = "#E83E97",
  blue = "#30A7D3",
  orange = "#EB650C",
}

export enum Categories {
  small = "18gr",
  big = "35gr",
}

export interface IImage {
  url: string;
  key: string;
}

export interface IIngredient extends IImage {
  name: string;
}

export interface INutrition {
  title: string;
  full: string; // Represents 100g
  portion: string; // Represents portion of 250g
}

export interface IProductVariant {
  [key: string]: any;
  _id: string;
  price: number;
  discount?: number;
  image: IImage;
  variantName: string;
  nutrition: INutrition[];
  variantImage: IImage;
  description: string;
  ingredients: string[];
}

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  color: Colors;
  description: string;
  variants: IProductVariant[];
  show: boolean;
}

export interface IProductOrder {
  title: string;
  variantName: string;
  slug: string;
  image: string;
  price: number;
  discount?: number;
  quantity: number;
  description: string;
}

export interface IDisplayProduct {
  title: string;
  slug: string;
  description: string;
  image: string;
  ingredients: string[];
  color: Colors;
}

export interface IShortDisplayProduct {
  slug: string;
  image: string;
  mobileImage: string;
}

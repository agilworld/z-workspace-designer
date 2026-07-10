/**
 * products — static product catalog.
 * Will be replaced by Strapi CMS data in production.
 *
 * @status scaffold
 */

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image?: string;
}

export const products: Product[] = [];

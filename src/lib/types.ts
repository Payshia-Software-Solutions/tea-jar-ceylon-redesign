
export interface Tea {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  salePrice?: number;
  image: string;
  dataAiHint: string;
  type: 'Black' | 'Green' | 'Oolong' | 'Herbal' | 'White' | string; // Allow string for dynamic values
  flavorProfile: string[];
  origin: string;
}

export interface ApiProduct {
    product_id: string;
    product_name: string;
    selling_price: string;
    special_promo: string;
    special_promo_type: string;
    image_path: string;
    slug: string;
    product_description: string;
    section_id: string;
    department_id: string;
    category_id: string;
}

export interface Department {
  id: string;
  department_name: string;
}

export interface Section {
  id: string;
  section_name: string;
}

export interface Category {
    id: string;
    category_name: string;
}

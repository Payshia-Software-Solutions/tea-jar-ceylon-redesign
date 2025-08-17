
export interface Tea {
  id: string;
  productId?: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  salePrice?: number;
  image: string;
  images?: string[];
  hoverImage?: string;
  dataAiHint: string;
  type: 'Black' | 'Green' | 'Oolong' | 'Herbal' | 'White' | string; // Allow string for dynamic values
  flavorProfile: string[];
  origin: string;
  netWeight?: string;
  departmentId?: string;
  stock_status?: string;
  categoryId?: string;
  categoryName?: string;
  // New fields from e-commerce values
  tastingNotes?: string;
  ingredients?: string;
  teaGrades?: string;
  caffeineLevel?: string;
  brewTemp?: string;
  usageType?: string;
  waterType?: string;
  waterAmount?: string;
  brewDuration?: string;
  detailedDescription?: string;
  productType?: string;
  servingCount?: string;
  perPackGram?: string;
  tbCount?: string;
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
    how_to_use: string;
    section_id: string;
    department_id: string;
    category_id: string;
    stock_status?: string;
}

export interface ApiImage {
    id: string;
    product_id: string;
    image_prefix: string;
    image_path: string;
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

export type SortBy = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export interface EcomValues {
    id: string;
    product_id: string;
    gross_weight: string;
    net_weight: string;
    tasting_notes: string;
    ingredients: string;
    tea_grades: string;
    caffain_level: string;
    breaw_temp: string;
    usage_type: string;
    water_type: string;
    water: string;
    brew_duration: string;
    detailed_description: string;
    how_to_use: string;
    created_by: string;
    created_at: string;
    product_type: string;
    serving_count: string;
    per_pack_gram: string;
    tb_count: string;
}

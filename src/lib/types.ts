export interface Tea {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  salePrice?: number;
  image: string;
  dataAiHint: string;
  type: 'Black' | 'Green' | 'Oolong' | 'Herbal' | 'White';
  flavorProfile: string[];
  origin: string;
}

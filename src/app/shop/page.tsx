
'use client';

import { useState, useEffect } from 'react';
import type { Tea } from '@/lib/types';
import { ProductGrid } from '@/components/ProductGrid';
import { ShopFilters } from '@/components/ShopFilters';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export type Filters = {
  priceRange: [number, number];
};

interface ApiProduct {
    product_id: string;
    product_name: string;
    selling_price: string;
    special_promo: string;
    special_promo_type: string;
    image_path: string;
    slug: string;
}

const MAX_PRICE = 5000; // A default max price

export default function ShopPage() {
  const [products, setProducts] = useState<Tea[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, MAX_PRICE],
  });

  useEffect(() => {
    async function fetchProducts() {
        try {
            const response = await fetch('https://kduserver.payshia.com/products');
            const data: ApiProduct[] = await response.json();
            
            const formattedProducts: Tea[] = data.map(apiProduct => {
                const price = parseFloat(apiProduct.selling_price);
                let salePrice: number | undefined;

                if (apiProduct.special_promo && apiProduct.special_promo_type === 'percentage') {
                    const discount = parseFloat(apiProduct.special_promo);
                    salePrice = price - (price * discount / 100);
                } else if (apiProduct.special_promo) {
                     salePrice = price - parseFloat(apiProduct.special_promo);
                }

                return {
                    id: apiProduct.slug || apiProduct.product_id,
                    name: apiProduct.product_name.trim(),
                    description: '', // Not available in API
                    longDescription: '', // Not available in API
                    price: price,
                    salePrice: salePrice,
                    image: `https://kdu-admin.payshia.com/pos-system/assets/images/products/${apiProduct.product_id}/${apiProduct.image_path}`,
                    dataAiHint: 'tea product',
                    type: 'Black', // Placeholder, not in API
                    flavorProfile: [], // Not in API
                    origin: 'Sri Lanka', // Placeholder,
                };
            });
            
            setProducts(formattedProducts);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    }

    fetchProducts();
  }, []);

  const filteredTeas = products.filter(tea => {
    const { priceRange } = filters;
    const effectivePrice = tea.salePrice ?? tea.price;
    const priceMatch = effectivePrice >= priceRange[0] && effectivePrice <= priceRange[1];
    return priceMatch;
  });

  return (
    <div className="bg-[#353d32] text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="font-headline text-5xl md:text-6xl">Our Tea Collection</h1>
          <p className="text-lg text-neutral-300 mt-4 max-w-2xl mx-auto">
            Explore our curated selection of the finest Ceylon teas. Use the filters to find your perfect blend.
          </p>
        </div>
        
        <Separator className="bg-neutral-700/50 my-8" />

        <div className="grid md:grid-cols-4 gap-8 xl:gap-12">
          <aside className="md:col-span-1">
            <ShopFilters
              filters={filters}
              onFilterChange={setFilters}
              maxPrice={MAX_PRICE}
            />
          </aside>
          <main className="md:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {Array.from({ length: 9 }).map((_, index) => (
                    <div key={index} className="p-1 space-y-4">
                        <Skeleton className="h-[250px] w-full rounded-lg" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
              </div>
            ) : (
              <ProductGrid teas={filteredTeas} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

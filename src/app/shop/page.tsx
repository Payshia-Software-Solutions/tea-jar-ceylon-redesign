
'use client';

import { useState } from 'react';
import { teas } from '@/lib/tea-data';
import type { Tea } from '@/lib/types';
import { ProductGrid } from '@/components/ProductGrid';
import { ShopFilters } from '@/components/ShopFilters';
import { Separator } from '@/components/ui/separator';

export type Filters = {
  teaTypes: string[];
  flavorProfiles: string[];
  priceRange: [number, number];
};

export default function ShopPage() {
  const [filters, setFilters] = useState<Filters>({
    teaTypes: [],
    flavorProfiles: [],
    priceRange: [0, 3000],
  });

  const allTeaTypes = Array.from(new Set(teas.map(t => t.type)));
  const allFlavorProfiles = Array.from(new Set(teas.flatMap(t => t.flavorProfile)));

  const filteredTeas = teas.filter(tea => {
    const { teaTypes, flavorProfiles, priceRange } = filters;
    const effectivePrice = tea.salePrice ?? tea.price;

    const typeMatch = teaTypes.length === 0 || teaTypes.includes(tea.type);
    const flavorMatch =
      flavorProfiles.length === 0 ||
      flavorProfiles.some(flavor => tea.flavorProfile.includes(flavor));
    const priceMatch = effectivePrice >= priceRange[0] && effectivePrice <= priceRange[1];

    return typeMatch && flavorMatch && priceMatch;
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
              allTeaTypes={allTeaTypes}
              allFlavorProfiles={allFlavorProfiles}
              maxPrice={3000}
            />
          </aside>
          <main className="md:col-span-3">
            <ProductGrid teas={filteredTeas} />
          </main>
        </div>
      </div>
    </div>
  );
}

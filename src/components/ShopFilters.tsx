
'use client';

import { Button } from './ui/button';
import { Slider } from './ui/slider';

// This is a placeholder for future filter additions.
// The current shop page is organized by departments.
export type Filters = {
  priceRange: [number, number];
};

interface ShopFiltersProps {
  filters: Filters;
  onFilterChange: (newFilters: Filters) => void;
  maxPrice: number;
}

export function ShopFilters({
  filters,
  onFilterChange,
  maxPrice,
}: ShopFiltersProps) {

  const handlePriceChange = (newRange: [number, number]) => {
    onFilterChange({ ...filters, priceRange: newRange });
  };

  const clearFilters = () => {
    onFilterChange({
        priceRange: [0, maxPrice],
    });
  };

  return (
    <div className="space-y-8 sticky top-24">
      <div className="flex justify-between items-center">
        <h3 className="font-headline text-2xl text-white">Filters</h3>
        <Button variant="link" onClick={clearFilters} className="text-neutral-300 hover:text-white p-0 h-auto">
          Clear All
        </Button>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-4">
        <h4 className="font-semibold text-lg text-neutral-200">Price Range</h4>
        <Slider
          value={filters.priceRange}
          onValueChange={handlePriceChange}
          max={maxPrice}
          step={100}
          className="[&>span]:bg-amber-200"
        />
        <div className="flex justify-between text-neutral-300">
          <span>Rs {filters.priceRange[0]}</span>
          <span>Rs {filters.priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}

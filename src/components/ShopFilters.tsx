
'use client';

import type { Filters } from '@/app/shop/page';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Separator } from './ui/separator';

interface ShopFiltersProps {
  filters: Filters;
  onFilterChange: (newFilters: Filters) => void;
  allTeaTypes: string[];
  allFlavorProfiles: string[];
  maxPrice: number;
}

export function ShopFilters({
  filters,
  onFilterChange,
  allTeaTypes,
  allFlavorProfiles,
  maxPrice,
}: ShopFiltersProps) {

  const handleTeaTypeChange = (type: string, checked: boolean) => {
    const newTeaTypes = checked
      ? [...filters.teaTypes, type]
      : filters.teaTypes.filter(t => t !== type);
    onFilterChange({ ...filters, teaTypes: newTeaTypes });
  };

  const handleFlavorChange = (flavor: string, checked: boolean) => {
    const newFlavorProfiles = checked
      ? [...filters.flavorProfiles, flavor]
      : filters.flavorProfiles.filter(f => f !== flavor);
    onFilterChange({ ...filters, flavorProfiles: newFlavorProfiles });
  };

  const handlePriceChange = (newRange: [number, number]) => {
    onFilterChange({ ...filters, priceRange: newRange });
  };

  const clearFilters = () => {
    onFilterChange({
        teaTypes: [],
        flavorProfiles: [],
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

      {/* Tea Type Filter */}
      <div className="space-y-4">
        <h4 className="font-semibold text-lg text-neutral-200">Tea Type</h4>
        <div className="space-y-3">
          {allTeaTypes.map(type => (
            <div key={type} className="flex items-center space-x-3">
              <Checkbox
                id={`type-${type}`}
                checked={filters.teaTypes.includes(type)}
                onCheckedChange={checked => handleTeaTypeChange(type, !!checked)}
                className="border-neutral-500 data-[state=checked]:bg-amber-200 data-[state=checked]:border-amber-200"
              />
              <Label htmlFor={`type-${type}`} className="text-base text-neutral-300 font-normal cursor-pointer">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <Separator className="bg-neutral-700/50"/>


      {/* Flavor Profile Filter */}
      <div className="space-y-4">
        <h4 className="font-semibold text-lg text-neutral-200">Flavor Profile</h4>
        <div className="space-y-3">
          {allFlavorProfiles.map(flavor => (
            <div key={flavor} className="flex items-center space-x-3">
              <Checkbox
                id={`flavor-${flavor}`}
                checked={filters.flavorProfiles.includes(flavor)}
                onCheckedChange={checked => handleFlavorChange(flavor, !!checked)}
                className="border-neutral-500 data-[state=checked]:bg-amber-200 data-[state=checked]:border-amber-200"
              />
              <Label htmlFor={`flavor-${flavor}`} className="text-base text-neutral-300 font-normal cursor-pointer">
                {flavor}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-neutral-700/50"/>


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

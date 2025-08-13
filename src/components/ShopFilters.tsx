
'use client';

import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Checkbox } from './ui/checkbox';
import type { Department, Section, Category } from '@/lib/types';

export type Filters = {
  priceRange: [number, number];
  sections: string[];
  departments: string[];
  categories: string[];
};

interface ShopFiltersProps {
  filters: Filters;
  onFilterChange: (newFilters: Filters) => void;
  maxPrice: number;
  allSections: Section[];
  allDepartments: Department[];
  allCategories: Category[];
}

export function ShopFilters({
  filters,
  onFilterChange,
  maxPrice,
  allSections,
  allDepartments,
  allCategories,
}: ShopFiltersProps) {

  const handlePriceChange = (newRange: [number, number]) => {
    onFilterChange({ ...filters, priceRange: newRange });
  };
  
  const handleCheckboxChange = (filterType: 'sections' | 'departments' | 'categories', value: string, checked: boolean) => {
    const currentValues = filters[filterType] as string[];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value);
    onFilterChange({ ...filters, [filterType]: newValues });
  };

  const clearFilters = () => {
    onFilterChange({
        priceRange: [0, maxPrice],
        sections: [],
        departments: [],
        categories: [],
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

      <Accordion type="multiple" defaultValue={['price', 'type', 'collection']} className="w-full text-white">
        {/* Price Range Filter */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-lg font-semibold text-neutral-200 hover:no-underline">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="pt-2">
                <Slider
                    value={filters.priceRange}
                    onValueChange={handlePriceChange}
                    max={maxPrice}
                    step={100}
                    className="[&>span]:bg-amber-200"
                />
                <div className="flex justify-between text-neutral-300 mt-3">
                    <span>Rs {filters.priceRange[0]}</span>
                    <span>Rs {filters.priceRange[1]}</span>
                </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Tea Type (Sections) */}
        <AccordionItem value="type">
          <AccordionTrigger className="text-lg font-semibold text-neutral-200 hover:no-underline">Tea Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
                {allSections.map(section => (
                    <div key={section.id} className="flex items-center space-x-2">
                        <Checkbox 
                            id={`section-${section.id}`} 
                            checked={filters.sections.includes(section.id)}
                            onCheckedChange={(checked) => handleCheckboxChange('sections', section.id, !!checked)}
                            className="text-white border-neutral-400"
                        />
                        <label htmlFor={`section-${section.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-300">
                            {section.section_name}
                        </label>
                    </div>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Collections (Departments) */}
        <AccordionItem value="collection">
          <AccordionTrigger className="text-lg font-semibold text-neutral-200 hover:no-underline">Collections</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
                {allDepartments.map(dep => (
                    <div key={dep.id} className="flex items-center space-x-2">
                        <Checkbox 
                            id={`dep-${dep.id}`} 
                            checked={filters.departments.includes(dep.id)}
                            onCheckedChange={(checked) => handleCheckboxChange('departments', dep.id, !!checked)}
                            className="text-white border-neutral-400"
                        />
                        <label htmlFor={`dep-${dep.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-300">
                            {dep.department_name}
                        </label>
                    </div>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Categories */}
        <AccordionItem value="category">
          <AccordionTrigger className="text-lg font-semibold text-neutral-200 hover:no-underline">Category</AccordionTrigger>
          <AccordionContent>
             <div className="space-y-2 pt-2">
                {allCategories.map(cat => (
                    <div key={cat.id} className="flex items-center space-x-2">
                        <Checkbox 
                            id={`cat-${cat.id}`} 
                            checked={filters.categories.includes(cat.id)}
                            onCheckedChange={(checked) => handleCheckboxChange('categories', cat.id, !!checked)}
                             className="text-white border-neutral-400"
                        />
                        <label htmlFor={`cat-${cat.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-300">
                            {cat.category_name}
                        </label>
                    </div>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

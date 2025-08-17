
'use client';

import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Checkbox } from './ui/checkbox';
import type { Department, Section, Category } from '@/lib/types';
import { ScrollArea } from './ui/scroll-area';

export type Filters = {
  priceRange: [number, number];
  sections: string[];
  departments: string[];
  categories: string[];
  search: string;
  stockStatus: string[];
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
  
  const handleCheckboxChange = (filterType: 'sections' | 'departments' | 'categories' | 'stockStatus', value: string, checked: boolean) => {
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
        search: '',
        stockStatus: [],
    });
  };

  const hasActiveFilters = filters.sections.length > 0 || filters.departments.length > 0 || filters.categories.length > 0 || filters.stockStatus.length > 0 || filters.priceRange[0] !== 0 || filters.priceRange[1] !== maxPrice;

  return (
    <div className="sticky top-32">
        <div className="flex justify-between items-center pb-4 border-b border-neutral-700/60 mb-6">
            <h3 className="font-headline text-2xl text-white">Filter By</h3>
            {hasActiveFilters && (
                <Button variant="link" onClick={clearFilters} className="text-amber-200/80 hover:text-amber-200 p-0 h-auto text-sm">
                Clear All
                </Button>
            )}
        </div>
        <ScrollArea className="h-[calc(100vh-10rem)] pr-4 -mr-4">
            <div className="space-y-6">
                <Accordion type="multiple" defaultValue={['availability', 'price', 'type', 'collection', 'category']} className="w-full text-white space-y-4">
                    {/* Availability Filter */}
                    <AccordionItem value="availability" className="bg-[#2a2f28]/80 rounded-lg border-neutral-700/60">
                    <AccordionTrigger className="text-base font-semibold text-neutral-200 hover:no-underline px-4 py-3">Availability</AccordionTrigger>
                    <AccordionContent className="px-4">
                        <div className="space-y-3 pt-2">
                           <div className="flex items-center space-x-3">
                                <Checkbox 
                                    id="stock-in-stock"
                                    checked={filters.stockStatus.includes('in-stock')}
                                    onCheckedChange={(checked) => handleCheckboxChange('stockStatus', 'in-stock', !!checked)}
                                />
                                <label htmlFor="stock-in-stock" className="text-sm font-normal leading-none text-neutral-300 hover:text-white cursor-pointer">
                                    In Stock
                                </label>
                            </div>
                             <div className="flex items-center space-x-3">
                                <Checkbox 
                                    id="stock-out-of-stock"
                                    checked={filters.stockStatus.includes('out-of-stock')}
                                    onCheckedChange={(checked) => handleCheckboxChange('stockStatus', 'out-of-stock', !!checked)}
                                />
                                <label htmlFor="stock-out-of-stock" className="text-sm font-normal leading-none text-neutral-300 hover:text-white cursor-pointer">
                                    Out of Stock
                                </label>
                            </div>
                        </div>
                    </AccordionContent>
                    </AccordionItem>

                    {/* Price Range Filter */}
                    <AccordionItem value="price" className="bg-[#2a2f28]/80 rounded-lg border-neutral-700/60">
                    <AccordionTrigger className="text-base font-semibold text-neutral-200 hover:no-underline px-4 py-3">Price Range</AccordionTrigger>
                    <AccordionContent className="px-4">
                        <div className="pt-2">
                            <Slider
                                value={filters.priceRange}
                                onValueChange={handlePriceChange}
                                max={maxPrice}
                                step={100}
                            />
                            <div className="flex justify-between text-neutral-300 mt-4 text-sm">
                                <span>Rs {filters.priceRange[0].toLocaleString('en-US')}</span>
                                <span>Rs {filters.priceRange[1].toLocaleString('en-US')}</span>
                            </div>
                        </div>
                    </AccordionContent>
                    </AccordionItem>

                    {/* Tea Type (Sections) */}
                    <AccordionItem value="type" className="bg-[#2a2f28]/80 rounded-lg border-neutral-700/60">
                    <AccordionTrigger className="text-base font-semibold text-neutral-200 hover:no-underline px-4 py-3">Tea Type</AccordionTrigger>
                    <AccordionContent className="px-4">
                        <div className="space-y-3 pt-2">
                            {allSections.map(section => (
                                <div key={section.id} className="flex items-center space-x-3">
                                    <Checkbox 
                                        id={`section-${section.id}`} 
                                        checked={filters.sections.includes(section.id)}
                                        onCheckedChange={(checked) => handleCheckboxChange('sections', section.id, !!checked)}
                                    />
                                    <label htmlFor={`section-${section.id}`} className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-300 hover:text-white cursor-pointer">
                                        {section.section_name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                    </AccordionItem>
                    
                    {/* Collections (Departments) */}
                    <AccordionItem value="collection" className="bg-[#2a2f28]/80 rounded-lg border-neutral-700/60">
                    <AccordionTrigger className="text-base font-semibold text-neutral-200 hover:no-underline px-4 py-3">Collections</AccordionTrigger>
                    <AccordionContent className="px-4">
                        <div className="space-y-3 pt-2">
                            {allDepartments.map(dep => (
                                <div key={dep.id} className="flex items-center space-x-3">
                                    <Checkbox 
                                        id={`dep-${dep.id}`} 
                                        checked={filters.departments.includes(dep.id)}
                                        onCheckedChange={(checked) => handleCheckboxChange('departments', dep.id, !!checked)}
                                    />
                                    <label htmlFor={`dep-${dep.id}`} className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-300 hover:text-white cursor-pointer">
                                        {dep.department_name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                    </AccordionItem>

                    {/* Categories */}
                    <AccordionItem value="category" className="bg-[#2a2f28]/80 rounded-lg border-neutral-700/60">
                    <AccordionTrigger className="text-base font-semibold text-neutral-200 hover:no-underline px-4 py-3">Category</AccordionTrigger>
                    <AccordionContent className="px-4">
                        <div className="space-y-3 pt-2">
                            {allCategories.map(cat => (
                                <div key={cat.id} className="flex items-center space-x-3">
                                    <Checkbox 
                                        id={`cat-${cat.id}`} 
                                        checked={filters.categories.includes(cat.id)}
                                        onCheckedChange={(checked) => handleCheckboxChange('categories', cat.id, !!checked)}
                                    />
                                    <label htmlFor={`cat-${cat.id}`} className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-300 hover:text-white cursor-pointer">
                                        {cat.category_name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </ScrollArea>
    </div>
  );
}

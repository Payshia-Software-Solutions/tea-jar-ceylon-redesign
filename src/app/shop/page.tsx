
'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Tea, Department, Section, Category, ApiProduct } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ShopFilters, type Filters } from '@/components/ShopFilters';
import { DepartmentShowcase } from '@/components/DepartmentShowcase';

const MAX_PRICE = 10000;

export default function ShopPage() {
  const [allDepartments, setAllDepartments] = useState<Department[]>([]);
  const [allSections, setAllSections] = useState<Section[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, MAX_PRICE],
    sections: [],
    departments: [],
    categories: [],
  });

  useEffect(() => {
    async function fetchFilterData() {
        try {
            const [departmentsRes, sectionsRes, categoriesRes] = await Promise.all([
                fetch('https://kduserver.payshia.com/departments'),
                fetch('https://kduserver.payshia.com/sections'),
                fetch('https://kduserver.payshia.com/categories'),
            ]);

            const departmentsData = await departmentsRes.json();
            const sectionsData = await sectionsRes.json();
            const categoriesData = await categoriesRes.json();

            setAllDepartments(departmentsData);
            setAllSections(sectionsData);
            setAllCategories(categoriesData);

        } catch (error) {
            console.error('Failed to fetch shop filter data:', error);
        } finally {
            setLoading(false);
        }
    }
    fetchFilterData();
  }, []);

  const visibleDepartments = useMemo(() => {
    if (filters.departments.length === 0) {
      return allDepartments.filter(dep => dep.department_name !== 'Special Offers');
    }
    return allDepartments.filter(dep => filters.departments.includes(dep.id));
  }, [allDepartments, filters.departments]);


  return (
    <div className="bg-[#353d32] text-white min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="font-headline text-5xl md:text-6xl">Tea by Collection</h1>
          <p className="text-lg text-neutral-300 mt-4 max-w-2xl mx-auto">
            Your virtual guide to tea! Discover all types of tea, from herbal infusions to black teas and matcha.
          </p>
        </div>
        
        <Separator className="bg-neutral-700/50 my-8" />

        <div className="grid lg:grid-cols-5 gap-x-12">
            <aside className="hidden lg:block lg:col-span-1">
                 {loading ? (
                    <div className="space-y-8">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index}>
                                <Skeleton className="h-8 w-1/2 mb-4" />
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-6 w-5/6" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <ShopFilters 
                        filters={filters}
                        onFilterChange={setFilters}
                        maxPrice={MAX_PRICE}
                        allSections={allSections}
                        allDepartments={allDepartments}
                        allCategories={allCategories}
                    />
                )}
            </aside>
            <main className="lg:col-span-4">
                 {loading ? (
                    <div className="space-y-12">
                       {Array.from({ length: 3 }).map((_, i) => (
                           <div key={i} className="space-y-6">
                               <Skeleton className="h-10 w-1/2 mx-auto" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                                    {Array.from({ length: 4 }).map((_, j) => (
                                        <div key={j} className="p-1 space-y-4">
                                            <Skeleton className="h-[250px] w-full rounded-lg" />
                                            <Skeleton className="h-4 w-3/4" />
                                            <Skeleton className="h-4 w-1/2" />
                                        </div>
                                    ))}
                                </div>
                           </div>
                       ))}
                    </div>
                ) : (
                    <div className="space-y-16">
                        {visibleDepartments.map(dept => (
                            <DepartmentShowcase 
                                key={dept.id}
                                department={dept}
                                filters={filters}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
      </div>
    </div>
  );
}

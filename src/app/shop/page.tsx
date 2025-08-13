
'use client';

import { useState, useEffect, useMemo, Suspense, useRef } from 'react';
import type { Tea, Department, Section, Category } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ShopFilters, type Filters } from '@/components/ShopFilters';
import { DepartmentShowcase } from '@/components/DepartmentShowcase';
import { useSearchParams } from 'next/navigation';

const MAX_PRICE = 10000;

function ShopPageContent() {
  const searchParams = useSearchParams();

  const [allDepartments, setAllDepartments] = useState<Department[]>([]);
  const [allSections, setAllSections] = useState<Section[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, MAX_PRICE],
    sections: [],
    departments: [],
    categories: [],
    search: '',
  });
  
  const isInitialMount = useRef(true);

  useEffect(() => {
    async function fetchFilterData() {
        try {
            const [departmentsRes, sectionsRes, categoriesRes] = await Promise.all([
                fetch('https://kduserver.payshia.com/departments'),
                fetch('https://kduserver.payshia.com/sections'),
                fetch('https://kduserver.payshia.com/categories'),
            ]);

            const departmentsData: Department[] = await departmentsRes.json();
            const sectionsData: Section[] = await sectionsRes.json();
            const categoriesData: Category[] = await categoriesRes.json();
            
            setAllDepartments(departmentsData);
            setAllSections(sectionsData);
            setAllCategories(categoriesData);

            // Apply filters from URL search params
            const sectionName = searchParams.get('section');
            const departmentName = searchParams.get('department');
            const categoryName = searchParams.get('category');
            const search = searchParams.get('search');
            
            const newFilters: Partial<Filters> = {};

            if (sectionName) {
                const section = sectionsData.find(s => s.section_name === sectionName);
                if (section) newFilters.sections = [section.id];
            }
            if (departmentName) {
                const department = departmentsData.find(d => d.department_name === departmentName);
                if (department) newFilters.departments = [department.id];
            }
            if (categoryName) {
                const category = categoriesData.find(c => c.category_name === categoryName);
                if (category) newFilters.categories = [category.id];
            }
            if (search) {
                newFilters.search = search;
            }

            if (Object.keys(newFilters).length > 0) {
              setFilters(prev => ({...prev, ...newFilters}));
            }

        } catch (error) {
            console.error('Failed to fetch shop filter data:', error);
        } finally {
            setLoading(false);
        }
    }
    fetchFilterData();
  }, [searchParams]);
  
  useEffect(() => {
    // Don't scroll on the initial render
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Scroll to the top of the main content area when filters change
    const mainContent = document.querySelector('main');
    if(mainContent){
        mainContent.scrollIntoView({ behavior: 'smooth' });
    }

  }, [filters]);

  const visibleDepartments = useMemo(() => {
    let departments = allDepartments;

    if (filters.search) {
      // If there's a search query, we don't filter by department initially.
      // The filtering will happen inside DepartmentShowcase.
      return departments;
    }
    
    if (filters.departments.length > 0) {
      departments = departments.filter(dep => filters.departments.includes(dep.id));
    }

    return departments;
  }, [allDepartments, filters.departments, filters.search]);


  return (
    <div className="bg-[#353d32] text-white min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-16 pt-32 md:pt-40">
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

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopPageContent />
    </Suspense>
  )
}


'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Tea, Department, Section, Category, ApiProduct } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ShopFilters, type Filters } from '@/components/ShopFilters';
import { ProductGrid } from '@/components/ProductGrid';

const MAX_PRICE = 10000;

export default function ShopPage() {
  const [allProducts, setAllProducts] = useState<ApiProduct[]>([]);
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
    async function fetchData() {
        try {
            const [productsRes, departmentsRes, sectionsRes, categoriesRes] = await Promise.all([
                fetch('https://kduserver.payshia.com/products'),
                fetch('https://kduserver.payshia.com/departments'),
                fetch('https://kduserver.payshia.com/sections'),
                fetch('https://kduserver.payshia.com/categories'),
            ]);

            const productsData = await productsRes.json();
            const departmentsData = await departmentsRes.json();
            const sectionsData = await sectionsRes.json();
            const categoriesData = await categoriesRes.json();

            setAllProducts(productsData);
            setAllDepartments(departmentsData);
            setAllSections(sectionsData);
            setAllCategories(categoriesData);

        } catch (error) {
            console.error('Failed to fetch shop data:', error);
        } finally {
            setLoading(false);
        }
    }
    fetchData();
  }, []);

  const filteredTeas = useMemo(() => {
    return allProducts
      .filter(product => {
        const price = parseFloat(product.selling_price);
        const [minPrice, maxPrice] = filters.priceRange;
        
        const priceMatch = price >= minPrice && price <= maxPrice;
        const sectionMatch = filters.sections.length === 0 || filters.sections.includes(product.section_id);
        const departmentMatch = filters.departments.length === 0 || filters.departments.includes(product.department_id);
        const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category_id);

        return priceMatch && sectionMatch && departmentMatch && categoryMatch;
      })
      .map(apiProduct => {
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
            description: '',
            longDescription: apiProduct.product_description || '',
            price: price,
            salePrice: salePrice,
            image: `https://kdu-admin.payshia.com/pos-system/assets/images/products/${apiProduct.product_id}/${apiProduct.image_path}`,
            dataAiHint: 'tea product',
            type: allSections.find(s => s.id === apiProduct.section_id)?.section_name as Tea['type'] || 'Black',
            flavorProfile: [],
            origin: 'Sri Lanka',
        };
      });
  }, [allProducts, filters, allSections]);


  return (
    <div className="bg-[#353d32] text-white min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="font-headline text-5xl md:text-6xl">Our Tea Collection</h1>
          <p className="text-lg text-neutral-300 mt-4 max-w-2xl mx-auto">
            Explore our curated selection of the finest Ceylon teas.
          </p>
        </div>
        
        <Separator className="bg-neutral-700/50 my-8" />

        <div className="grid lg:grid-cols-4 gap-x-12">
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
            <main className="lg:col-span-3">
                 {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className="p-1 space-y-4">
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

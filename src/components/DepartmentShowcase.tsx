
'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Tea, ApiProduct, ApiImage, Category } from '@/lib/types';
import { ProductGrid } from '@/components/ProductGrid';
import { Skeleton } from '@/components/ui/skeleton';
import type { Filters } from './ShopFilters';

interface Department {
    id: string;
    department_name: string;
}

interface DepartmentShowcaseProps {
    department: Department;
    filters: Filters;
}

export function DepartmentShowcase({ department, filters }: DepartmentShowcaseProps) {
    const [products, setProducts] = useState<ApiProduct[]>([]);
    const [productImages, setProductImages] = useState<Record<string, ApiImage[]>>({});
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!department.id) return;

        async function fetchProductsAndImages() {
            setLoading(true);
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    fetch(`https://kduserver.payshia.com/products/get-by-department/${department.id}`),
                    fetch(`https://kduserver.payshia.com/categories`)
                ]);
                
                const data: ApiProduct[] = await productsRes.json();
                const categoriesData: Category[] = await categoriesRes.json();
                setProducts(data);
                setCategories(categoriesData);

                const imagePromises = data.map(product =>
                    fetch(`https://kduserver.payshia.com/product-images/get-by-product/${product.product_id}`).then(res => res.json())
                );
                
                const imagesResults = await Promise.all(imagePromises);
                
                const imagesMap: Record<string, ApiImage[]> = {};
                data.forEach((product, index) => {
                    if (Array.isArray(imagesResults[index])) {
                        imagesMap[product.product_id] = imagesResults[index];
                    } else {
                        imagesMap[product.product_id] = [];
                    }
                });

                setProductImages(imagesMap);

            } catch (error) {
                console.error(`Failed to fetch products or images for department ${department.id}:`, error);
            } finally {
                setLoading(false);
            }
        }

        fetchProductsAndImages();
    }, [department.id]);
    
    const filteredAndFormattedTeas = useMemo(() => {
        const categoryMap = new Map(categories.map(c => [c.id, c.category_name]));

        return products
          .filter(product => {
            const price = parseFloat(product.selling_price);
            const [minPrice, maxPrice] = filters.priceRange;
            
            const priceMatch = price >= minPrice && price <= maxPrice;
            const sectionMatch = filters.sections.length === 0 || filters.sections.includes(product.section_id);
            const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category_id);
            const searchMatch = !filters.search || product.product_name.toLowerCase().includes(filters.search.toLowerCase());
            const stockMatch = product.stock_status !== "0";

            return priceMatch && sectionMatch && categoryMatch && searchMatch && stockMatch;
          })
          .map((apiProduct): Tea => {
            const price = parseFloat(apiProduct.selling_price);
            let salePrice: number | undefined;

            if (apiProduct.special_promo && apiProduct.special_promo_type === 'percentage') {
                const discount = parseFloat(apiProduct.special_promo);
                salePrice = price - (price * discount / 100);
            } else if (apiProduct.special_promo) {
                salePrice = price - parseFloat(apiProduct.special_promo);
            }

            const images = productImages[apiProduct.product_id] || [];
            const frontImage = Array.isArray(images) ? images.find(img => img.image_prefix === 'Front Image') : null;
            const otherImage = Array.isArray(images) ? images.find(img => img.image_prefix === 'Other') : null;

            const mainImageUrl = frontImage
                ? `https://kdu-admin.payshia.com/pos-system/assets/images/products/${apiProduct.product_id}/${frontImage.image_path}`
                : `https://kdu-admin.payshia.com/pos-system/assets/images/products/${apiProduct.product_id}/${apiProduct.image_path}`;

            const hoverImageUrl = otherImage
                ? `https://kdu-admin.payshia.com/pos-system/assets/images/products/${apiProduct.product_id}/${otherImage.image_path}`
                : undefined;

            return {
                id: apiProduct.slug || apiProduct.product_id,
                productId: apiProduct.product_id,
                name: apiProduct.product_name.trim(),
                description: '',
                longDescription: apiProduct.product_description || '',
                price: price,
                salePrice: salePrice,
                image: mainImageUrl,
                hoverImage: hoverImageUrl,
                dataAiHint: 'tea product',
                type: 'Black',
                flavorProfile: [],
                origin: 'Sri Lanka',
                stock_status: apiProduct.stock_status,
                categoryId: apiProduct.category_id,
                categoryName: categoryMap.get(apiProduct.category_id),
            };
          });
    }, [products, filters, productImages, categories]);


    if (loading) {
        return (
            <div className="space-y-8">
                <h2 className="font-headline text-4xl text-center text-white">{department.department_name}</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-10">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="p-1 space-y-4">
                            <Skeleton className="h-[250px] w-full rounded-lg" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    
    // Only render the section if there are products to display after filtering
    if (filteredAndFormattedTeas.length === 0) {
        return null; 
    }

    return (
        <section>
            <h2 className="font-headline text-4xl text-center text-white mb-8">{department.department_name} ({filteredAndFormattedTeas.length})</h2>
            <ProductGrid teas={filteredAndFormattedTeas} />
        </section>
    );
}


'use client';

import { useState, useEffect } from 'react';
import type { Tea, ApiProduct } from '@/lib/types';
import { ProductGrid } from '@/components/ProductGrid';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from './ui/separator';

interface Department {
    id: string;
    department_name: string;
}

interface DepartmentShowcaseProps {
    department: Department;
}

export function DepartmentShowcase({ department }: DepartmentShowcaseProps) {
    const [products, setProducts] = useState<Tea[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!department.id) return;

        async function fetchProducts() {
            setLoading(true);
            try {
                const response = await fetch(`https://kduserver.payshia.com/products/get-by-department/${department.id}`);
                const data: ApiProduct[] = await response.json();
                
                const formattedProducts: Tea[] = data.map(apiProduct => {
                    const price = parseFloat(apiProduct.selling_price);
                    let salePrice: number | undefined;

                    if (apiProduct.special_promo && apiProduct.special_promo_type === 'percentage') {
                        const discount = parseFloat(apiProduct.special_promo);
                        salePrice = price - (price * discount / 100);
                    } else if (apiProduct.special_promo && apiProduct.special_promo_type === 'fixed') {
                        salePrice = price - parseFloat(apiProduct.special_promo);
                    }

                    return {
                        id: apiProduct.slug || apiProduct.product_id,
                        name: apiProduct.product_name.trim(),
                        description: '', 
                        longDescription: '',
                        price: price,
                        salePrice: salePrice,
                        image: `https://kdu-admin.payshia.com/pos-system/assets/images/products/${apiProduct.product_id}/${apiProduct.image_path}`,
                        dataAiHint: 'tea product',
                        type: 'Black', 
                        flavorProfile: [],
                        origin: 'Sri Lanka',
                    };
                });
                
                setProducts(formattedProducts);
            } catch (error) {
                console.error(`Failed to fetch products for department ${department.id}:`, error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [department.id, department.department_name]);

    if (loading) {
        return (
            <div className="space-y-8">
                <h2 className="font-headline text-4xl text-center text-white">{department.department_name}</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
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
    
    if (products.length === 0) {
        return null; // Don't render anything if a department has no products
    }

    return (
        <section>
            <h2 className="font-headline text-4xl text-center text-white mb-8">{department.department_name}</h2>
            <ProductGrid teas={products} />
        </section>
    );
}

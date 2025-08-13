
'use client';

import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { TeaCard } from '@/components/TeaCard';
import { Button } from '@/components/ui/button';
import type { Tea } from '@/lib/types';
import { Skeleton } from './ui/skeleton';

interface ApiProduct {
    product_id: string;
    product_name: string;
    selling_price: string;
    special_promo: string;
    special_promo_type: string;
    image_path: string;
    slug: string;
    // Add other fields from the API if needed
}

export function Products() {
    const [products, setProducts] = useState<Tea[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('https://kduserver.payshia.com/products');
                const data: ApiProduct[] = await response.json();
                
                const formattedProducts: Tea[] = data.map(apiProduct => {
                    const price = parseFloat(apiProduct.selling_price);
                    let salePrice: number | undefined;

                    if (apiProduct.special_promo && apiProduct.special_promo_type === 'percentage') {
                        const discount = parseFloat(apiProduct.special_promo);
                        salePrice = price - (price * discount / 100);
                    } else if (apiProduct.special_promo) {
                         // Assuming fixed amount discount if not percentage
                         salePrice = price - parseFloat(apiProduct.special_promo);
                    }

                    return {
                        id: apiProduct.slug || apiProduct.product_id,
                        name: apiProduct.product_name.trim(),
                        description: '', // Not available in API
                        longDescription: '', // Not available in API
                        price: price,
                        salePrice: salePrice,
                        image: `https://kdu-admin.payshia.com/pos-system/assets/images/products/${apiProduct.product_id}/${apiProduct.image_path}`,
                        dataAiHint: 'tea product',
                        type: 'Black', // Placeholder, not in API
                        flavorProfile: [], // Not in API
                        origin: 'Sri Lanka', // Placeholder,
                    };
                });
                
                setProducts(formattedProducts);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return (
        <section className="bg-[#353d32] py-16 md:py-20 text-white pl-4" id="teas">
            <div className="container mx-auto px-4">
                <h2 className="font-headline text-3xl md:text-4xl text-center mb-8 md:mb-12">Shop Our Best Selling Products</h2>
            </div>
            {loading ? (
                <div className="w-full">
                   <Carousel
                        opts={{
                        align: 'start',
                        }}
                    >
                        <CarouselContent>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                                    <div className="p-1 space-y-4">
                                        <Skeleton className="h-[250px] w-full rounded-lg" />
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            ) : (
                <Carousel
                    opts={{
                        align: 'start',
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-2">
                        {products.map((tea) => (
                            <CarouselItem key={tea.id} className="pl-2 basis-2/3 sm:basis-2/5 md:basis-2/7 lg:basis-2/9 xl:basis-2/11">
                                <div className="p-1">
                                    <TeaCard tea={tea} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            )}
            <div className="text-center mt-12">
                <Button className="bg-[#d1e4c9] text-black hover:bg-[#d1e4c9]/90">Shop More</Button>
            </div>
        </section>
    );
}


'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TeaCard } from '@/components/TeaCard';
import { Button } from '@/components/ui/button';
import type { Tea } from '@/lib/types';
import { Skeleton } from './ui/skeleton';
import 'swiper/css';

interface ApiProduct {
    product_id: string;
    product_name: string;
    selling_price: string;
    special_promo: string;
    special_promo_type: string;
    image_path: string;
    slug: string;
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
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return (
        <section className="bg-[#353d32] py-16 md:py-20 text-white" id="teas">
            <div className="container mx-auto px-4">
                <h2 className="font-headline text-3xl md:text-4xl text-center mb-8 md:mb-12">Shop Our Best Selling Products</h2>
            </div>
            {loading ? (
                <div className="w-full pl-4 md:pl-8 lg:pl-12">
                   <div className="flex space-x-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="w-[250px] flex-shrink-0 space-y-4">
                                <Skeleton className="h-[250px] w-full rounded-lg" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <Swiper
                    spaceBetween={16}
                    slidesPerView={'auto'}
                    className="!pl-4 md:!pl-8 lg:!pl-12"
                    breakpoints={{
                        // mobile (default)
                        0: { slidesPerView: 1.5 },
                        // tablet
                        640: { slidesPerView: 2.5 },
                        // md
                        768: { slidesPerView: 3.5 },
                        // large
                        1024: { slidesPerView: 4.5 },
                        // extra large
                        1280: { slidesPerView: 5.5 },
                    }}
                >
                    {products.map((tea) => (
                        <SwiperSlide key={tea.id} className="!h-auto !w-auto">
                            <div className="w-[250px] h-full">
                                <TeaCard tea={tea} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
            <div className="text-center mt-12">
                <Button className="bg-[#d1e4c9] text-black hover:bg-[#d1e4c9]/90">Shop More</Button>
            </div>
        </section>
    );
}

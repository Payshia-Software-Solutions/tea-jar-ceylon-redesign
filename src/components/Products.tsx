
'use client';

import { useEffect, useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TeaCard } from '@/components/TeaCard';
import { Button } from '@/components/ui/button';
import type { Tea, ApiProduct, ApiImage, Category } from '@/lib/types';
import { Skeleton } from './ui/skeleton';
import 'swiper/css';
import Link from 'next/link';

export function Products() {
    const [apiProducts, setApiProducts] = useState<ApiProduct[]>([]);
    const [productImages, setProductImages] = useState<Record<string, ApiImage[]>>({});
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProductsAndImages() {
            try {
                const [productsResponse, categoriesResponse] = await Promise.all([
                    fetch('https://kduserver.payshia.com/products'),
                    fetch('https://kduserver.payshia.com/categories')
                ]);

                const data: ApiProduct[] = await productsResponse.json();
                const categoriesData: Category[] = await categoriesResponse.json();
                setApiProducts(data);
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
                console.error('Failed to fetch products or images:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProductsAndImages();
    }, []);

    const formattedProducts = useMemo((): Tea[] => {
        const productIds = ['55', '56', '5', '11', '34', '15', '4', '9', '39', '43'];
        const categoryMap = new Map(categories.map(c => [c.id, c.category_name]));
        const productMap = new Map(apiProducts.map(p => [p.product_id, p]));

        return productIds
            .map(id => productMap.get(id))
            .filter((apiProduct): apiProduct is ApiProduct => !!apiProduct)
            .map(apiProduct => {
                const price = parseFloat(apiProduct.selling_price);
                let salePrice: number | undefined;

                if (apiProduct.special_promo && apiProduct.special_promo_type === 'percentage') {
                    const discount = parseFloat(apiProduct.special_promo);
                    salePrice = price - (price * discount / 100);
                } else if (apiProduct.special_promo) {
                    salePrice = price - parseFloat(apiProduct.special_promo);
                }

                const images = productImages[apiProduct.product_id] || [];
                const otherImage = images.find(img => img.image_prefix === 'Other');

                const hoverImageUrl = otherImage
                    ? `https://kdu-admin.payshia.com/pos-system/assets/images/products/${apiProduct.product_id}/${otherImage.image_path}`
                    : undefined;

                return {
                    id: apiProduct.slug || apiProduct.product_id,
                    productId: apiProduct.product_id,
                    name: apiProduct.product_name.trim(),
                    description: '',
                    longDescription: '',
                    price: price,
                    salePrice: salePrice,
                    image: `https://kdu-admin.payshia.com/pos-system/assets/images/products/${apiProduct.product_id}/${apiProduct.image_path}`,
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
    }, [apiProducts, productImages, categories]);

    return (
        <section className="bg-[#353d32] py-16 md:py-20 text-white" id="teas">
            <div className="container mx-auto px-4">
                <h2 className="font-headline text-3xl md:text-4xl text-center mb-8 md:mb-12">Shop Our Best Selling Products</h2>
            </div>
            {loading ? (
                <div className="w-full pl-4 sm:pl-6 md:pl-8 lg:pl-12">
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
                    slidesPerView={1.5}
                    className="!pl-4 sm:!pl-6 md:!pl-8 lg:!pl-12"
                    breakpoints={{
                        640: { slidesPerView: 2.5 },
                        768: { slidesPerView: 3.5 },
                        1024: { slidesPerView: 4.5 },
                        1280: { slidesPerView: 5.5 },
                    }}
                >
                    {formattedProducts.map((tea) => (
                        <SwiperSlide key={tea.id}>
                            <TeaCard tea={tea} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
            <div className="text-center mt-12">
                <Link href="/shop">
                  <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black">Shop More</Button>
                </Link>
            </div>
        </section>
    );
}

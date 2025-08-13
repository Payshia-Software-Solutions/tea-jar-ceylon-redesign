
'use client';

import type { Tea, ApiProduct } from '@/lib/types';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { AddToCartButton } from '@/components/AddToCartButton';
import { BrewingGuide } from '@/components/BrewingGuide';
import { TeaCard } from '@/components/TeaCard';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface TeaPageProps {
  params: {
    slug: string;
  };
}


export default function TeaPage({ params }: TeaPageProps) {
  const [tea, setTea] = useState<Tea | null>(null);
  const [recommendedTeas, setRecommendedTeas] = useState<Tea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://kduserver.payshia.com/products/get-by-slug/${params.slug}`);
        if (!response.ok) {
            setLoading(false);
            return;
        }
        const apiProduct: ApiProduct = await response.json();
        
        const price = parseFloat(apiProduct.selling_price);
        let salePrice: number | undefined;

        if (apiProduct.special_promo && apiProduct.special_promo_type === 'percentage') {
            const discount = parseFloat(apiProduct.special_promo);
            salePrice = price - (price * discount / 100);
        } else if (apiProduct.special_promo) {
             salePrice = price - parseFloat(apiProduct.special_promo);
        }

        const formattedProduct: Tea = {
            id: apiProduct.slug || apiProduct.product_id,
            name: apiProduct.product_name.trim(),
            description: '', 
            longDescription: apiProduct.product_description || 'A delightful tea from Ceylon.',
            price: price,
            salePrice: salePrice,
            image: `https://kdu-admin.payshia.com/pos-system/assets/images/products/${apiProduct.product_id}/${apiProduct.image_path}`,
            dataAiHint: 'tea product',
            type: 'Black', // Placeholder
            flavorProfile: [], // Placeholder
            origin: 'Sri Lanka', // Placeholder
        };
        
        setTea(formattedProduct);

        // Fetch recommendations (using all products for now)
        const allProductsResponse = await fetch('https://kduserver.payshia.com/products');
        const allProductsData: ApiProduct[] = await allProductsResponse.json();
        const allFormattedProducts: Tea[] = allProductsData.map(p => {
            const p_price = parseFloat(p.selling_price);
            let p_salePrice: number | undefined;
            if (p.special_promo && p.special_promo_type === 'percentage') {
                const discount = parseFloat(p.special_promo);
                p_salePrice = p_price - (p_price * discount / 100);
            } else if (p.special_promo) {
                 p_salePrice = p_price - parseFloat(p.special_promo);
            }
            return {
                id: p.slug || p.product_id,
                name: p.product_name.trim(),
                description: '',
                longDescription: p.product_description || '',
                price: p_price,
                salePrice: p_salePrice,
                image: `https://kdu-admin.payshia.com/pos-system/assets/images/products/${p.product_id}/${p.image_path}`,
                dataAiHint: 'tea product',
                type: 'Black',
                flavorProfile: [],
                origin: 'Sri Lanka',
            };
        });

        const recs = allFormattedProducts.filter(t => t.id !== formattedProduct.id).slice(0, 4);
        setRecommendedTeas(recs);

      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params.slug]);

  if (loading) {
      return (
        <div className="bg-[#353d32] text-white min-h-screen pt-32 md:pt-40">
          <div className="container mx-auto px-4 py-12">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                  <Skeleton className="aspect-square w-full rounded-xl bg-neutral-700/50" />
                  <div className="space-y-6">
                      <Skeleton className="h-6 w-1/4 bg-neutral-700/50" />
                      <Skeleton className="h-12 w-3/4 bg-neutral-700/50" />
                      <Skeleton className="h-20 w-full bg-neutral-700/50" />
                      <Skeleton className="h-6 w-1/2 bg-neutral-700/50" />
                      <div className="flex items-baseline gap-4 pt-4">
                        <Skeleton className="h-12 w-1/3 bg-neutral-700/50" />
                        <Skeleton className="h-12 w-1/3 bg-neutral-700/50" />
                      </div>
                  </div>
              </div>
          </div>
        </div>
      )
  }

  if (!tea) {
    notFound();
  }

  return (
    <div className="bg-[#353d32] text-white min-h-screen pt-32 md:pt-40">
        <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="aspect-square w-full relative overflow-hidden rounded-xl shadow-lg">
            <Image
                src={tea.image}
                alt={tea.name}
                fill
                className="object-cover"
                data-ai-hint={tea.dataAiHint}
                priority
                unoptimized
            />
            </div>
            <div className="space-y-6">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-amber-200/50 text-amber-200/90">{tea.type}</Badge>
                <span className="text-sm text-neutral-300">{tea.origin}</span>
                </div>
                <h1 className="font-headline text-5xl text-white">{tea.name}</h1>
                <p className="text-lg text-neutral-300">{tea.longDescription}</p>
            </div>
            <div className="flex items-center gap-3">
                {tea.flavorProfile.map((flavor) => (
                <Badge key={flavor} variant="secondary" className="bg-neutral-700/50 text-neutral-200">
                    {flavor}
                </Badge>
                ))}
            </div>
            <div className="flex items-baseline gap-4 pt-4">
                {tea.salePrice ? (
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl text-neutral-400 line-through">Rs {tea.price.toFixed(2)}</span>
                        <span className="text-4xl font-bold text-red-500">Rs {tea.salePrice.toFixed(2)}</span>
                    </div>
                    ) : (
                    <span className="text-4xl font-bold text-white">Rs {tea.price.toFixed(2)}</span>
                )}
                <AddToCartButton tea={tea} />
            </div>
            </div>
        </div>

        <div className="mt-16 md:mt-24">
            <BrewingGuide teaType={tea.type} />
        </div>

        {recommendedTeas.length > 0 && (
            <div className="mt-16 md:mt-24">
                <Separator className="my-8 bg-neutral-700/50" />
            <h2 className="font-headline text-4xl text-center text-white mb-12">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {recommendedTeas.map((recTea) => (
                <TeaCard key={recTea.id} tea={recTea} />
                ))}
            </div>
            </div>
        )}
        </div>
    </div>
  );
}


'use client';

import type { Tea, ApiProduct } from '@/lib/types';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { AddToCartButton } from '@/components/AddToCartButton';
import { TeaCard } from '@/components/TeaCard';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, ChevronRight, Minus, Plus, ShoppingBag, Droplets, Thermometer, Clock, Users, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TeaPageProps {
  params: {
    slug: string;
  };
}


export default function TeaPage({ params }: TeaPageProps) {
  const [tea, setTea] = useState<Tea | null>(null);
  const [recommendedTeas, setRecommendedTeas] = useState<Tea[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>('');

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
        
        const imageUrl = `https://kdu-admin.payshia.com/pos-system/assets/images/products/${apiProduct.product_id}/${apiProduct.image_path}`;

        const formattedProduct: Tea = {
            id: apiProduct.slug || apiProduct.product_id,
            name: apiProduct.product_name.trim(),
            description: apiProduct.product_description || 'A delightful tea from Ceylon.', // Using for tasting notes
            longDescription: apiProduct.how_to_use || '100% Ceylon black tea.', // Using for ingredients
            price: price,
            salePrice: salePrice,
            image: imageUrl,
            images: [imageUrl, 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'], // Placeholder for gallery
            dataAiHint: 'tea product',
            type: 'Black', // Placeholder
            flavorProfile: [], // Placeholder
            origin: 'Sri Lanka', // Placeholder
            netWeight: '350.00 g' // Placeholder
        };
        
        setTea(formattedProduct);
        setActiveImage(formattedProduct.image);

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
  
  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };


  if (loading) {
      return (
        <div className="bg-white text-black min-h-screen pt-12">
          <div className="container mx-auto px-4 py-12">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                  <div className="space-y-4">
                     <Skeleton className="aspect-square w-full rounded-xl bg-neutral-200" />
                     <div className="grid grid-cols-5 gap-4">
                        <Skeleton className="aspect-square w-full rounded-md bg-neutral-200" />
                        <Skeleton className="aspect-square w-full rounded-md bg-neutral-200" />
                        <Skeleton className="aspect-square w-full rounded-md bg-neutral-200" />
                        <Skeleton className="aspect-square w-full rounded-md bg-neutral-200" />
                        <Skeleton className="aspect-square w-full rounded-md bg-neutral-200" />
                     </div>
                  </div>
                  <div className="space-y-6">
                      <Skeleton className="h-4 w-1/3 bg-neutral-200" />
                      <Skeleton className="h-12 w-3/4 bg-neutral-200" />
                      <Skeleton className="h-20 w-full bg-neutral-200" />
                      <Skeleton className="h-6 w-1/2 bg-neutral-200" />
                      <div className="flex items-baseline gap-4 pt-4">
                        <Skeleton className="h-12 w-1/3 bg-neutral-200" />
                        <Skeleton className="h-12 w-1/3 bg-neutral-200" />
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
    <div className="bg-white text-neutral-800 min-h-screen pt-12">
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center text-sm text-neutral-500 mb-8">
                <span>Products</span>
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="font-medium text-neutral-800">{tea.name}</span>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square w-full relative overflow-hidden rounded-xl shadow-md border">
                        <Image
                            src={activeImage}
                            alt={tea.name}
                            fill
                            className="object-contain"
                            data-ai-hint={tea.dataAiHint}
                            priority
                            unoptimized
                        />
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        {tea.images?.map((img, index) => (
                            <div 
                                key={index} 
                                className={`aspect-square relative rounded-md overflow-hidden cursor-pointer border-2 ${activeImage === img ? 'border-primary' : 'border-transparent'}`}
                                onClick={() => setActiveImage(img)}
                            >
                                <Image
                                    src={img}
                                    alt={`${tea.name} thumbnail ${index + 1}`}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h1 className="font-headline text-4xl md:text-5xl text-neutral-900">{tea.name}</h1>
                        <div className="flex items-center gap-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-neutral-300'}`} />
                            ))}
                        </div>
                        <div className="flex items-center gap-6 text-sm text-neutral-600">
                             <div className="flex items-center gap-2">
                                <Coffee className="w-5 h-5"/>
                                <span>175 servings per pack</span>
                             </div>
                             <div className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5"/>
                                <span>175 grams per pack</span>
                             </div>
                        </div>
                        <div className="flex items-baseline gap-4 pt-2">
                            {tea.salePrice ? (
                                <div className="flex items-baseline gap-3">
                                    <span className="text-2xl text-neutral-400 line-through">Rs {tea.price.toFixed(2)}</span>
                                    <span className="text-4xl font-bold text-red-600">Rs {tea.salePrice.toFixed(2)}</span>
                                </div>
                            ) : (
                                <span className="text-4xl font-bold text-neutral-900">Rs {tea.price.toFixed(2)}</span>
                            )}
                            <Badge className="bg-green-100 text-green-800 border border-green-200">IN STOCK</Badge>
                        </div>
                         <p className="text-sm text-neutral-500">Shipping calculated at checkout.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded-md">
                            <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)}><Minus className="w-4 h-4" /></Button>
                            <span className="w-10 text-center font-medium">{quantity}</span>
                            <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)}><Plus className="w-4 h-4" /></Button>
                        </div>
                        <AddToCartButton tea={tea} quantity={quantity} className="flex-grow bg-black text-white hover:bg-neutral-800" />
                        <Button variant="outline" size="icon" className="border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700">
                            <ShoppingBag className="w-5 h-5" />
                        </Button>
                    </div>
                    
                    <Tabs defaultValue="features" className="w-full pt-4">
                      <TabsList className="grid w-full grid-cols-2 bg-neutral-100">
                        <TabsTrigger value="features">Tasting Note & Distinctive Features</TabsTrigger>
                        <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                      </TabsList>
                      <TabsContent value="features" className="p-4 border border-t-0 rounded-b-md">
                        <p className="text-neutral-600">{tea.description}</p>
                        <div className="mt-6 space-y-4">
                            <h4 className="font-semibold text-neutral-800">Net Weight</h4>
                            <p className="text-neutral-600">{tea.netWeight}</p>
                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-neutral-800 mb-2">Caffeine</h4>
                                    <div className="flex items-center gap-2">
                                        <Coffee className="w-5 h-5 text-amber-700" />
                                        <span className="text-neutral-600">Medium</span>
                                    </div>
                                </div>
                                 <div>
                                    <h4 className="font-semibold text-neutral-800 mb-2">Time of Day</h4>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-amber-700" />
                                        <span className="text-neutral-600">Evening</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="ingredients" className="p-4 border border-t-0 rounded-b-md">
                        <p className="text-neutral-600">{tea.longDescription}</p>
                      </TabsContent>
                    </Tabs>

                </div>
            </div>

            {/* Brewing Info */}
            <div className="mt-16 md:mt-24 text-center bg-neutral-50 py-12 rounded-xl">
                 <h2 className="font-headline text-3xl md:text-4xl text-neutral-900 mb-10">Brewing Information</h2>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-white border flex items-center justify-center">
                            <Droplets className="w-8 h-8 text-amber-700" />
                        </div>
                        <p className="font-semibold">Recommended to use Spring Water</p>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-white border flex items-center justify-center">
                            <Thermometer className="w-8 h-8 text-amber-700" />
                        </div>
                        <p className="font-semibold">95°C – 100°C</p>
                    </div>
                     <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-white border flex items-center justify-center">
                            <Users className="w-8 h-8 text-amber-700" />
                        </div>
                        <p className="font-semibold">220ml of water per person</p>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-white border flex items-center justify-center">
                            <Clock className="w-8 h-8 text-amber-700" />
                        </div>
                        <p className="font-semibold">3 - 5 Minutes</p>
                        <p className="text-xs text-neutral-500">(5 minutes for a strong cup)</p>
                    </div>
                 </div>
            </div>


            {/* Recommendations */}
            {recommendedTeas.length > 0 && (
                <div className="mt-16 md:mt-24">
                <Separator className="my-8 bg-neutral-200" />
                <h2 className="font-headline text-4xl text-center text-neutral-900 mb-12">You Might Also Like</h2>
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

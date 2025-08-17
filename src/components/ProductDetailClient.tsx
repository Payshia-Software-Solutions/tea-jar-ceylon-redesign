
'use client';

import type { Tea } from '@/lib/types';
import Image from 'next/image';
import { AddToCartButton } from '@/components/AddToCartButton';
import { TeaCard } from '@/components/TeaCard';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { Star, ChevronRight, Minus, Plus, ShoppingBag, Droplets, Thermometer, Clock, Users, Coffee, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link';
import { ProductReviews } from '@/components/ProductReviews';
import { Badge } from './ui/badge';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useToast } from '@/hooks/use-toast';
import { MintPay } from './MintPay';

interface ProductDetailClientProps {
  tea: Tea;
  relatedTeas: Tea[];
  departmentName: string | null;
}

export function ProductDetailClient({ tea, relatedTeas, departmentName }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>(tea.images?.[0] || tea.image);
  const { toast } = useToast();

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tea.name,
          text: `Check out this tea: ${tea.name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not share the product.',
        })
      }
    } else {
       // Fallback for browsers that don't support the Web Share API
       try {
            await navigator.clipboard.writeText(window.location.href);
            toast({
                title: 'Link Copied!',
                description: 'Product link has been copied to your clipboard.',
            });
       } catch (err) {
            console.error('Failed to copy: ', err);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not copy the link.',
            })
       }
    }
  };
  const displayPrice = tea.salePrice ?? tea.price;

  return (
    <div className="bg-[#353d32] text-white min-h-screen pt-32">
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center text-sm text-neutral-300 mb-8">
                <Link href="/shop" className="hover:text-white">Products</Link>
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="font-medium text-white">{tea.name}</span>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square w-full relative overflow-hidden rounded-xl shadow-md border bg-white">
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
                                className={`aspect-square relative rounded-md overflow-hidden cursor-pointer border-2 bg-white ${activeImage === img ? 'border-amber-300' : 'border-transparent'}`}
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
                        <h1 className="font-headline text-4xl md:text-5xl text-white">{tea.name}</h1>
                        <div className="flex items-center gap-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-500'}`} />
                            ))}
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-sm text-neutral-300">
                             {tea.servingCount && (
                                <div className="flex items-center gap-2">
                                    <Coffee className="w-5 h-5"/>
                                    <span>{tea.servingCount} servings per pack</span>
                                </div>
                             )}
                             {tea.perPackGram && (
                                <div className="flex items-center gap-2">
                                    <ShoppingBag className="w-5 h-5"/>
                                    <span>{tea.perPackGram} grams per pack</span>
                                </div>
                             )}
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="flex items-baseline flex-wrap gap-x-4 gap-y-2 pt-2 w-full">
                                {tea.salePrice ? (
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-2xl text-neutral-400 line-through">Rs {tea.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                        <span className="text-4xl font-bold text-red-500">Rs {tea.salePrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                ) : (
                                    <span className="text-4xl font-bold text-white">Rs {tea.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                )}
                                <Badge className="bg-green-200 text-green-900 border border-green-300">IN STOCK</Badge>
                            </div>
                            <MintPay price={displayPrice}/>
                         </div>
                         <p className="text-sm text-neutral-400">Shipping calculated at checkout.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="flex w-full sm:w-auto items-center border border-neutral-600 rounded-md">
                            <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} className="text-white hover:bg-neutral-700 hover:text-white"><Minus className="w-4 h-4" /></Button>
                            <span className="w-full sm:w-10 text-center font-medium">{quantity}</span>
                            <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)} className="text-white hover:bg-neutral-700 hover:text-white"><Plus className="w-4 h-4" /></Button>
                        </div>
                        <AddToCartButton tea={tea} quantity={quantity} className="flex-grow w-full sm:w-auto bg-white text-black hover:bg-neutral-200" />
                        <Button onClick={handleShare} variant="outline" size="icon" className="border-amber-200/50 text-amber-200/90 hover:bg-amber-500/10 hover:text-amber-200/90 hidden sm:inline-flex" title="Share this product">
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>

                    <Tabs defaultValue="features" className="w-full pt-4">
                        <TabsList className="grid w-full grid-cols-2 bg-neutral-800 text-neutral-300 h-auto sm:h-10">
                            <TabsTrigger value="features" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white whitespace-normal sm:whitespace-nowrap">
                                Tasting Note
                            </TabsTrigger>
                            <TabsTrigger value="ingredients" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">Ingredients</TabsTrigger>
                        </TabsList>
                      <TabsContent value="features" className="p-4 border border-t-0 rounded-b-md bg-[#2a2f28] border-neutral-700 min-h-[200px]">
                        <p className="text-neutral-300 whitespace-pre-line">{tea.tastingNotes || tea.description}</p>
                        <div className="mt-6 space-y-4">
                            <h4 className="font-semibold text-white">Net Weight</h4>
                            <p className="text-neutral-300">{tea.netWeight}</p>
                             <div className="grid grid-cols-2 gap-4">
                                {tea.caffeineLevel && (
                                    <div>
                                        <h4 className="font-semibold text-white mb-2">Caffeine</h4>
                                        <div className="flex items-center gap-2">
                                            <Coffee className="w-5 h-5 text-amber-400" />
                                            <span className="text-neutral-300">{tea.caffeineLevel}</span>
                                        </div>
                                    </div>
                                )}
                                {tea.usageType && (
                                     <div>
                                        <h4 className="font-semibold text-white mb-2">Time of Day</h4>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-5 h-5 text-amber-400" />
                                            <span className="text-neutral-300">{tea.usageType}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="ingredients" className="p-4 border border-t-0 rounded-b-md bg-[#2a2f28] border-neutral-700 min-h-[200px]">
                        <p className="text-neutral-300 whitespace-pre-line">{tea.ingredients || tea.longDescription}</p>
                      </TabsContent>
                    </Tabs>

                </div>
            </div>

            {/* Brewing Info */}
            <div className="mt-16 md:mt-24 text-center bg-[#2a2f28] py-12 rounded-xl border border-neutral-700">
                 <h2 className="font-headline text-3xl md:text-4xl text-white mb-10">Brewing Information</h2>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto px-4">
                    {tea.waterType && (
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                                <Droplets className="w-8 h-8 text-amber-400" />
                            </div>
                            <p className="font-semibold">{tea.waterType}</p>
                        </div>
                    )}
                    {tea.brewTemp && (
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                                <Thermometer className="w-8 h-8 text-amber-400" />
                            </div>
                            <p className="font-semibold">{tea.brewTemp}</p>
                        </div>
                    )}
                    {tea.waterAmount && (
                         <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                                <Users className="w-8 h-8 text-amber-400" />
                            </div>
                            <p className="font-semibold">{tea.waterAmount}</p>
                        </div>
                    )}
                    {tea.brewDuration && (
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                                <Clock className="w-8 h-8 text-amber-400" />
                            </div>
                            <p className="font-semibold">{tea.brewDuration}</p>
                        </div>
                    )}
                 </div>
            </div>

            <ProductReviews tea={tea}/>


            {/* Related Products */}
            {relatedTeas.length > 0 && (
                <div className="mt-16 md:mt-24">
                    <Separator className="my-8 bg-neutral-700" />
                    <h2 className="font-headline text-4xl text-center text-white mb-12">
                        Related Products {departmentName && `from ${departmentName}`}
                    </h2>
                     <Swiper
                        spaceBetween={16}
                        slidesPerView={1.5}
                        className="!px-4"
                        breakpoints={{
                            640: { slidesPerView: 2.5 },
                            768: { slidesPerView: 3.5 },
                            1024: { slidesPerView: 4.5 },
                        }}
                    >
                        {relatedTeas.map((recTea) => (
                            <SwiperSlide key={recTea.id}>
                                <TeaCard tea={recTea} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    </div>
  );
}

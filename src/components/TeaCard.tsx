
'use client';

import type { Tea } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Sparkle, ShoppingBag, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TeaCardProps {
  tea: Tea;
}

export function TeaCard({ tea }: TeaCardProps) {
  const hasSale = tea.salePrice && tea.salePrice < tea.price;
  const discount = hasSale ? Math.round(((tea.price - tea.salePrice!) / tea.price) * 100) : 0;
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(tea);
    toast({
      title: 'Added to Cart',
      description: `${tea.name} has been added to your cart.`,
    });
  };

  return (
    <Link 
        href={`/products/${tea.id}`} 
        className="block group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1 border-neutral-700 bg-[#2a2f28] text-white rounded-lg overflow-hidden">
        <CardHeader className="p-0">
          <div className="aspect-square overflow-hidden relative">
            <Image
              src={tea.image}
              alt={tea.name}
              fill
              className={cn(
                "object-cover transition-opacity duration-300",
                isHovered && tea.hoverImage ? 'opacity-0' : 'opacity-100'
              )}
              data-ai-hint={tea.dataAiHint}
              unoptimized
            />
            {tea.hoverImage && (
                 <Image
                    src={tea.hoverImage}
                    alt={`${tea.name} (Top View)`}
                    fill
                    className={cn(
                        "object-cover transition-opacity duration-300",
                        isHovered ? 'opacity-100' : 'opacity-0'
                    )}
                    data-ai-hint={tea.dataAiHint}
                    unoptimized
                />
            )}
            {hasSale && (
                <Badge variant="destructive" className="absolute top-4 right-4 text-base py-1 px-3 z-10">
                    <Sparkle className="w-4 h-4 mr-1.5" />
                    {discount}% OFF
                </Badge>
            )}
             <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:flex items-end p-4 hidden">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full bg-white/90 text-black hover:bg-white"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </CardHeader>
        <div className="flex flex-col flex-grow">
          <CardContent className="flex-grow p-4">
            <CardTitle className="font-bold text-lg leading-tight line-clamp-2">{tea.name}</CardTitle>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <ShoppingBag className="w-6 h-6 text-neutral-400" />
              <div className="text-right">
                  {hasSale ? (
                      <>
                          <p className="text-sm text-neutral-400 line-through">
                              Rs {tea.price.toFixed(2)}
                          </p>
                          <p className="text-lg font-bold text-red-500">
                              Rs {tea.salePrice!.toFixed(2)}
                          </p>
                      </>
                  ) : (
                      <p className="text-lg font-bold text-white">
                          Rs {tea.price.toFixed(2)}
                      </p>
                  )}
              </div>
          </CardFooter>
        </div>
        <div className="p-4 pt-0 md:hidden">
            <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full bg-white/90 text-black hover:bg-white"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
            </Button>
        </div>
      </Card>
    </Link>
  );
}

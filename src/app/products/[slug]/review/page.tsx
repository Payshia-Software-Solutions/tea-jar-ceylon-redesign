
'use client';

import { useState, useEffect } from 'react';
import type { Tea, ApiProduct } from '@/lib/types';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function WriteReviewPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [tea, setTea] = useState<Tea | null>(null);
  const [loading, setLoading] = useState(true);
  const [newReviewRating, setNewReviewRating] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      if (!slug) return;
      try {
        const response = await fetch(`https://kduserver.payshia.com/products/get-by-slug/${slug}`);
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
            productId: apiProduct.product_id,
            name: apiProduct.product_name.trim(),
            description: apiProduct.product_description || 'A delightful tea from Ceylon.',
            longDescription: apiProduct.how_to_use || '100% Ceylon black tea.',
            price: price,
            salePrice: salePrice,
            image: imageUrl,
            dataAiHint: 'tea product',
            type: 'Black',
            flavorProfile: [],
            origin: 'Sri Lanka',
        };
        
        setTea(formattedProduct);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-[#353d32] text-white min-h-screen flex items-center justify-center pt-32 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="bg-[#2a2f28] border-neutral-700 p-8 w-full">
            <CardHeader className="p-0">
                <Skeleton className="h-8 w-48 mb-6 bg-neutral-700" />
                <div className="flex items-center gap-4">
                    <Skeleton className="w-20 h-20 rounded-md bg-neutral-700" />
                    <div className="space-y-2">
                    <Skeleton className="h-6 w-64 bg-neutral-700" />
                    <Skeleton className="h-4 w-48 bg-neutral-700" />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0 mt-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                    <Skeleton className="h-10 w-full bg-neutral-700" />
                    <Skeleton className="h-10 w-full bg-neutral-700" />
                </div>
                <Skeleton className="h-8 w-1/3 bg-neutral-700" />
                <Skeleton className="h-10 w-full bg-neutral-700" />
                <Skeleton className="h-24 w-full bg-neutral-700" />
                <div className="flex justify-end gap-4 pt-2">
                    <Skeleton className="h-10 w-24 bg-neutral-700" />
                    <Skeleton className="h-10 w-32 bg-neutral-700" />
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!tea) {
    return notFound();
  }

  return (
    <div className="bg-[#353d32] text-white min-h-screen flex items-center justify-center p-4 pt-32 pb-12">
      <Card className="bg-[#2a2f28] border-neutral-700 p-8 rounded-lg w-full max-w-3xl">
        <CardHeader className="p-0">
          <CardTitle className="font-headline text-3xl text-white">Write a review for</CardTitle>
          <div className="flex items-center gap-4 pt-4">
            <Image src={tea.image} alt={tea.name} width={80} height={80} className="rounded-md bg-white p-1" unoptimized />
            <div>
              <h3 className="text-xl font-semibold text-white">{tea.name}</h3>
              <p className="text-neutral-400">Share your thoughts with the community!</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 mt-8 space-y-6">
          <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                  <Input placeholder="Name" className="bg-neutral-800 border-neutral-700 text-white placeholder:text-green-200/50" />
                  <Input type="email" placeholder="Email" className="bg-neutral-800 border-neutral-700 text-white placeholder:text-green-200/50" />
              </div>
              <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-300">Your Rating:</span>
                  <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                          key={star}
                          className={`w-6 h-6 cursor-pointer transition-colors ${newReviewRating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-500 hover:text-yellow-300'}`}
                          onClick={() => setNewReviewRating(star)}
                      />
                      ))}
                  </div>
              </div>
              <Input placeholder="Review Title" className="bg-neutral-800 border-neutral-700 text-white placeholder:text-green-200/50" />
              <Textarea placeholder="Body of Review (1500)" rows={5} className="bg-neutral-800 border-neutral-700 text-white placeholder:text-green-200/50" />
              <div className="flex justify-end gap-4 pt-2">
                  <Link href={`/products/${slug}`}>
                      <Button variant="ghost" className="text-neutral-300 hover:text-white">Cancel</Button>
                  </Link>
                  <Button className="bg-white text-black hover:bg-neutral-200">Submit Review</Button>
              </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

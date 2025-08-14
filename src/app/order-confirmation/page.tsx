
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Package, User, Calendar, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ApiProduct } from '@/lib/types';
import { format } from 'date-fns';

interface Order {
  id: string;
  invoice_number: string;
  invoice_date: string;
  grand_total: string;
  customer_code: string;
  payment_status: string;
}

interface OrderItem {
  id: string;
  product_id: string;
  item_price: string;
  quantity: string;
  product_name?: string;
  product_image?: string;
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setError('Order ID is missing.');
      setLoading(false);
      return;
    }

    async function fetchOrderDetails() {
      setLoading(true);
      setError(null);
      try {
        const [orderRes, itemsRes, productsRes] = await Promise.all([
          fetch(`https://kduserver.payshia.com/invoices/${orderId}`),
          fetch(`https://kduserver.payshia.com/transaction-invoice-items/by-invoice/${orderId}`),
          fetch(`https://kduserver.payshia.com/products`),
        ]);

        if (!orderRes.ok) {
          throw new Error('Failed to fetch order details.');
        }
        if (!itemsRes.ok) {
            throw new Error('Failed to fetch order items.');
        }
        if(!productsRes.ok) {
            throw new Error('Failed to fetch product details.');
        }

        const orderData: Order = await orderRes.json();
        const itemsData: OrderItem[] = await itemsRes.json();
        const productsData: ApiProduct[] = await productsRes.json();

        const productsMap = new Map(productsData.map(p => [p.product_id, p]));

        const itemsWithProductInfo = itemsData.map(item => {
            const product = productsMap.get(item.product_id);
            return {
                ...item,
                product_name: product?.product_name.trim() || 'Unknown Product',
                product_image: product ? `https://kdu-admin.payshia.com/pos-system/assets/images/products/${product.product_id}/${product.image_path}` : 'https://placehold.co/100x100.png'
            }
        });

        setOrder(orderData);
        setItems(itemsWithProductInfo);

      } catch (e: any) {
        setError(e.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    }

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <OrderConfirmationSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>Error: {error}</p>
        <p>Please check the order ID or try again later.</p>
      </div>
    );
  }
  
  if (!order) {
    return (
        <div className="text-center py-20 text-neutral-400">
            <p>No order found.</p>
        </div>
    )
  }

  const subtotal = items.reduce((acc, item) => acc + parseFloat(item.item_price) * parseFloat(item.quantity), 0);

  return (
    <>
      <div className="text-center">
        <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h1 className="text-4xl font-headline text-white">Thank you for your order!</h1>
        <p className="text-neutral-300 mt-2">Your order has been placed successfully.</p>
      </div>

      <Card className="bg-[#2a2f28] border-neutral-700 mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-white">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                <div className="flex items-center gap-3">
                    <Package className="w-6 h-6 text-amber-300/80" />
                    <div>
                        <p className="text-neutral-400">Order Number</p>
                        <p className="font-semibold text-white">{order.invoice_number}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-amber-300/80" />
                    <div>
                        <p className="text-neutral-400">Order Date</p>
                        <p className="font-semibold text-white">{format(new Date(order.invoice_date), 'MMMM dd, yyyy')}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 min-w-0">
                    <Mail className="w-6 h-6 text-amber-300/80 flex-shrink-0" />
                    <div className="min-w-0">
                        <p className="text-neutral-400">Email</p>
                        <p className="font-semibold text-white truncate">{order.customer_code}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <User className="w-6 h-6 text-amber-300/80" />
                    <div>
                        <p className="text-neutral-400">Payment Method</p>
                        <p className="font-semibold text-white">{order.payment_status}</p>
                    </div>
                </div>
            </div>
            
            <Separator className="bg-neutral-700"/>

             <div className="space-y-4">
                {items.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-neutral-700 bg-white">
                            <Image
                            src={item.product_image!}
                            alt={item.product_name!}
                            fill
                            className="object-contain p-1"
                            unoptimized
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-sm text-white">{item.product_name}</h3>
                            <p className="text-xs text-neutral-400">Qty: {parseInt(item.quantity, 10)}</p>
                        </div>
                        <p className="font-medium text-sm text-white">Rs {parseFloat(item.item_price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                ))}
            </div>
            
            <Separator className="bg-neutral-700"/>

            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-neutral-400">Subtotal</span>
                    <span className="font-semibold text-white">Rs {subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-neutral-400">Shipping</span>
                    <span className="font-semibold text-white">Rs 0.00</span>
                </div>
                <Separator className="bg-neutral-700 my-2"/>
                 <div className="flex justify-between text-base font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-white">Rs {parseFloat(order.grand_total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
            </div>

        </CardContent>
      </Card>
      
      <div className="text-center mt-10">
        <Link href="/shop">
          <Button className="bg-white text-black hover:bg-neutral-200">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </>
  );
}


export default function OrderConfirmationPage() {
    return (
        <div className="bg-[#353d32] text-white min-h-screen pt-32 pb-16">
            <div className="container mx-auto px-4 max-w-4xl">
                <Suspense fallback={<OrderConfirmationSkeleton />}>
                    <OrderConfirmationContent />
                </Suspense>
            </div>
        </div>
    )
}

function OrderConfirmationSkeleton() {
    return (
        <>
            <div className="text-center">
                <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4 bg-neutral-700" />
                <Skeleton className="h-10 w-3/4 mx-auto bg-neutral-700" />
                <Skeleton className="h-5 w-1/2 mx-auto mt-3 bg-neutral-700" />
            </div>

            <Card className="bg-[#2a2f28] border-neutral-700 mt-8">
                <CardHeader>
                    <Skeleton className="h-8 w-48 bg-neutral-700" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                           <div key={i} className="flex items-center gap-3">
                                <Skeleton className="w-6 h-6 rounded bg-neutral-700" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24 bg-neutral-700" />
                                    <Skeleton className="h-5 w-32 bg-neutral-700" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <Separator className="bg-neutral-700"/>

                    <div className="space-y-4">
                       {Array.from({ length: 2 }).map((_, i) => (
                         <div key={i} className="flex items-center gap-4">
                            <Skeleton className="h-16 w-16 rounded-lg bg-neutral-700" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-full bg-neutral-700" />
                                <Skeleton className="h-3 w-1/4 bg-neutral-700" />
                            </div>
                            <Skeleton className="h-5 w-20 bg-neutral-700" />
                        </div>
                       ))}
                    </div>

                    <Separator className="bg-neutral-700"/>
                    
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <Skeleton className="h-5 w-24 bg-neutral-700" />
                            <Skeleton className="h-5 w-20 bg-neutral-700" />
                        </div>
                        <div className="flex justify-between">
                            <Skeleton className="h-5 w-20 bg-neutral-700" />
                            <Skeleton className="h-5 w-16 bg-neutral-700" />
                        </div>
                         <Separator className="bg-neutral-700 my-2"/>
                         <div className="flex justify-between">
                            <Skeleton className="h-6 w-16 bg-neutral-700" />
                            <Skeleton className="h-6 w-24 bg-neutral-700" />
                        </div>
                    </div>

                </CardContent>
            </Card>

            <div className="text-center mt-10">
                <Skeleton className="h-11 w-48 mx-auto bg-neutral-700" />
            </div>
        </>
    )
}

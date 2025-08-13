
'use client';

import { useCart } from '@/hooks/use-cart.tsx';
import {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Separator } from './ui/separator';
import Image from 'next/image';
import { Button } from './ui/button';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import Link from 'next/link';

export function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getItemCount } = useCart();
  const itemCount = getItemCount();
  const totalPrice = getTotalPrice();

  return (
    <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg bg-white text-black">
      <SheetHeader className="px-6">
        <SheetTitle className="font-headline text-2xl text-black">
          Shopping Cart ({itemCount})
        </SheetTitle>
      </SheetHeader>
      <Separator className="bg-neutral-200"/>
      {items.length > 0 ? (
        <>
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-6 p-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      data-ai-hint={item.product.dataAiHint}
                      unoptimized
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-headline text-lg text-black">{item.product.name}</h3>
                    {item.product.salePrice ? (
                        <div className="flex items-baseline gap-2">
                           <p className="text-sm text-neutral-500 line-through">
                             Rs {item.product.price.toFixed(2)}
                           </p>
                           <p className="text-sm font-bold text-red-600">
                             Rs {item.product.salePrice.toFixed(2)}
                           </p>
                        </div>
                    ) : (
                         <p className="text-sm font-bold text-neutral-800">
                            Rs {item.product.price.toFixed(2)}
                         </p>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 border-neutral-300 text-black hover:bg-neutral-100"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 border-neutral-300 text-black hover:bg-neutral-100"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-neutral-500 hover:text-red-500"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
          <Separator className="bg-neutral-200"/>
          <SheetFooter className="p-6 bg-neutral-50">
            <div className="w-full space-y-4">
              <div className="flex justify-between text-lg font-bold text-black">
                <span>Subtotal</span>
                <span>Rs {totalPrice.toFixed(2)}</span>
              </div>
              <SheetClose asChild>
                <Link href="/checkout" className="w-full">
                    <Button size="lg" className="w-full bg-black text-white hover:bg-neutral-800">
                        Proceed to Checkout
                    </Button>
                </Link>
              </SheetClose>
            </div>
          </SheetFooter>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-20 w-20 text-neutral-400" strokeWidth={1} />
            <h2 className="font-headline text-2xl font-semibold text-black">Your cart is empty</h2>
            <p className="text-neutral-600">Add some serene teas to get started.</p>
            <SheetClose asChild>
                <Link href="/shop">
                    <Button variant="outline" className="border-neutral-300 text-black hover:bg-neutral-100">Continue Shopping</Button>
                </Link>
            </SheetClose>
        </div>
      )}
    </SheetContent>
  );
}

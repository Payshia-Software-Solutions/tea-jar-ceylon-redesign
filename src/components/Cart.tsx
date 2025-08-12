'use client';

import { useCart } from '@/hooks/use-cart';
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
    <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
      <SheetHeader className="px-6">
        <SheetTitle className="font-headline text-2xl">
          Shopping Cart ({itemCount})
        </SheetTitle>
      </SheetHeader>
      <Separator />
      {items.length > 0 ? (
        <>
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-6 p-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      data-ai-hint={item.product.dataAiHint}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-headline text-lg">{item.product.name}</h3>
                    <p className="text-sm font-bold text-primary">
                      ${item.product.price.toFixed(2)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
          <Separator />
          <SheetFooter className="p-6 bg-secondary/50">
            <div className="w-full space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Proceed to Checkout
              </Button>
            </div>
          </SheetFooter>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-20 w-20 text-muted-foreground/50" strokeWidth={1} />
            <h2 className="font-headline text-2xl font-semibold">Your cart is empty</h2>
            <p className="text-muted-foreground">Add some serene teas to get started.</p>
            <SheetClose asChild>
                <Link href="/">
                    <Button variant="outline">Continue Shopping</Button>
                </Link>
            </SheetClose>
        </div>
      )}
    </SheetContent>
  );
}

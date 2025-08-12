'use client';

import { Leaf, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart.tsx';
import { Sheet, SheetTrigger } from './ui/sheet';
import { Cart } from './Cart';
import { Button } from './ui/button';

export function Header() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <Sheet>
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-7 w-7 text-primary" />
            <span className="font-headline text-2xl font-bold text-primary">Ceylon Calm</span>
          </Link>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-6 w-6 text-foreground" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Open cart</span>
            </Button>
          </SheetTrigger>
        </div>
      </header>
      <Cart />
    </Sheet>
  );
}

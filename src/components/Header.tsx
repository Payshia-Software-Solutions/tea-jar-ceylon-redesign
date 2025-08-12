'use client';

import { Leaf, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart.tsx';
import { Sheet, SheetTrigger } from './ui/sheet';
import { Cart } from './Cart';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(pathname !== '/');

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === '/') {
        if (window.scrollY > window.innerHeight * 0.5) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        setIsVisible(true);
      }
    };
    
    if (pathname === '/') {
        setIsVisible(false);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    } else {
        setIsVisible(true)
    }

  }, [pathname]);

  return (
    <Sheet>
      <header
        className={cn(
          'fixed top-0 z-40 w-full bg-black/80 backdrop-blur-sm border-b border-neutral-800 transition-transform duration-300 ease-in-out',
          {
            'translate-y-0': isVisible,
            '-translate-y-full': !isVisible,
          }
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-7 w-7 text-primary-foreground" />
            <span className="font-headline text-2xl font-bold text-primary-foreground">Ceylon Calm</span>
          </Link>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-6 w-6 text-white" />
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

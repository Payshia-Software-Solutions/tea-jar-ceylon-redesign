
'use client';

import { Leaf, ShoppingCart, Truck, User, Search, Menu } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart.tsx';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Cart } from './Cart';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import Image from 'next/image';
import { Separator } from './ui/separator';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About Us' },
  { href: '/#teas', label: 'Our Teas' },
  { href: '/contact', label: 'Contact Us' },
];

export function Header() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(pathname !== '/');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === '/') {
        if (window.scrollY > 10) { // Show header after a small scroll
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    if (pathname === '/') {
      setIsVisible(false);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsVisible(true);
    }
  }, [pathname]);

  return (
      <header
        className={cn(
          'fixed top-0 z-40 w-full transition-transform duration-500 ease-in-out',
          {
            'translate-y-0': isVisible,
            '-translate-y-full': !isVisible,
          }
        )}
      >
        <div className="bg-[#b91c1c] text-white py-2 text-center text-sm">
          <div className="container mx-auto flex items-center justify-center gap-2">
            <Truck className="h-4 w-4" />
            <span>Enjoy 20% Off &amp; Island wide Free Delivery..!</span>
          </div>
        </div>
        <div className="bg-black text-white">
          <div className="container mx-auto flex h-20 items-center justify-between px-4">
            
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                 <Button variant="ghost" size="icon" className="md:hidden hover:bg-neutral-800">
                    <Menu className="h-6 w-6 text-white" />
                    <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
               <SheetContent side="left" className="bg-black text-white border-neutral-800 p-0">
                 <SheetHeader className="p-6 border-b border-neutral-800">
                    <SheetTitle>
                       <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                            <Image
                                src="https://content-provider.payshia.com/tea-jar/gold-logo.webp"
                                alt="Tea Jar Logo"
                                width={120}
                                height={40}
                                className="object-contain"
                            />
                        </Link>
                    </SheetTitle>
                 </SheetHeader>
                 <div className="p-6">
                    <div className="relative mb-6">
                        <Input
                        type="search"
                        placeholder="Find products"
                        className="bg-neutral-800 border-neutral-700 rounded-full pl-10 h-10 w-full text-white"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    </div>
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <SheetClose asChild key={link.href}>
                                <Link
                                href={link.href}
                                className="text-lg text-neutral-300 hover:text-white transition-colors"
                                >
                                {link.label}
                                </Link>
                            </SheetClose>
                        ))}
                    </nav>
                 </div>
               </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center">
                <Image
                    src="https://content-provider.payshia.com/tea-jar/gold-logo.webp"
                    alt="Tea Jar Logo"
                    width={100}
                    height={30}
                    priority
                    className="object-contain"
                />
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative hidden lg:block">
                <Input
                  type="search"
                  placeholder="Find products"
                  className="bg-neutral-800 border-neutral-700 rounded-full pl-10 h-10 w-56 text-white"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              </div>
              
              <Sheet>
                 <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative hover:bg-neutral-800">
                    <ShoppingCart className="h-6 w-6 text-white" />
                    {itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
                        {itemCount}
                        </span>
                    )}
                    <span className="sr-only">Open cart</span>
                    </Button>
                </SheetTrigger>
                <Cart />
              </Sheet>
              
            </div>
          </div>
        </div>
      </header>
  );
}

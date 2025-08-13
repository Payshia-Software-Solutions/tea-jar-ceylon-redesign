
'use client';

import { Leaf, ShoppingCart, Truck, Search, Menu, ChevronDown, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart.tsx';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Cart } from './Cart';
import { Button } from './ui/button';
import { useEffect, useState, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import type { ApiProduct, Tea } from '@/lib/types';
import { SearchResults } from './SearchResults';
import { useDebounce } from '@/hooks/use-debounce';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

const navMenuData = {
  shop: [
    {
      title: 'Shop Tea',
      links: [
        { text: 'Shop All Teas', href: '/shop' },
        { text: 'Advent Calender', href: '/shop?department=Advent%20Calender' },
      ],
    },
    {
      title: 'Shop By Tea',
      links: [
        { text: 'Black Tea', href: '/shop?section=Black%20Tea' },
        { text: 'Green Tea', href: '/shop?section=Green%20Tea' },
        { text: 'Herbal Tea', href: '/shop?section=Herbal%20Tea' },
      ],
    },
    {
      title: 'Tea Format',
      links: [
        { text: 'Loose Leaf', href: '/shop?category=Loose%20Leaf' },
        { text: 'Tea Bags', href: '/shop?category=Tea%20Bags' },
        { text: 'Luxury Leaf Tea Bags', href: '/shop?category=Luxury%20Leaf%20Tea%20Bags' },
        { text: 'Canisters', href: '/shop?category=Canisters' },
      ],
    },
    {
      title: 'Tea Edits',
      links: [
        { text: 'Special Offers', href: '/shop?department=Special%20Offers' },
        { text: 'Classic Teas', href: '/shop?department=Classic%20Teas' },
        { text: 'Flavored Teas', href: '/shop?department=Flavored%20Teas' },
        { text: 'Exceptional Teas', href: '/shop?department=Exceptional%20Teas' },
        { text: 'Exclusive Teas', href: '/shop?department=Exclusive%20Teas' },
        { text: 'Factory Series', href: '/shop?department=Factory%20Series' },
        { text: 'Artisanal Teas', href: '/shop?department=Artisanal%20Teas' },
        { text: 'Organic Teas', href: '/shop?department=Organic%20Teas' },
        { text: 'Gift', href: '/shop?department=Gift' },
      ],
    },
  ],
  about: [
      { text: 'Tea Jar Story', href: '#' },
      { text: 'Our Tea Heritage', href: '#' },
      { text: 'KDU Group', href: '#' },
  ],
  ourTeas: [
    { text: 'Classic Teas', href: '/shop?department=Classic%20Teas' },
    { text: 'Flavoured Teas', href: '/shop?department=Flavored%20Teas' },
    { text: 'Exceptional Teas', href: '/shop?department=Exceptional%20Teas' },
    { text: 'Exclusive Teas', href: '/shop?department=Exclusive%20Teas' },
    { text: 'Factory Teas', href: '/shop?department=Factory%20Series' },
    { text: 'Organic Teas', href: '/shop?department=Organic%20Teas' },
  ]
};


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
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [searchResults, setSearchResults] = useState<ApiProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);


  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(searchQuery) {
        router.push(`/shop?search=${searchQuery}`);
        closeAllPopups();
    }
  }

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    async function fetchSearchResults() {
      if (debouncedSearchQuery.length < 2) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const response = await fetch('https://kduserver.payshia.com/products');
        const apiProducts: ApiProduct[] = await response.json();
        
        const filteredProducts = apiProducts
          .filter(p => p.product_name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
          .slice(0, 5);

        setSearchResults(filteredProducts);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }

    fetchSearchResults();
  }, [debouncedSearchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === '/') {
        if (window.scrollY > 10) {
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

  const handleMouseEnter = (label: string) => {
    if (['Shop', 'About Us', 'Our Teas'].includes(label)) {
      setActiveMenu(label);
    } else {
      setActiveMenu(null);
    }
  };
  
  const closeAllPopups = () => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
    handleClearSearch();
  };
  
  useEffect(() => {
    if(isMobileSearchOpen || isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
    return () => {
        document.body.style.overflow = '';
    }
  }, [isMobileSearchOpen, isMobileMenuOpen]);

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
            <span>Enjoy 20% Off & Island wide Free Delivery..!</span>
          </div>
        </div>
        <div className="bg-black text-white" onMouseLeave={() => setActiveMenu(null)}>
          <div className="container mx-auto flex h-20 items-center justify-between px-4">
            
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                 <Button variant="ghost" size="icon" className="md:hidden hover:bg-neutral-800">
                    <Menu className="h-6 w-6 text-white" />
                    <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
               <SheetContent side="left" className="bg-black text-white border-neutral-800 p-0 flex flex-col">
                 <SheetHeader className="p-6 border-b border-neutral-800">
                    <SheetTitle>
                       <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                            <Image
                                src="https://content-provider.payshia.com/tea-jar/gold-logo.webp"
                                alt="Tea Jar Logo"
                                width={80}
                                height={28}
                                className="object-contain h-7"
                            />
                        </Link>
                    </SheetTitle>
                 </SheetHeader>
                 <div className="p-6 flex-grow overflow-y-auto">
                    <nav className="flex flex-col gap-1">
                        <SheetClose asChild>
                            <Link href="/" className="text-lg py-2 text-neutral-300 hover:text-white transition-colors">Home</Link>
                        </SheetClose>
                        
                        <Accordion type="multiple" className="w-full text-neutral-300">
                            <AccordionItem value="shop" className="border-none">
                                <AccordionTrigger className="hover:no-underline py-2 text-lg hover:text-white [&[data-state=open]]:text-white">
                                    <Link href="/shop" onClick={(e) => {
                                        e.stopPropagation();
                                        setIsMobileMenuOpen(false);
                                    }}>Shop</Link>
                                </AccordionTrigger>
                                <AccordionContent className="pl-4">
                                   <div className="flex flex-col gap-2 mt-2">
                                       <Accordion type="multiple" className="w-full">
                                            {navMenuData.shop.map(col => (
                                                <div key={col.title}>
                                                    {col.title === 'Shop Tea' ? (
                                                        col.links.map(link => (
                                                            <SheetClose asChild key={link.text}>
                                                                <Link href={link.href} className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors py-2 group">
                                                                    <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-200 transition-colors" />
                                                                    <span>{link.text}</span>
                                                                </Link>
                                                            </SheetClose>
                                                        ))
                                                    ) : (
                                                        <AccordionItem value={col.title} className="border-none">
                                                            <AccordionTrigger className="py-2 hover:no-underline text-neutral-300 hover:text-white">
                                                                {col.title}
                                                            </AccordionTrigger>
                                                            <AccordionContent className="pl-4">
                                                                {col.links.map(link => (
                                                                     <SheetClose asChild key={link.text}>
                                                                        <Link href={link.href} className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors py-2 group">
                                                                            <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-200 transition-colors" />
                                                                            <span>{link.text}</span>
                                                                        </Link>
                                                                    </SheetClose>
                                                                ))}
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    )}
                                                </div>
                                            ))}
                                       </Accordion>
                                   </div>
                                </AccordionContent>
                            </AccordionItem>
                             <AccordionItem value="about" className="border-none">
                                <AccordionTrigger className="hover:no-underline py-2 text-lg hover:text-white [&[data-state=open]]:text-white">
                                    <span>About Us</span>
                                </AccordionTrigger>
                                <AccordionContent className="pl-4">
                                   <div className="flex flex-col gap-2 mt-2">
                                        {navMenuData.about.map(link => (
                                            <SheetClose asChild key={link.text}>
                                                <Link href={link.href} className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors py-2 group">
                                                    <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-200 transition-colors" />
                                                    <span>{link.text}</span>
                                                </Link>
                                            </SheetClose>
                                        ))}
                                   </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="our-teas" className="border-none">
                                <AccordionTrigger className="hover:no-underline py-2 text-lg hover:text-white [&[data-state=open]]:text-white">
                                    <span>Our Teas</span>
                                </AccordionTrigger>
                                <AccordionContent className="pl-4">
                                   <div className="flex flex-col gap-2 mt-2">
                                        {navMenuData.ourTeas.map(link => (
                                            <SheetClose asChild key={link.text}>
                                                <Link href={link.href} className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors py-2 group">
                                                    <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-200 transition-colors" />
                                                    <span>{link.text}</span>
                                                </Link>
                                            </SheetClose>
                                        ))}
                                   </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <SheetClose asChild>
                           <Link href="/contact" className="text-lg py-2 text-neutral-300 hover:text-white transition-colors">Contact Us</Link>
                        </SheetClose>
                    </nav>
                 </div>
               </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center">
                <Image
                    src="https://content-provider.payshia.com/tea-jar/gold-logo.webp"
                    alt="Tea Jar Logo"
                    width={80}
                    height={28}
                    priority
                    className="object-contain h-7"
                />
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(link.label)}
                >
                    <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-white transition-colors flex items-center gap-1"
                    >
                    {link.label}
                    {['Shop', 'About Us', 'Our Teas'].includes(link.label) && <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', activeMenu === link.label ? 'rotate-180' : '')} />}
                    </Link>
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-4">
                <Dialog open={isMobileSearchOpen} onOpenChange={setIsMobileSearchOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative hover:bg-neutral-800 md:hidden">
                            <Search className="h-6 w-6 text-white" />
                            <span className="sr-only">Open search</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-black/80 backdrop-blur-sm text-white p-4 top-1/2 rounded-lg w-[90vw] max-w-md shadow-2xl border-none">
                        <DialogHeader>
                            <DialogTitle>Search for products</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSearchSubmit} className="w-full">
                            <div className="relative" ref={searchRef}>
                                <Input
                                type="search"
                                placeholder="Find products"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-neutral-800 border-neutral-700 rounded-full pl-10 pr-4 h-12 w-full text-white text-base"
                                autoFocus
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                            </div>
                        </form>
                         <div className="relative flex-1 mt-4">
                            <SearchResults
                                results={searchResults}
                                isLoading={isSearching}
                                onClose={closeAllPopups}
                                query={debouncedSearchQuery}
                                isMobile={true}
                            />
                        </div>
                    </DialogContent>
                </Dialog>

                <form onSubmit={handleSearchSubmit}>
                    <div className="relative hidden lg:block" ref={searchRef}>
                        <Input
                        type="search"
                        placeholder="Find products"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-neutral-800 border-neutral-700 rounded-full pl-10 pr-10 h-10 w-72 text-white"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                        {searchQuery && (
                            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full" onClick={handleClearSearch}>
                                <X className="h-4 w-4 text-neutral-400" />
                            </Button>
                        )}
                        <SearchResults
                            results={searchResults}
                            isLoading={isSearching}
                            onClose={closeAllPopups}
                            query={debouncedSearchQuery}
                        />
                    </div>
              </form>
              
              <Sheet>
                 <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative hover:bg-neutral-800">
                    <ShoppingCart className="h-6 w-6 text-white" />
                    {itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-200 text-black text-xs font-bold">
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
            {/* Shop Menu */}
            <div 
                className={cn(
                    "absolute w-full bg-[#2a2f28] text-white shadow-lg transition-all duration-300 ease-in-out",
                    activeMenu === 'Shop' ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                )}
                onMouseEnter={() => setActiveMenu('Shop')}
                onMouseLeave={() => setActiveMenu(null)}
            >
                <div className="container mx-auto px-4 py-8 grid grid-cols-4 gap-8">
                    {navMenuData.shop.map(column => (
                        <div key={column.title}>
                            <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-400 mb-4">{column.title}</h3>
                            <ul className="space-y-2">
                                {column.links.map(link => (
                                    <li key={link.text}>
                                        <Link href={link.href} className="flex items-center gap-2 hover:text-white transition-colors text-base text-neutral-200 group">
                                            <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-200 transition-colors" />
                                            <span>{link.text}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* About Us Menu */}
            <div 
                className={cn(
                    "absolute w-full bg-[#2a2f28] text-white shadow-lg transition-all duration-300 ease-in-out",
                    activeMenu === 'About Us' ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                )}
                 onMouseEnter={() => setActiveMenu('About Us')}
                 onMouseLeave={() => setActiveMenu(null)}
            >
                <div className="container mx-auto px-4 py-6 flex justify-center gap-16">
                    {navMenuData.about.map(item => (
                        <Link key={item.text} href={item.href} className="flex items-center gap-2 hover:text-white transition-colors text-lg font-medium text-neutral-200 group">
                           <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-200 transition-colors" />
                           <span>{item.text}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Our Teas Menu */}
            <div 
                className={cn(
                    "absolute w-full bg-[#2a2f28] text-white shadow-lg transition-all duration-300 ease-in-out",
                    activeMenu === 'Our Teas' ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                )}
                 onMouseEnter={() => setActiveMenu('Our Teas')}
                 onMouseLeave={() => setActiveMenu(null)}
            >
                <div className="container mx-auto px-4 py-8">
                   <div className="grid grid-cols-4 gap-x-8 gap-y-4">
                     {navMenuData.ourTeas.slice(0, 4).map(item => (
                        <Link key={item.text} href={item.href} className="flex items-center gap-2 hover:text-white transition-colors text-lg font-medium text-neutral-200 group justify-center">
                           <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-200 transition-colors" />
                           <span>{item.text}</span>
                        </Link>
                    ))}
                   </div>
                   <div className="grid grid-cols-4 gap-x-8 gap-y-4 mt-4">
                        <div className="col-start-2 flex justify-center">
                             <Link href={navMenuData.ourTeas[4].href} className="flex items-center gap-2 hover:text-white transition-colors text-lg font-medium text-neutral-200 group">
                                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-200 transition-colors" />
                                <span>{navMenuData.ourTeas[4].text}</span>
                            </Link>
                        </div>
                        <div className="flex justify-center">
                             <Link href={navMenuData.ourTeas[5].href} className="flex items-center gap-2 hover:text-white transition-colors text-lg font-medium text-neutral-200 group">
                                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-200 transition-colors" />
                                <span>{navMenuData.ourTeas[5].text}</span>
                            </Link>
                        </div>
                   </div>
                </div>
            </div>
        </div>
      </header>
  );
}

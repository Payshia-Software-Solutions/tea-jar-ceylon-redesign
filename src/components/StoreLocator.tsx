
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Globe, Phone, Clock } from 'lucide-react';

const icons = {
  'Tea Tasting': (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M49.63 29.5c.34-3.8-2.1-7.2-5.4-8.1-.9-.3-1.8-.4-2.7-.4H18.5c-4.4 0-8 3.6-8 8v.1c0 4.4 3.6 8 8 8h24.5c3.5 0 6.5-2.5 7.1-5.9.1-.4.1-.8.1-1.2 0-.2 0-.3-.1-.5z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M57.5 39.2H12.4c-3.8 0-7 3.1-7 7v1.5c0 .8.7 1.5 1.5 1.5h49.2c.8 0 1.5-.7 1.5-1.5v-1.5c0-3.8-3.1-7-7.1-7z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M29.5 21c0-3.3-1.6-6.3-4.1-8.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10"></path>
        <path d="M37.5 21c0-3.3-1.6-6.3-4.1-8.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10"></path>
        <path d="M21.5 21c0-3.3-1.6-6.3-4.1-8.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10"></path>
    </svg>
  ),
  'Factory Visit': (props: React.SVGProps<SVGSVGElement>) => (
     <svg {...props} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M56.5 56.8H7.5V23.7c0-2.2 1.8-4 4-4h41c2.2 0 4 1.8 4 4v33.1z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M11.5 19.7V11c0-2.2 1.8-4 4-4h4c2.2 0 4 1.8 4 4v8.7" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M23.5 19.7V11c0-2.2 1.8-4 4-4h4c2.2 0 4 1.8 4 4v8.7" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M35.5 19.7V11c0-2.2 1.8-4 4-4h4c2.2 0 4 1.8 4 4v8.7" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M7.5 56.8h49" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M21.5 31.7h-6v-6h6v6zM21.5 39.7h-6v-6h6v6zM21.5 47.7h-6v-6h6v6zM31.5 31.7h-6v-6h6v6zM31.5 39.7h-6v-6h6v6zM31.5 47.7h-6v-6h6v6zM41.5 31.7h-6v-6h6v6zM41.5 39.7h-6v-6h6v6zM41.5 47.7h-6v-6h6v6zM51.5 31.7h-6v-6h6v6zM51.5 39.7h-6v-6h6v6zM51.5 47.7h-6v-6h6v6z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
    </svg>
  ),
  'Field Visit': (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32.5 28.5c-6.8 0-12.8 3.5-16.4 8.7-1 1.4-1.9 2.8-2.6 4.3-.8 1.6-1.3 3.3-1.5 5.1-.3 2.5.2 5.1 1.4 7.3 1.1 2 2.8 3.6 4.9 4.6 4.1 2 8.7 2.4 13.2 1.1 5.4-1.6 9.8-5.3 12.3-10.4.7-1.4 1.1-2.9 1.4-4.4.4-2.4.2-4.9-.7-7.2-1.3-3.2-3.7-5.8-6.9-7.3-2.1-.9-4.3-1.4-6.6-1.4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M37.7 27.3c-1-1.3-2.4-2.3-4-2.8l-2.1-10.2c-.2-1.2.7-2.3 1.9-2.5 1.2-.2 2.3.7 2.5 1.9l2 9.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M31.5 28.5c6.8 0 12.8-3.5 16.4-8.7 1-1.4 1.9-2.8 2.6-4.3.8-1.6 1.3-3.3 1.5-5.1.3-2.5-.2-5.1-1.4-7.3-1.1-2-2.8-3.6-4.9-4.6-4.1-2-8.7-2.4-13.2-1.1-5.4-1.6-9.8-5.3-12.3-10.4-.7-1.4-1.1-2.9-1.4-4.4-.4-2.4-.2-4.9.7-7.2 1.3-3.2 3.7-5.8 6.9-7.3 2.1-.9 4.3-1.4 6.6-1.4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M26.3 27.3c1-1.3 2.4-2.3 4-2.8l2.1-10.2c.2-1.2-.7-2.3-1.9-2.5-1.2-.2-2.3.7-2.5 1.9l-2 9.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  ),
  'Retail': (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.5 22.5L25.3 9.4c.5-1 1.5-1.6 2.6-1.6h7.2c1.1 0 2.1.6 2.6 1.6l6.8 13.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M49.5 56.5h-35c-2.2 0-4-1.8-4-4V22.4c0-2.2 1.8-4 4-4h35c2.2 0 4 1.8 4 4v30.1c0 2.2-1.8 4-4 4z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M21.5 30.5c2.3-1.4 5-2.2 7.8-2.2s5.5.8 7.8 2.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10"></path>
    </svg>
  ),
  'Gem & Jewellery': (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 55.5L9.2 29.3c-.9-1.1-1.4-2.5-1.4-4 0-3.9 3.2-7.1 7.1-7.1.9 0 1.8.2 2.6.5 2.1.9 3.9 2.6 4.9 4.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M32 55.5l22.8-26.2c.9-1.1 1.4-2.5 1.4-4 0-3.9-3.2-7.1-7.1-7.1-.9 0-1.8.2-2.6.5-2.1.9-3.9 2.6-4.9 4.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M22.4 23.2L32 11.5l9.6 11.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M10.5 8.5l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M53.5 8.5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M32 5.5v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  ),
  'Dining': (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M37.5 56.4c0 .8-.7 1.5-1.5 1.5h-8.1c-.8 0-1.5-.7-1.5-1.5V36.3c0-.8.7-1.5 1.5-1.5h8.1c.8 0 1.5.7 1.5 1.5v20.1z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M46.5 34.8H17.4c-2.2 0-4-1.8-4-4V12.3c0-2.2 1.8-4 4-4h29.1c2.2 0 4 1.8 4 4v18.5c.1 2.2-1.7 4-3.9 4z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M48.5 18.8h-4c-1.1 0-2-.9-2-2V8.4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v8.4c0 1.1-.9 2-2 2z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M26.5 24.8v-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10"></path>
    </svg>
  ),
  'Create Own Tea': (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50.6 30.6c.3-3.8-2.2-7.2-5.5-8.1-.9-.3-1.8-.4-2.8-.4H19.5c-4.4 0-8 3.6-8 8v.1c0 4.4 3.6 8 8 8h25.5c3.5 0 6.5-2.5 7.1-5.9.1-.4.1-.8.1-1.2 0-.2 0-.3-.1-.5z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M58.5 40.3H13.4c-3.8 0-7 3.1-7 7v1.5c0 .8.7 1.5 1.5 1.5h49.2c.8 0 1.5-.7 1.5-1.5v-1.5c0-3.8-3.1-7-7.1-7z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M30.5 22.1c0-3.3-1.6-6.3-4.1-8.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10"></path>
        <path d="M38.5 22.1c0-3.3-1.6-6.3-4.1-8.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10"></path>
        <path d="M22.5 22.1c0-3.3-1.6-6.3-4.1-8.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10"></path>
    </svg>
  ),
  'Personal Gift Wrapping': (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M49.5 56.5h-35c-2.2 0-4-1.8-4-4V22.4c0-2.2 1.8-4 4-4h35c2.2 0 4 1.8 4 4v30.1c0 2.2-1.8 4-4 4z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M32 56.5V18.4" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M53.5 28.5H10.5" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M32 18.4c-5.7 0-10.7-4.4-11.8-10C19.6 5.2 22.4 2.5 26 2.5c2.9 0 5.5 1.7 6.8 4.2 1.3-2.5 3.9-4.2 6.8-4.2 3.6 0 6.5 2.7 5.8 5.9-1.1 5.6-6.1 10-11.8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  ),
  'Afternoon Tea': (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 24.1c0-3.3 2.7-6 6-6h27c3.3 0 6 2.7 6 6v1H12.5v-1z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M48.5 25.1H15.4c-1.7 0-3 1.3-3 3v13.5c0 1.7 1.3 3 3 3h33.1c1.7 0 3-1.3 3-3V28.1c0-1.7-1.4-3-3.1-3z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M29.5 44.6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10"></path>
        <path d="M38.5 50.6h-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10"></path>
        <path d="M24.5 9.1c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10"></path>
    </svg>
  ),
};

type Activity = keyof typeof icons;

const stores = [
  {
    id: 'ratnapura',
    name: 'Tea Jar Lounge',
    location: 'Ratnapura',
    bgImage: 'https://placehold.co/1920x1080.png',
    dataAiHint: 'tea lounge luxury',
    description: "WELCOME TO OUR FLAGSHIP TEA JAR LOUNGE IN RATNAPURA. THE PERFECT PLACE TO EXPERIENCE AUTHENTIC CEYLON TEA. HERE, YOU CAN PURCHASE OUR EXCLUSIVE TEA COLLECTIONS, EXPLORE A CURATED SELECTION OF GEMS AND JEWELRY, AND GATHER WITH LOVED ONES TO CELEBRATE YOUR SPECIAL MOMENTS ALONGSIDE OUR PREMIUM TEAS. ENJOY AN EXTENSIVE FOOD AND BEVERAGE MENU AND TAKE A JOURNEY THROUGH OUR MINI MUSEUM, WHICH SHOWCASES THE RICH HERITAGE OF CEYLON TEA. TEA JAR LOUNGE OFFERS MORE THAN JUST TEA—IT'S A DESTINATION TO CONNECT, CELEBRATE, AND DISCOVER THE TRUE ESSENCE OF CEYLON TEA CULTURE.",
    address: 'No. 25, Main Street, Ratnapura, Sri Lanka',
    website: 'www.teajarlounge.com',
    phone: '(+94) 45 222 3333',
    hours: '9:00 AM - 10:00 PM',
    images: [
      'https://placehold.co/400x300.png',
      'https://placehold.co/400x300.png',
      'https://placehold.co/400x300.png'
    ],
    activities: ['Tea Tasting', 'Dining', 'Retail', 'Gem & Jewellery', 'Afternoon Tea', 'Create Own Tea', 'Personal Gift Wrapping'] as Activity[],
  },
  {
    id: 'colombo',
    name: 'Tea Jar Lounge',
    location: 'Colombo',
    bgImage: 'https://placehold.co/1920x1080.png',
    dataAiHint: 'modern tea shop',
    description: "Located in the heart of Colombo, Tea Jar Express offers a modern tea experience. Perfect for a quick stop, it features a curated selection of our finest teas and a range of delicious pastries. Whether you're commuting or shopping, it's the ideal spot to recharge with a perfect cup of Ceylon tea.",
    address: '123 Galle Road, Colombo 03, Sri Lanka',
    website: 'www.teajarlounge.com',
    phone: '(+94) 11 222 4444',
    hours: '10:00 AM - 9:00 PM',
    images: [
      'https://placehold.co/400x300.png',
      'https://placehold.co/400x300.png',
      'https://placehold.co/400x300.png'
    ],
    activities: ['Tea Tasting', 'Dining', 'Retail', 'Afternoon Tea'] as Activity[],
  },
  {
    id: 'weerawila',
    name: 'Tea Jar by the Lake',
    location: 'Weerawila',
    bgImage: 'https://placehold.co/1920x1080.png',
    dataAiHint: 'lake view tea shop',
    description: "Enjoy stunning lakeside views at our Weerawila location. This serene spot is perfect for enjoying a peaceful cup of tea while surrounded by nature's beauty. We offer a full range of our exclusive tea collections and a delightful menu of light bites.",
    address: '456 Lake Road, Weerawila, Sri Lanka',
    website: 'www.teajarbythelake.com',
    phone: '(+94) 47 222 5555',
    hours: '8:00 AM - 7:00 PM',
    images: [
      'https://placehold.co/400x300.png',
      'https://placehold.co/400x300.png',
      'https://placehold.co/400x300.png'
    ],
    activities: ['Tea Tasting', 'Dining', 'Afternoon Tea', 'Field Visit'] as Activity[],
  },
    {
    id: 'ella',
    name: 'Tea Jar Boutique',
    location: 'Ella',
    bgImage: 'https://placehold.co/1920x1080.png',
    dataAiHint: 'boutique tea store',
    description: "Our charming boutique in the scenic town of Ella is a treasure trove for tea lovers. Browse our extensive collection of packaged teas to take home, along with unique tea accessories and gifts. Our knowledgeable staff are on hand to help you find your perfect blend.",
    address: '789 Main Street, Ella, Sri Lanka',
    website: 'www.teajarella.com',
    phone: '(+94) 57 222 6666',
    hours: '9:00 AM - 8:00 PM',
    images: [
      'https://placehold.co/400x300.png',
      'https://placehold.co/400x300.png',
      'https://placehold.co/400x300.png'
    ],
    activities: ['Retail', 'Personal Gift Wrapping'] as Activity[],
  },
  {
    id: 'galle',
    name: 'Tea Jar Boutique',
    location: 'Galle',
    bgImage: 'https://placehold.co/1920x1080.png',
    dataAiHint: 'historic tea boutique',
    description: "Nestled within the historic Galle Fort, our boutique offers a unique tea experience amidst colonial charm. Discover our exclusive tea collections, fine porcelain, and curated gifts. A perfect stop to immerse yourself in the rich history and flavour of Ceylon tea.",
    address: '42 Lighthouse Street, Galle Fort, Sri Lanka',
    website: 'www.teajargalle.com',
    phone: '(+94) 91 222 7777',
    hours: '10:00 AM - 7:00 PM',
    images: [
      'https://placehold.co/400x300.png',
      'https://placehold.co/400x300.png',
      'https://placehold.co/400x300.png'
    ],
    activities: ['Retail', 'Personal Gift Wrapping', 'Tea Tasting'] as Activity[],
  }
];

export function StoreLocator() {
  const [selectedStore, setSelectedStore] = useState(stores[0]);

  return (
    <section className="relative w-full text-white overflow-hidden py-20 bg-[#2a2f28]">
      <div className="absolute inset-0 w-full h-full transition-opacity duration-1000">
        <Image
          key={selectedStore.id}
          src={selectedStore.bgImage}
          alt={selectedStore.name}
          fill
          className="object-cover animate-fade-in opacity-20"
          data-ai-hint={selectedStore.dataAiHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a2f28] via-[#2a2f28]/50 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 z-10">
        <div className="text-center mb-12">
            <h2 className="font-headline text-5xl text-white">Find Your Nearest Store</h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column: Store List */}
            <div className="lg:col-span-1">
                <div className="space-y-4">
                {stores.map((store) => (
                    <div 
                        key={store.id}
                        className={cn(
                            "p-1 cursor-pointer group rounded-xl transition-all",
                            selectedStore.id === store.id ? "ring-2 ring-amber-200/80" : "ring-2 ring-transparent"
                        )}
                        onClick={() => setSelectedStore(store)}
                    >
                    <Card className="bg-black/30 backdrop-blur-sm border-neutral-700/50 rounded-lg overflow-hidden transition-all duration-300 group-hover:border-amber-200/50">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                                <Image 
                                    src={store.images[0]} 
                                    alt={store.location} 
                                    fill 
                                    className="object-cover" 
                                    data-ai-hint="tea store facade" 
                                />
                            </div>
                            <div>
                                <h4 className="font-headline text-xl text-white">{store.name}</h4>
                                <p className="text-amber-100/90">{store.location}</p>
                            </div>
                        </CardContent>
                    </Card>
                    </div>
                ))}
                </div>
            </div>

            {/* Right Column: Store Details */}
            <div className="lg:col-span-2">
                 <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <Card className="bg-black/30 backdrop-blur-sm border-neutral-700/50 rounded-lg overflow-hidden h-full flex flex-col">
                        <CardContent className="p-8 space-y-6 flex-grow">
                            <div>
                                <h3 className="font-headline text-4xl text-white mb-2">{selectedStore.name}</h3>
                                <p className="text-lg font-semibold text-amber-100/90">{selectedStore.location}</p>
                            </div>
                            <p className="text-neutral-300 leading-relaxed font-secondary text-sm">
                                {selectedStore.description}
                            </p>
                            <div className="grid sm:grid-cols-1 gap-y-4 text-sm pt-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 mt-1 text-amber-200/80 flex-shrink-0"/>
                                    <span>{selectedStore.address}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Globe className="w-5 h-5 mt-1 text-amber-200/80 flex-shrink-0"/>
                                    <a href={`http://${selectedStore.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{selectedStore.website}</a>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 mt-1 text-amber-200/80 flex-shrink-0"/>
                                    <span>{selectedStore.phone}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 mt-1 text-amber-200/80 flex-shrink-0"/>
                                    <span>{selectedStore.hours}</span>
                                </div>
                            </div>
                        </CardContent>
                        {selectedStore.activities && selectedStore.activities.length > 0 && (
                        <div className="p-8 border-t border-neutral-700/50">
                            <h4 className="font-headline text-2xl text-white mb-4">Things to Do</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6">
                                {selectedStore.activities.map(activity => {
                                    const Icon = icons[activity];
                                    return (
                                        <div key={activity} className="flex flex-col items-center text-center gap-2">
                                            <Icon className="w-10 h-10 text-amber-200/80" />
                                            <span className="text-xs font-medium tracking-wide uppercase">{activity.split(' ').slice(0,2).join(' ')}</span>
                                            {activity.split(' ').length > 2 && <span className="text-xs font-medium tracking-wide uppercase">{activity.split(' ').slice(2).join(' ')}</span>}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        )}
                    </Card>
                
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                        <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
                            <Image src={selectedStore.images[0]} alt={`${selectedStore.name} gallery image 1`} fill className="object-cover transition-all duration-500 ease-in-out hover:scale-105" data-ai-hint="tea lounge interior"/>
                        </div>
                        <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
                            <Image src={selectedStore.images[1]} alt={`${selectedStore.name} gallery image 2`} fill className="object-cover transition-all duration-500 ease-in-out hover:scale-105" data-ai-hint="tea selection display"/>
                        </div>
                        </div>
                        <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
                            <Image src={selectedStore.images[2]} alt={`${selectedStore.name} gallery image 3`} fill className="object-cover transition-all duration-500 ease-in-out hover:scale-105" data-ai-hint="gourmet food pastry"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}

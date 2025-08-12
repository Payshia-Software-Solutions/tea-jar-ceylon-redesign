
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Globe, Phone, Clock } from 'lucide-react';

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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
                    <Card className="bg-black/30 backdrop-blur-sm border-neutral-700/50 rounded-lg overflow-hidden h-full">
                    <CardContent className="p-8 space-y-6">
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

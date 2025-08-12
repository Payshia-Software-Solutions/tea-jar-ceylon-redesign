
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
    name: 'Tea Jar Express',
    location: 'Colombo',
    bgImage: 'https://placehold.co/1920x1080.png',
    dataAiHint: 'modern tea shop',
    description: "Located in the heart of Colombo, Tea Jar Express offers a modern tea experience. Perfect for a quick stop, it features a curated selection of our finest teas and a range of delicious pastries. Whether you're commuting or shopping, it's the ideal spot to recharge with a perfect cup of Ceylon tea.",
    address: '123 Galle Road, Colombo 03, Sri Lanka',
    website: 'www.teajarexpress.com',
    phone: '(+94) 11 222 4444',
    hours: '7:00 AM - 8:00 PM',
    images: [
      'https://placehold.co/400x300.png',
      'https://placehold.co/400x300.png',
      'https://placehold.co/400x300.png'
    ]
  },
  // Add more stores here
];

export function StoreLocator() {
  const [selectedStore, setSelectedStore] = useState(stores[0]);

  return (
    <section className="relative w-full text-white overflow-hidden">
      <div className="absolute inset-0 w-full h-full transition-opacity duration-1000">
        <Image
          key={selectedStore.id}
          src={selectedStore.bgImage}
          alt={selectedStore.name}
          fill
          className="object-cover animate-fade-in"
          data-ai-hint={selectedStore.dataAiHint}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative container mx-auto px-4 py-20 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="font-headline text-5xl text-white">Find Your Nearest Store</h2>
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg">
                <div className="flex flex-wrap gap-4">
                {stores.map((store) => (
                    <Button
                    key={store.id}
                    variant={selectedStore.id === store.id ? 'secondary' : 'outline'}
                    className={cn(
                        "transition-all",
                        selectedStore.id === store.id 
                            ? 'bg-white/90 text-black' 
                            : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                    )}
                    onClick={() => setSelectedStore(store)}
                    >
                    {store.location}
                    </Button>
                ))}
                </div>
            </div>
            <Card className="bg-black/30 backdrop-blur-sm border-neutral-700/50 rounded-lg overflow-hidden">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="font-headline text-4xl text-white mb-2">{selectedStore.name}</h3>
                  <p className="text-lg font-semibold text-amber-100/90">{selectedStore.location}</p>
                </div>
                <p className="text-neutral-300 leading-relaxed font-secondary">
                  {selectedStore.description}
                </p>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm pt-4">
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
          </div>
          <div className="space-y-4 hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
                <Image src={selectedStore.images[0]} alt={`${selectedStore.name} gallery image 1`} fill className="object-cover" data-ai-hint="tea lounge interior"/>
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
                <Image src={selectedStore.images[1]} alt={`${selectedStore.name} gallery image 2`} fill className="object-cover" data-ai-hint="tea selection display"/>
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                <Image src={selectedStore.images[2]} alt={`${selectedStore.name} gallery image 3`} fill className="object-cover" data-ai-hint="gourmet food pastry"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Add this to your globals.css or a style tag
const styles = `
@keyframes fade-in {
  from { opacity: 0.8; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fade-in 1s ease-in-out;
}
`;
// You can either add a <style>{styles}</style> to the component, or add the keyframes and class to globals.css
// For this example, I am assuming you will add it to globals.css

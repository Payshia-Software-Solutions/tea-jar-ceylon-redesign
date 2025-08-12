
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { teas } from '@/lib/tea-data';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf } from 'lucide-react';

const collections = [
  {
    name: 'Classic',
    teas: ['Ceylon Supreme', 'Earl Grey Reserve'],
  },
  {
    name: 'Flavoured',
    teas: ['Spiced Chai'],
  },
  {
    name: 'Exceptional',
    teas: ['Jasmine Pearls'],
  },
  {
    name: 'Exclusive',
    teas: ['Golden Oolong', 'White Peony'],
  },
  {
    name: 'Organic',
    teas: ['Emerald Green'],
  },
];

export function RecommendedCollections() {
  return (
    <section className="bg-[#2f3d2f] text-white">
      <div className="grid md:grid-cols-2">
        <div className="relative min-h-[400px] md:min-h-[600px]">
          <Image
            src="https://placehold.co/800x600.png"
            alt="Person holding a box of English Breakfast Tea"
            fill
            className="object-cover"
            data-ai-hint="tea box lifestyle"
          />
           <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <h2 className="font-headline text-4xl mb-8">Recommended Collections</h2>
          <Tabs defaultValue="Classic" className="flex flex-col md:flex-row gap-8" orientation="vertical">
            <TabsList className="bg-transparent flex-shrink-0 items-start p-0">
                <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-visible">
                    {collections.map((collection) => (
                        <TabsTrigger
                            key={collection.name}
                            value={collection.name}
                            className="text-neutral-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:shadow-none text-lg text-left justify-start p-2 whitespace-nowrap"
                        >
                            {collection.name}
                        </TabsTrigger>
                    ))}
                </div>
            </TabsList>
            <div className="w-px bg-neutral-600 hidden md:block" />
            <div className="flex-grow">
              {collections.map((collection) => (
                <TabsContent key={collection.name} value={collection.name} className="mt-0">
                  <div className="space-y-6">
                    {teas
                      .filter((tea) => collection.teas.includes(tea.name))
                      .map((tea) => (
                        <Link href={`/tea/${tea.id}`} key={tea.id} className="flex items-center justify-between group">
                          <span className="text-xl font-headline group-hover:text-amber-100 transition-colors">
                            {tea.name}
                          </span>
                          <Leaf className="w-5 h-5 text-neutral-500 group-hover:text-amber-100 transition-colors" />
                        </Link>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

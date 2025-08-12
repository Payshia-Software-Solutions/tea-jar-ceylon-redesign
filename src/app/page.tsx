
'use client';

import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { teas } from '@/lib/tea-data';
import { TeaCard } from '@/components/TeaCard';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function Home() {

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-0 w-full h-full object-cover"
        >
          <source src="https://teajarceylon.com/assets/videos/TeaJar_HERO_V1-2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white p-4">
          <Image
            src="https://content-provider.payshia.com/tea-jar/white-logo.png"
            alt="Tea Jar Logo"
            width={400}
            height={150}
            priority
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>

      <div className="relative bg-[#2a2f28]">
        <div className="absolute -bottom-24 md:-bottom-32 left-1/2 -translate-x-1/2 z-10 w-48 md:w-auto">
            <Image
                src="https://content-provider.payshia.com/tea-jar/tea-cup-w-optimized.webp"
                alt="Glass teacup with saucer"
                width={300}
                height={267}
                className="object-contain"
            />
        </div>
      </div>
      
      <div className="bg-[#2a2f28] text-white pt-36 pb-20 relative">
        
        <div className="container mx-auto px-4 text-center flex flex-col items-center">
            <h2 className="font-headline text-4xl mb-6">Our Journey</h2>
            <p className="max-w-4xl text-neutral-300 leading-relaxed tracking-wider mb-12">
                SINCE 1978, TEA JAR HAS BEEN DEDICATED TO CRAFTING THE FINEST CEYLON TEAS, FROM CLASSIC BLACK TO EXQUISITE FLAVORS. BACKED BY THE K.D.U. GROUP, WE COMBINE OVER 30 YEARS OF EXPERTISE WITH TRADITIONAL CRAFTSMANSHIP AND MODERN INNOVATION, DELIVERING EXCEPTIONAL QUALITY THAT DELIGHTS TEA LOVERS AROUND THE WORLD.
            </p>
        </div>
      </div>

      <section className="bg-[#3a4f3a] py-20 text-white">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-4xl text-center mb-12">Shop Our Best Selling Products</h2>
        </div>
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1">
              {teas.slice(0, 5).map((tea) => (
                <CarouselItem key={tea.id} className="pl-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                   <div className="p-1">
                    <TeaCard tea={tea} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-white left-4"/>
            <CarouselNext className="text-white right-4"/>
          </Carousel>
          <div className="text-center mt-12">
            <Button variant="outline">Shop More</Button>
          </div>
      </section>
    </>
  );
}

'use client';

import { TeaCard } from '@/components/TeaCard';
import { teas } from '@/lib/tea-data';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
          <button
            onClick={scrollToContent}
            className="absolute bottom-12 animate-bounce"
            aria-label="Scroll down"
          >
            <ArrowDown className="h-10 w-10 text-white" />
          </button>
        </div>
      </div>

      <div ref={contentRef} className="bg-[#2a2f28] text-white">
        <div className="container mx-auto px-4 py-12">
            <header className="text-center mb-12 pt-8">
            <h1 className="font-headline text-5xl font-bold text-primary-foreground mb-2">Explore Our Teas</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover the rich heritage and exquisite flavors of Ceylon, captured in every cup.
            </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teas.map((tea) => (
                <TeaCard key={tea.id} tea={tea} />
            ))}
            </div>
        </div>
      </div>
    </>
  );
}

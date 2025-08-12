'use client';

import { TeaCard } from '@/components/TeaCard';
import { teas } from '@/lib/tea-data';
import { ArrowDown } from 'lucide-react';
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
          <h1 className="font-headline text-6xl md:text-8xl font-bold mb-4 drop-shadow-lg">
            Our Journey
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-neutral-200 drop-shadow-md">
            Since 1978, Tea Jar has been dedicated to crafting the finest Ceylon teas. From classic black to exquisite flavors, we combine over 30 years of expertise with traditional craftsmanship and modern innovation, delivering exceptional quality that delights tea lovers around the world.
          </p>
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

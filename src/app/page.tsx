
'use client';

import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

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
      
      <div className="bg-[#2a2f28] text-white pt-36 pb-20 relative">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 z-10">
            <Image
                src="https://content-provider.payshia.com/tea-jar/tea-cup-w-optimized.webp"
                alt="Glass teacup with saucer"
                width={400}
                height={267}
                className="object-contain"
            />
        </div>
        <div className="container mx-auto px-4 text-center flex flex-col items-center">
            <h2 className="font-headline text-4xl mb-6">Our Journey</h2>
            <p className="max-w-4xl text-neutral-300 leading-relaxed tracking-wider mb-12">
                SINCE 1978, TEA JAR HAS BEEN DEDICATED TO CRAFTING THE FINEST CEYLON TEAS, FROM CLASSIC BLACK TO EXQUISITE FLAVORS. BACKED BY THE K.D.U. GROUP, WE COMBINE OVER 30 YEARS OF EXPERTISE WITH TRADITIONAL CRAFTSMANSHIP AND MODERN INNOVATION, DELIVERING EXCEPTIONAL QUALITY THAT DELIGHTS TEA LOVERS AROUND THE WORLD.
            </p>
            <button
                onClick={() => window.scrollTo({ top: window.scrollY + 500, behavior: 'smooth' })}
                className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center animate-bounce"
                aria-label="Scroll down further"
            >
                <ArrowDown className="h-6 w-6" />
            </button>
        </div>
      </div>
    </>
  );
}

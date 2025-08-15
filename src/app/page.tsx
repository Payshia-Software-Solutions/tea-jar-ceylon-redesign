
'use client';

import Image from 'next/image';
import { Products } from '@/components/Products';
import { RecommendedCollections } from '@/components/RecommendedCollections';
import { StoreLocator } from '@/components/StoreLocator';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Faq } from '@/components/Faq';
import { SubscriptionModal } from '@/components/SubscriptionModal';


export default function Home() {
  const [logoVisible, setLogoVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SubscriptionModal />
      <div className="relative h-screen w-full overflow-hidden bg-[#eafde9]">
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
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white p-4">
          <Image
            src="http://content-provider.payshia.com/tea-jar/white-logo.png"
            alt="Tea Jar Logo"
            width={400}
            height={150}
            priority
            className={cn(
                "object-contain drop-shadow-lg transition-opacity duration-1000 w-[250px] md:w-[400px]",
                logoVisible ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
      </div>

      <div className="relative bg-[#2a2f28]">
        <div className="absolute -bottom-16 md:-bottom-24 left-1/2 -translate-x-1/2 z-10 w-48 md:w-auto">
            <Image
                src="https://content-provider.payshia.com/tea-jar/tea-cup-w-optimized.webp"
                alt="Glass teacup with saucer"
                width={300}
                height={267}
                className="object-contain"
            />
        </div>
      </div>
      
      <div className="bg-[#2a2f28] text-white pt-24 md:pt-36 pb-12 md:pb-20 relative">
        
        <div className="container mx-auto px-4 text-center flex flex-col items-center">
            <h2 className="font-headline text-3xl md:text-4xl mb-4 md:mb-6">Our Journey</h2>
            <p className="max-w-4xl text-neutral-300 leading-relaxed tracking-wider mb-8 md:mb-12 text-sm md:text-base">
                SINCE 1978, TEA JAR HAS BEEN DEDICATED TO CRAFTING THE FINEST CEYLON TEAS, FROM CLASSIC BLACK TO EXQUISITE FLAVORS. BACKED BY THE K.D.U. GROUP, WE COMBINE OVER 30 YEARS OF EXPERTISE WITH TRADITIONAL CRAFTSMANSHIP AND MODERN INNOVATION, DELIVERING EXCEPTIONAL QUALITY THAT DELIGHTS TEA LOVERS AROUND THE WORLD.
            </p>
        </div>
      </div>

      <Products />

      <div className="bg-[#2a2f28] text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center flex flex-col items-center">
            <h2 className="font-headline text-3xl md:text-4xl mb-8 md:mb-12">Finest Ceylon Tea</h2>
            <Image
                src="https://content-provider.payshia.com/tea-jar/premium-quality-seal.webp"
                alt="Premium Quality Guaranteed"
                width={120}
                height={120}
                className="object-contain mb-6 md:mb-8"
            />
            <p className="max-w-4xl text-neutral-200 leading-loose tracking-wider mb-12 md:mb-16 font-secondary text-base md:text-lg">
                Our single-origin Ceylon teas are ethically sourced and crafted to ensure factory-fresh quality, reflecting the rich heritage and values of Ceylon tea. Enjoy the true essence of Ceylon tea with Tea Jar.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-4xl">
                <div className="flex flex-col items-center gap-4">
                    <Image src="https://content-provider.payshia.com/tea-jar/ethically-grown.webp" alt="Ethically Grown" width={80} height={80} className="object-contain" />
                    <h3 className="font-headline text-xl text-neutral-100">Ethically Grown</h3>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <Image src="https://content-provider.payshia.com/tea-jar/hand-picked.webp" alt="Hand Picked" width={80} height={80} className="object-contain" />
                    <h3 className="font-headline text-xl text-neutral-100">Hand Picked</h3>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <Image src="https://content-provider.payshia.com/tea-jar/factory-fresh.webp" alt="Factory Fresh" width={80} height={80} className="object-contain" />
                    <h3 className="font-headline text-xl text-neutral-100">Factory Fresh</h3>
                </div>
            </div>
        </div>
      </div>

      <RecommendedCollections />

      <div className="bg-[#2a2f28] text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center flex flex-col items-center">
          <p className="font-handwritten-alt text-2xl md:text-4xl max-w-4xl leading-relaxed relative text-amber-100/90">
            <span className="absolute -top-4 left-0 text-6xl opacity-50">&ldquo;</span>
            Sri Lanka&apos;s iconic Ceylon tea, gifted from generation to generation. Two of the freshest leaves and bud are handpicked and manufactured at the state of the art tea factories in Sri Lanka. Mastering the art of world renowned, origin Ceylon tea since 1978.
            <span className="absolute -bottom-8 right-0 text-6xl opacity-50">&rdquo;</span>
          </p>
          <div className="mt-16 text-center">
            <p className="text-sm tracking-widest text-neutral-400">FROM US AND OURS,</p>
            <p className="text-sm tracking-widest text-neutral-400">TO YOU AND YOURS</p>
            <Image 
                src="https://content-provider.payshia.com/tea-jar/gold-chairman-sign.webp"
                alt="Founder's Signature"
                width={80}
                height={50}
                className="mx-auto my-4"
            />
            <p className="text-xs tracking-widest text-neutral-400">FOUNDER, SAMAN UPASENA</p>
          </div>
        </div>
      </div>

      <StoreLocator />
      <Faq />
    </>
  );
}

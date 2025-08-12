
'use client';

import Image from 'next/image';
import { Products } from '@/components/Products';


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

      <div className="bg-[#3a4f3a] text-white py-20">
        <div className="container mx-auto px-4 text-center flex flex-col items-center">
            <Image
                src="https://content-provider.payshia.com/tea-jar/premium-quality-seal.png"
                alt="Premium Quality Guaranteed"
                width={120}
                height={120}
                className="object-contain mb-8"
            />
            <p className="max-w-4xl text-neutral-200 leading-loose tracking-wider mb-16 font-secondary text-lg">
                OUR SINGLE-ORIGIN CEYLON TEAS ARE ETHICALLY SOURCED AND CRAFTED TO ENSURE FACTORY-FRESH QUALITY, REFLECTING THE RICH HERITAGE AND VALUES OF CEYLON TEA. ENJOY THE TRUE ESSENCE OF CEYLON TEA WITH TEA JAR.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-3xl">
                <div className="flex flex-col items-center gap-4">
                    <Image src="https://content-provider.payshia.com/tea-jar/ethically-grown.png" alt="Ethically Grown" width={80} height={80} className="object-contain" />
                    <h3 className="font-headline text-xl text-neutral-100">Ethically Grown</h3>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <Image src="https://content-provider.payshia.com/tea-jar/hand-picked.png" alt="Hand Picked" width={80} height={80} className="object-contain" />
                    <h3 className="font-headline text-xl text-neutral-100">Hand Picked</h3>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <Image src="https://content-provider.payshia.com/tea-jar/factory-fresh.png" alt="Factory Fresh" width={80} height={80} className="object-contain" />
                    <h3 className="font-headline text-xl text-neutral-100">Factory Fresh</h3>
                </div>
            </div>
        </div>
      </div>

      <Products />
    </>
  );
}

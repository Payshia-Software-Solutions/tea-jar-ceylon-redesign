
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

export function SubscriptionModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000); // Delay of 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 max-w-2xl w-[90vw] grid grid-cols-2 gap-0 overflow-hidden rounded-lg bg-white text-black border-none">
        {/* Left Side (Image) */}
        <div className="relative h-full bg-black">
            <Image 
                src="http://content-provider.payshia.com/tea-jar/august-banner.webp" 
                alt="Exceptional Tea Collection" 
                width={800}
                height={800}
                className="object-contain w-full h-full"
            />
        </div>

        {/* Right Side (Form) */}
        <div className="relative p-4 md:p-8 flex flex-col justify-center">
            <div className="space-y-2 md:space-y-4 text-center">
                <h2 className="font-headline text-lg md:text-2xl font-bold">Life's better with tea, especially when it's 20% Off!</h2>
                <p className="text-neutral-600 text-xs md:text-sm">Enjoy 20% Off + FREE Delivery on all Tea Jar products, because you deserve the best.👌</p>
                <form className="space-y-2 md:space-y-4 pt-2 md:pt-4">
                    <Input placeholder="Enter your name" className="bg-neutral-100 border-neutral-300 focus:ring-amber-300 h-9 md:h-10 text-xs md:text-sm" />
                    <Input type="email" placeholder="Enter your email address" className="bg-neutral-100 border-neutral-300 focus:ring-amber-300 h-9 md:h-10 text-xs md:text-sm"/>
                    <Button type="submit" size="sm" className="w-full bg-black text-white hover:bg-neutral-800 text-xs md:text-sm md:h-10">
                    Subscribe Now
                    </Button>
                </form>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

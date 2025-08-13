
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import Image from 'next/image';

export function SubscriptionModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show the modal only if it hasn't been shown before in this session
    const hasBeenShown = sessionStorage.getItem('subscriptionModalShown');
    if (!hasBeenShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('subscriptionModalShown', 'true');
      }, 2000); // Delay of 2 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden bg-white text-black">
        {/* Left Side (Image) */}
        <div className="relative h-64 md:h-auto hidden md:flex flex-col items-center justify-center p-8 bg-[#0a2a1c] text-white">
            <Image src="https://content-provider.payshia.com/tea-jar/white-logo.png" alt="Tea Jar Logo" width={150} height={50} className="object-contain mb-6"/>
            <div className="text-center space-y-4">
                <p className="text-lg leading-tight">Tea should be <span className="font-bold">fresh, whole,</span> and <span className="font-bold">full of flavor</span> and that's exactly what we offer</p>
                <div className="py-2 px-4 border-2 border-dashed border-yellow-300 inline-block">
                    <p className="text-3xl font-bold text-yellow-300">20% OFF</p>
                </div>
                <div className="flex justify-center items-center gap-2">
                    <span className="text-sm font-semibold bg-yellow-400 text-black px-3 py-1 rounded">FREE</span>
                    <span className="text-sm">DELIVERY</span>
                </div>
            </div>
             <div className="mt-auto">
                <Image src="https://content-provider.payshia.com/tea-jar/exceptional-collection-box-v2.png" alt="Exceptional Tea Collection" width={250} height={150} className="object-contain"/>
             </div>
        </div>

        {/* Right Side (Form) */}
        <div className="relative p-8 md:p-12 flex flex-col justify-center">
            <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-neutral-500 hover:text-black" onClick={handleClose}>
                <X className="w-5 h-5"/>
                <span className="sr-only">Close</span>
            </Button>
            <div className="space-y-4 text-center">
                <h2 className="font-headline text-2xl md:text-3xl font-bold">Life's better with tea, especially when it's 20% Off!</h2>
                <p className="text-neutral-600 text-sm">Enjoy 20% Off + FREE Delivery on all Tea Jar products, because you deserve the best.👌</p>
                <form className="space-y-4 pt-4">
                    <Input placeholder="Enter your name" className="bg-neutral-100 border-neutral-300 focus:ring-amber-300" />
                    <Input type="email" placeholder="Enter your email address" className="bg-neutral-100 border-neutral-300 focus:ring-amber-300"/>
                    <Button type="submit" size="lg" className="w-full bg-black text-white hover:bg-neutral-800">
                    Subscribe Now
                    </Button>
                </form>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

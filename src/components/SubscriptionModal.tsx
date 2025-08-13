
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
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000); // Delay of 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden bg-white text-black">
        {/* Left Side (Image) */}
        <div className="relative hidden md:block">
            <Image 
                src="http://content-provider.payshia.com/tea-jar/august-banner.webp" 
                alt="Exceptional Tea Collection" 
                width={800}
                height={800}
                className="object-cover w-full h-full"
            />
        </div>

        {/* Right Side (Form) */}
        <div className="relative p-8 md:p-12 flex flex-col justify-center">
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

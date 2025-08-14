
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Phone, Mail, MapPin } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with Tea Jar. Contact us for inquiries about our products, wholesale opportunities, or any other questions you may have.',
};

export default function ContactPage() {
  return (
    <div className="bg-[#353d32] text-white pt-24">
      {/* Hero Section */}
      <section className="relative h-60 w-full flex items-center justify-center">
        <Image
          src="https://content-provider.payshia.com/tea-jar/61.webp"
          alt="Contact Us Background"
          fill
          className="object-cover"
          data-ai-hint="tea cup product"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="font-headline text-5xl md:text-7xl text-white tracking-widest">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-16">

          {/* Left Column - Contact Info */}
          <div className="lg:col-span-2">
            <div className="bg-[#2a2f28] border border-neutral-700 p-8 rounded-lg space-y-8">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-amber-300/80 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-white">Phone number:</h3>
                  <a href="tel:+94705508800" className="text-neutral-300 hover:text-amber-200">+9470 55 08 800</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-amber-300/80 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-white">Email:</h3>
                  <a href="mailto:marketing@teajarceylon.com" className="text-neutral-300 hover:text-amber-200">marketing@teajarceylon.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-amber-300/80 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-white">Corporate Address:</h3>
                  <p className="text-neutral-300">
                    KDU Exports PVT LTD,<br />
                    427 A, Galle Road,<br />
                    Colombo 03,<br />
                    Sri Lanka.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-amber-300/80 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-white">Factory Address:</h3>
                  <p className="text-neutral-300">
                    Galpadithanna Tea Factory,<br />
                    Lellopitiya,<br />
                    Rathnapura.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Contact Form */}
          <div className="lg:col-span-3">
             <form className="space-y-6">
                 <Input placeholder="Full Name" className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-amber-300 focus:ring-amber-300" />
                 <Input type="email" placeholder="Email" className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-amber-300 focus:ring-amber-300" />
                 <Input type="tel" placeholder="Phone Number" className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-amber-300 focus:ring-amber-300" />
                 <Input placeholder="Subject Topic" className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-amber-300 focus:ring-amber-300" />
                 <Textarea placeholder="Message" rows={6} className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-amber-300 focus:ring-amber-300" />
                 <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="newsletter" className="border-neutral-500 data-[state=checked]:bg-amber-200 data-[state=checked]:text-black" />
                        <label htmlFor="newsletter" className="text-sm font-medium text-neutral-300 leading-none">
                            Signup for Our Newsletter
                        </label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox id="privacy" className="border-neutral-500 data-[state=checked]:bg-amber-200 data-[state=checked]:text-black"/>
                        <label htmlFor="privacy" className="text-sm font-medium text-neutral-300 leading-none">
                            Confirm acceptance of our Privacy Policy
                        </label>
                    </div>
                 </div>
                 <Button type="submit" className="bg-white text-black hover:bg-neutral-200">SEND</Button>
             </form>
          </div>

        </div>
      </section>
    </div>
  );
}

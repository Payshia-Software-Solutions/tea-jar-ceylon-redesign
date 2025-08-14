
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
    <div className="bg-white pt-24">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-16">

          {/* Left Column - Contact Info */}
          <div className="lg:col-span-2">
            <div className="bg-[#f7f5f2] p-8 rounded-lg space-y-8">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-green-700 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-neutral-800">Phone number:</h3>
                  <a href="tel:+94705508800" className="text-neutral-600 hover:text-green-700">+9470 55 08 800</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-green-700 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-neutral-800">Email:</h3>
                  <a href="mailto:marketing@teajarceylon.com" className="text-neutral-600 hover:text-green-700">marketing@teajarceylon.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-green-700 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-neutral-800">Corporate Address:</h3>
                  <p className="text-neutral-600">
                    KDU Exports PVT LTD,<br />
                    427 A, Galle Road,<br />
                    Colombo 03,<br />
                    Sri Lanka.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-green-700 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-neutral-800">Factory Address:</h3>
                  <p className="text-neutral-600">
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
                 <Input placeholder="Full Name" />
                 <Input type="email" placeholder="Email" />
                 <Input type="tel" placeholder="Phone Number" />
                 <Input placeholder="Subject Topic" />
                 <Textarea placeholder="Message" rows={6} />
                 <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="newsletter" className="border-neutral-400 data-[state=checked]:bg-green-700 data-[state=checked]:border-green-700" />
                        <label htmlFor="newsletter" className="text-sm font-medium text-neutral-700 leading-none">
                            Signup for Our Newsletter
                        </label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox id="privacy" className="border-neutral-400 data-[state=checked]:bg-green-700 data-[state=checked]:border-green-700"/>
                        <label htmlFor="privacy" className="text-sm font-medium text-neutral-700 leading-none">
                            Confirm acceptance of our Privacy Policy
                        </label>
                    </div>
                 </div>
                 <Button type="submit" className="bg-green-700 hover:bg-green-800 text-white">SEND</Button>
             </form>
          </div>

        </div>
      </section>
    </div>
  );
}

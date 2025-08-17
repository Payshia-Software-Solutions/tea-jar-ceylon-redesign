
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone } from 'lucide-react';

const footerSections = [
    {
        title: 'Our Story',
        links: [
            { text: 'The Tea Jar Story', href: '/tea-jar-story' },
            { text: 'Our Tea Heritage', href: '/tea-heritage' },
            { text: 'KDU Group', href: '#' },
        ],
    },
    {
        title: 'Our Policies',
        links: [
            { text: 'Privacy Policy', href: '/privacy-policy' },
            { text: 'Refund Policy', href: '/refund-policy' },
            { text: 'Terms of Service', href: '/terms-of-service' },
            { text: 'Shipping Policy', href: '/shipping-policy' },
        ],
    },
    {
        title: 'Quick Links',
        links: [
            { text: 'Search', href: '#' },
            { text: 'Contact', href: '/contact' },
            { text: 'Store Locator', href: '#' },
            { text: 'Tea Menu', href: '#' },
            { text: 'Wholesale Program', href: '#' },
            { text: 'Tea Education', href: '#' },
        ],
    },
];

const socialLinks = [
    {
        name: 'Facebook',
        href: 'https://web.facebook.com/teajarceylon',
        icon: 'http://content-provider.payshia.com/tea-jar/social/facebook.webp',
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/tea_jar_/',
        icon: 'http://content-provider.payshia.com/tea-jar/social/instagram.webp',
    },
    {
        name: 'TikTok',
        href: 'https://www.tiktok.com/@tea_jar_01',
        icon: 'http://content-provider.payshia.com/tea-jar/social/tiktok.webp',
    },
    {
        name: 'WhatsApp',
        href: "https://wa.me/94705508800?text=Hi!%20I'm%20interested%20in%20your%20services.",
        icon: 'http://content-provider.payshia.com/tea-jar/social/whatsapp.webp',
    },
    {
        name: 'YouTube',
        href: 'https://www.youtube.com/your-channel',
        icon: 'http://content-provider.payshia.com/tea-jar/social/youtube.webp',
    },
];

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 448 512" {...props}>
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.6-9.5-97.2-27.9l-6.9-4.1-72.3 19L56 353.7l-4.4-7.3c-18.4-30.6-28.2-66.2-28.2-102.3 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
);


export function Footer() {
    return (
        <>
            <footer className="bg-[#1a1a1a] text-neutral-300">
                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Logo & Socials */}
                        <div className="lg:col-span-3">
                             <Link href="/" className="mb-6 inline-block">
                                <Image
                                    src="https://content-provider.payshia.com/tea-jar/gold-logo.webp"
                                    alt="Tea Jar Logo"
                                    width={120}
                                    height={60}
                                    priority
                                    className="object-contain h-20"
                                />
                            </Link>
                            <p className="text-sm text-neutral-400 mb-6 max-w-xs">
                                Mastering the art of world renowned, single origin Ceylon tea since 1978.
                            </p>
                            <div className="flex items-center gap-3">
                                {socialLinks.map(social => (
                                    <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-white hover:bg-neutral-200 transition-colors">
                                        <Image src={social.icon} alt={social.name} width={20} height={20} className="object-contain h-5 w-5" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Links Sections */}
                         <div className="lg:col-span-6">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                {footerSections.map((section) => (
                                    <div key={section.title}>
                                        <h3 className="font-semibold text-white mb-5">{section.title}</h3>
                                        <ul className="space-y-3">
                                            {section.links.map((link) => (
                                                <li key={link.text}>
                                                    <Link href={link.href} className="hover:text-white transition-colors text-sm text-neutral-400 hover:underline underline-offset-4">
                                                        {link.text}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                         </div>

                        {/* Contact Info */}
                        <div className="lg:col-span-3">
                             <h3 className="font-semibold text-white mb-5">Contact Us</h3>
                             <div className="text-xs space-y-4 text-neutral-400">
                                 <p>
                                     <span className="font-semibold text-white/90 block mb-1">Corporate Office:</span>
                                     KDU Exports PVT LTD, 427 A, Galle Road, Colombo 03, Sri Lanka
                                 </p>
                                 <p>
                                     <span className="font-semibold text-white/90 block mb-1">Factory:</span>
                                     KDU Exports PVT LTD, Galpadithanna Tea Factory, Lellopitiya, Rathnapura.
                                 </p>
                                 <p>
                                     <span className="font-semibold text-white/90 block">Customer Service:</span>
                                     (+94)70 55 08 800
                                 </p>
                                 <p>
                                    <span className="font-semibold text-white/90 block">Service Hours:</span>
                                    Daily 9 am - 6 pm
                                 </p>
                                  <p>
                                    <span className="font-semibold text-white/90 block">Wholesale Inquiries:</span>
                                    (+94)70 55 08 800
                                 </p>
                                 <p>
                                     <span className="font-semibold text-white/90 block">Email:</span>
                                     marketing@teajarceylon.com
                                 </p>
                             </div>
                         </div>
                    </div>
                </div>
                <div className="border-t border-neutral-800">
                    <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-sm">
                        <p className="text-neutral-500 mb-4 md:mb-0">&copy; {new Date().getFullYear()} Tea Jar. All rights reserved.</p>
                        <p className="text-neutral-500">
                            Powered by <Link href="https://payshia.com" className="hover:text-white transition-colors">Payshia Software Solutions</Link>
                        </p>
                    </div>
                </div>
            </footer>
            {/* Floating WhatsApp Icon */}
            <Link 
                href="https://wa.me/94705508800?text=Hi!%20I'm%20interested%20in%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-[#25D366] w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#128C7E] transition-transform hover:scale-110 z-50"
            >
                <WhatsAppIcon className="w-7 h-7" />
                <span className="sr-only">Chat on WhatsApp</span>
            </Link>
        </>
    );
}

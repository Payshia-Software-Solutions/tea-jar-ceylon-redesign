
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
            { text: 'Privacy Policy', href: '#' },
            { text: 'Refund Policy', href: '#' },
            { text: 'Terms of Service', href: '#' },
            { text: 'Shipping Policy', href: '#' },
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
                                    src="http://content-provider.payshia.com/tea-jar/white-logo.png"
                                    alt="Tea Jar Logo"
                                    width={120}
                                    height={42}
                                    priority
                                    className="object-contain h-10"
                                />
                            </Link>
                            <p className="text-sm text-neutral-400 mb-6 max-w-xs">
                                Mastering the art of world renowned, single origin Ceylon tea since 1978.
                            </p>
                            <div className="flex items-center gap-3">
                                {socialLinks.map(social => (
                                    <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-neutral-800 rounded-full flex items-center justify-center text-white hover:bg-neutral-700 transition-colors">
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
            {/* Floating Phone Icon */}
            <Link href="tel:+94705508800" className="fixed bottom-6 right-6 bg-green-500 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-transform hover:scale-110 z-50">
                <Phone className="w-7 h-7" />
                <span className="sr-only">Call us</span>
            </Link>
        </>
    );
}

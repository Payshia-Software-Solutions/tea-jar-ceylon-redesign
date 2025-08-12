import { Facebook, Instagram, Phone, Youtube } from 'lucide-react';
import Link from 'next/link';

const footerSections = [
    {
        title: 'Our Story',
        links: [
            { text: 'The Tea Jar Story', href: '#' },
            { text: 'Our Tea Heritage', href: '#' },
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
            { text: 'Contact', href: '#' },
            { text: 'Store Locator', href: '#' },
            { text: 'Tea Menu', href: '#' },
            { text: 'Wholesale Program', href: '#' },
            { text: 'Tea Education', href: '#' },
        ],
    },
];

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-1.15-6.42-3.05-1.44-1.72-2.14-3.88-2.07-6.03.04-1.1.25-2.2.62-3.25.5-1.42 1.34-2.71 2.41-3.79s2.4-1.93 3.87-2.44c.03-3.34.02-6.67.02-10.01z" />
    </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M16.75 13.96c.27.13.41.41.41.71v1.36c0 .83-.67 1.5-1.5 1.5-.28 0-.55-.07-.8-.21-1.3-.76-2.59-1.88-3.67-3.21-1.09-1.34-1.88-2.85-2.28-4.48-.05-.21-.08-.42-.08-.63 0-.83.67-1.5 1.5-1.5h1.36c.3 0 .58.15.71.41.21.4.46.81.76 1.21.24.32.18.77-.11 1.02l-.46.4c-.34.28-.32.81.04.11.83.67 1.56 1.28 2.24 1.96.68.68 1.29 1.41 1.96 2.24.32.36.83.38 1.11.04l.4-.46c.25-.29.7-.35 1.02-.11.4.3.81.55 1.21.76zM12 2a10 10 0 100 20 10 10 0 000-20z" />
    </svg>
);

export function Footer() {
    return (
        <>
            <footer className="bg-[#1a1a1a] text-neutral-300">
                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Links Sections */}
                        {footerSections.map((section) => (
                            <div key={section.title}>
                                <h3 className="font-bold text-white mb-6">{section.title}</h3>
                                <ul className="space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link.text}>
                                            <Link href={link.href} className="hover:text-white transition-colors text-sm">
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Contact Info */}
                        <div>
                            <h3 className="font-bold text-white mb-6">Tea Jar</h3>
                            <div className="text-sm space-y-3">
                                <p>
                                    <span className="font-semibold text-white/90 block">Corporate Office:</span> KDU Exports PVT LTD, 427 A, Galle Road, Colombo 03, Sri Lanka
                                </p>
                                <p>
                                    <span className="font-semibold text-white/90 block">Factory:</span> KDU Exports PVT LTD, Galpadithanna Tea Factory, Lellopitiya,Rathnapura.
                                </p>
                                <p>
                                    <span className="font-semibold text-white/90 block">Customer Service:</span> (+94)70 55 08 800
                                </p>
                                <p>
                                    <span className="font-semibold text-white/90 block">Service Hours:</span> Daily 9 am - 6 pm
                                </p>
                                <p>
                                    <span className="font-semibold text-white/90 block">Wholesale Inquiries:</span> (+94)70 55 08 800
                                </p>
                                <p>
                                    <span className="font-semibold text-white/90 block">Email:</span> marketing@teajarceylon.com
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Follow Us */}
                    <div className="text-center mt-16">
                        <h3 className="font-bold text-white mb-4">Follow Us</h3>
                        <div className="flex justify-center items-center gap-4">
                            <Link href="#" className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"><Facebook className="w-5 h-5" /></Link>
                            <Link href="#" className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"><Instagram className="w-5 h-5" /></Link>
                            <Link href="#" className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors p-2"><TikTokIcon /></Link>
                            <Link href="#" className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors p-2"><WhatsAppIcon /></Link>
                            <Link href="#" className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"><Youtube className="w-5 h-5" /></Link>
                        </div>
                    </div>
                </div>
                <div className="border-t border-neutral-800">
                    <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-sm">
                        <p className="text-neutral-500 mb-4 md:mb-0">&copy; {new Date().getFullYear()} Tea Jar. All rights reserved.</p>
                        <p className="text-neutral-500">
                            Powered by <Link href="#" className="hover:text-white transition-colors">Payshia Software Solutions</Link>
                        </p>
                    </div>
                </div>
            </footer>
            {/* Floating Phone Icon */}
            <Link href="tel:+94705508800" className="fixed bottom-6 right-6 bg-green-500 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-transform hover:scale-110">
                <Phone className="w-7 h-7" />
                <span className="sr-only">Call us</span>
            </Link>
        </>
    );
}

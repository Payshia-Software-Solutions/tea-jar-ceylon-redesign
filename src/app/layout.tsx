import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/hooks/use-cart.tsx';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Tea Jar | Finest Ceylon Tea in Sri Lanka',
    template: '%s | Tea Jar',
  },
  description: 'Discover the finest, ethically sourced Ceylon teas from Tea Jar. Explore our collections of classic black tea, flavored blends, and exclusive organic teas, crafted with generations of expertise.',
  keywords: ['Ceylon tea', 'Sri Lankan tea', 'Tea Jar', 'black tea', 'green tea', 'oolong tea', 'organic tea'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Italiana&family=Parisienne&family=Poppins:ital,wght@0,400;0,700;1,400&family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-background text-foreground antialiased flex flex-col min-h-screen">
        <CartProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
        <Toaster />
      </body>
    </html>
  );
}

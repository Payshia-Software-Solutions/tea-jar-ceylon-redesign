
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Classic Tea Collection',
    description: 'Explore our classic collection of timeless Ceylon teas, including English Breakfast, Single Origin Premium, and refreshing Green Teas.',
};

const TeaSection = ({
  title,
  description,
  packing,
  netWeight,
  productCode,
  imageUrl,
  imageAlt,
  bgColorClass,
  textColorClass,
  imageOnLeft = false,
}: {
  title: string;
  description: string;
  packing: string;
  netWeight: string;
  productCode: string;
  imageUrl: string;
  imageAlt: string;
  bgColorClass: string;
  textColorClass: string;
  imageOnLeft?: boolean;
}) => (
  <div className="grid md:grid-cols-2 items-center">
    <div className={`order-2 md:order-${imageOnLeft ? 2 : 1} ${bgColorClass} ${textColorClass} p-8 md:p-16 lg:p-24 flex justify-center h-full`}>
      <div className="max-w-md space-y-6">
        <h2 className={`font-headline text-3xl md:text-4xl`}>{title}</h2>
        <p className="text-sm md:text-base leading-relaxed">{description}</p>
        <div className="text-sm space-y-1">
            <p><strong>Packing:</strong> {packing}</p>
            <p><strong>Net Weight:</strong> {netWeight}</p>
            <p><strong>Product Code:</strong> {productCode}</p>
        </div>
        <Button variant="outline" className={`${textColorClass} border-current hover:bg-white/10`}>Shop Now</Button>
      </div>
    </div>
    <div className={`order-1 md:order-${imageOnLeft ? 1 : 2} h-64 md:h-full min-h-[50vh] relative`}>
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-cover"
        data-ai-hint={imageAlt}
      />
    </div>
  </div>
);


export default function ClassicTeasPage() {
  return (
    <div className="text-white pt-24">
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] w-full flex items-center justify-center">
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="Classic Tea Collection"
            fill
            className="object-cover"
            data-ai-hint="tea cup product"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center">
            <h1 className="font-headline text-5xl md:text-7xl text-white tracking-widest">
              CLASSIC COLLECTION
            </h1>
          </div>
        </section>

        {/* English Breakfast Tea */}
        <TeaSection
          title="ENGLISH BREAKFAST TEA"
          description="Crafted on a single estate in Sri Lanka's upcountry, English Breakfast tea embodies classic elegance and full-bodied flavor. Its rich, malty notes and subtle sweetness create a perfect morning indulgence. With a deep amber hue and invigorating aroma, it reflects the heritage of Sri Lankan tea craftsmanship. Sip by sip, experience the essence of tradition and sophistication, making each cup a delightful journey through the verdant hills of Sri Lanka's renowned tea-growing region."
          packing="2g x 25 Enveloped Tea Bags x 06"
          netWeight="50g"
          productCode="KDU/EXP/0005/011"
          imageUrl="https://placehold.co/800x600.png"
          imageAlt="woman drinking tea"
          bgColorClass="bg-[#b91c1c]"
          textColorClass="text-white"
        />

        {/* Full-width image */}
        <section className="h-[60vh] relative">
             <Image
                src="https://placehold.co/1920x1080.png"
                alt="Woman enjoying a cup of tea outdoors"
                fill
                className="object-cover"
                data-ai-hint="woman drinking tea"
            />
        </section>

        {/* Single Origin Premium Ceylon */}
         <TeaSection
          title="SINGLE ORIGIN PREMIUM CEYLON TEA"
          description="100% pure Ceylon tea, the finest product from a single estate. An old-renowned tea that was manufactured and gifted from generation to generation since 1978. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, accusamus provident! Porro facilis vel est, eaque cupiditate omnis, voluptatem maiores quos facilis."
          packing="2g x 100 Enveloped Tea Bags x 1"
          netWeight="200g"
          productCode="KDU/EXP/0005/011"
          imageUrl="https://placehold.co/800x600.png"
          imageAlt="tea set with tea box"
          bgColorClass="bg-[#b91c1c]"
          textColorClass="text-white"
        />

        {/* Single Origin Premium Ceylon 2 */}
        <TeaSection
          title="SINGLE ORIGIN PREMIUM CEYLON TEA"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, accusamus provident! Porro facilis vel est, eaque cupiditate omnis, voluptatem maiores quos facilis. 100% pure Ceylon tea, the finest product from a single estate. An old-renowned tea that was manufactured and gifted from generation to generation since 1978."
          packing="2g x 100 Enveloped Tea Bags x 1"
          netWeight="200g"
          productCode="KDU/EXP/0005/011"
          imageUrl="https://placehold.co/800x600.png"
          imageAlt="tea product box with tea cup"
          bgColorClass="bg-[#b91c1c]"
          textColorClass="text-white"
          imageOnLeft
        />
        
        {/* Full-width image 2 */}
         <section className="h-[60vh] relative">
             <Image
                src="https://placehold.co/1920x1080.png"
                alt="Woman holding a glass cup of tea"
                fill
                className="object-cover"
                data-ai-hint="woman holding tea"
            />
        </section>

        {/* Ceylon Green Tea */}
         <TeaSection
          title="CEYLON GREEN TEA"
          description="From a single estate in Sri Lanka's Upcountry, Ceylon green tea enriches perfection with its delicate aroma and light hue. Cultivated amidst the misty hills, it offers a refreshing experience with every sip. Its soft yet complex flavors tantalize the palate, leaving a lingering sense of tranquility. With a gentle infusion and a hint of sweetness, this tea captures the essence of nature's purity, making it a cherished delight for discerning tea connoisseurs."
          packing="2g x 25 Enveloped Tea Bags x 06"
          netWeight="50g"
          productCode="KDU/EXP/0005/011"
          imageUrl="https://placehold.co/800x600.png"
          imageAlt="ceylon green tea box"
          bgColorClass="bg-green-200"
          textColorClass="text-green-900"
        />
      </main>
    </div>
  );
}

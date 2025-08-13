
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Flavoured Tea Collection',
    description: 'Explore our collection of flavoured Ceylon teas, including Cinnamon, Cardamom, Ginger, Strawberry, Peach, and Apple.',
};

const TeaCard = ({
    name,
    description,
    packing,
    netWeight,
    productCode,
    imageUrl,
    imageAlt,
    bgColor,
    textColor,
    titleColor,
}: {
    name: string;
    description: string;
    packing: string;
    netWeight: string;
    productCode: string;
    imageUrl: string;
    imageAlt: string;
    bgColor: string;
    textColor: string;
    titleColor: string;
}) => (
    <div className="flex flex-col">
        <div style={{ backgroundColor: titleColor }} className="p-4 text-center">
            <h3 className="font-headline text-2xl text-white tracking-widest">{name.toUpperCase()}</h3>
        </div>
        <div className="relative aspect-square">
            <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                data-ai-hint={imageAlt}
            />
        </div>
        <div style={{ backgroundColor: bgColor, color: textColor }} className="p-6 flex-grow">
            <p className="text-sm leading-relaxed mb-4">{description}</p>
            <div className="text-xs space-y-1 mb-4">
                <p><strong>Packing:</strong> {packing}</p>
                <p><strong>Net Weight:</strong> {netWeight}</p>
                <p><strong>Product Code:</strong> {productCode}</p>
            </div>
            <Button variant="outline" className="w-full bg-black text-white hover:bg-neutral-800 border-black">Shop Now</Button>
        </div>
    </div>
);

export default function FlavouredTeasPage() {
  return (
    <div className="bg-[#f7f5f2] pt-24">
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] w-full flex items-center justify-center">
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="Flavoured Ceylon Black Tea"
            fill
            className="object-cover"
            data-ai-hint="woman drinking tea poolside"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 text-center">
            <h1 className="font-headline text-4xl md:text-6xl text-white tracking-widest">
              FLAVOURED CEYLON BLACK TEA
            </h1>
          </div>
        </section>

        {/* Tea Grid */}
        <section className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TeaCard 
                    name="Cinnamon"
                    description="A sweet and savory brew infused with splinters of Sri Lanka’s native gloom, Export quality ceylon black tea is bound to light up your day with its soothing aroma and zest, one sip at a time for you to savor the traditional blend of factory fresh Ceylon black Tea infused with the distinctive notes of this invigorating flavor."
                    packing="2g x 25 Enveloped Tea bags x 06"
                    netWeight="50g"
                    productCode="KDU/EXP/0005/012"
                    imageUrl="https://placehold.co/600x600.png"
                    imageAlt="cinnamon tea box"
                    bgColor="#f5f5f5"
                    textColor="#3c3c3c"
                    titleColor="#d97706"
                />
                <TeaCard 
                    name="Cardamom"
                    description="This spicy, warm and almost citrusy characteristics of cardamom, make this tea that has a potent aroma that soothes away, leaves you calm and invigorated. Unwind, relax and feel the joy as you initiate your style. And take a sip at leisure, with this traditional blend of factory fresh Ceylon black Tea infused with natural cardamom pieces."
                    packing="2g x 25 Enveloped Tea bags x 06"
                    netWeight="50g"
                    productCode="KDU/EXP/0005/012"
                    imageUrl="https://placehold.co/600x600.png"
                    imageAlt="cardamom tea box"
                    bgColor="#f5f5f5"
                    textColor="#3c3c3c"
                    titleColor="#84cc16"
                />
                 <TeaCard 
                    name="Ginger"
                    description="The zesty notes of ginger add spice to your life, together to create an invigorating brew that is bound to awaken your senses. Good through any time of day, sit back and enjoy the soothing sensation of this singular aromatic tea, blended with natural ginger pieces."
                    packing="2g x 25 Enveloped Tea bags x 1"
                    netWeight="50g"
                    productCode="KDU/EXP/0005/014"
                    imageUrl="https://placehold.co/600x600.png"
                    imageAlt="ginger tea box"
                    bgColor="#f5f5f5"
                    textColor="#3c3c3c"
                    titleColor="#f97316"
                />
                <TeaCard 
                    name="Strawberry"
                    description="The deep red colour of strawberries is alluring and refreshing, and it makes this tea blossom into a flavour of sweet sourness. The bold colours indulge the senses. Take a sip at leisure, from this factory fresh Ceylon black Tea with natural strawberry pieces to create a state of serenity."
                    packing="2g x 25 Enveloped Tea bags x 06"
                    netWeight="50g"
                    productCode="KDU/EXP/0005/011"
                    imageUrl="https://placehold.co/600x600.png"
                    imageAlt="strawberry tea box"
                    bgColor="#f5f5f5"
                    textColor="#3c3c3c"
                    titleColor="#ef4444"
                />
                 <TeaCard 
                    name="Peach"
                    description="The familiar tang of a feel-good, exotic fruity blend. A flavour explosion of mouth-watering sweetness and zesty peach pieces, the bold colours of this infusion sweeten sunsets as the blend lingers with golden hues."
                    packing="2g x 25 Enveloped Tea bags x 06"
                    netWeight="50g"
                    productCode="KDU/EXP/0005/011"
                    imageUrl="https://placehold.co/600x600.png"
                    imageAlt="peach tea box"
                    bgColor="#f5f5f5"
                    textColor="#3c3c3c"
                    titleColor="#f59e0b"
                />
                 <TeaCard 
                    name="Apple"
                    description="A brew for everyone is this fruity blend of wild apple pieces. Take time aside for a cup of this tea. The mild sweet flavour of this scarlet hued brew, is a treat to the senses and is transported to summer days gone by."
                    packing="2g x 25 Enveloped Tea bags x 06"
                    netWeight="50g"
                    productCode="KDU/EXP/0005/013"
                    imageUrl="https://placehold.co/600x600.png"
                    imageAlt="apple tea box"
                    bgColor="#f5f5f5"
                    textColor="#3c3c3c"
                    titleColor="#dc2626"
                />
            </div>
        </section>

         {/* Full-width image */}
        <section className="h-[60vh] relative">
             <Image
                src="https://placehold.co/1920x1080.png"
                alt="Woman enjoying a cup of tea"
                fill
                className="object-cover"
                data-ai-hint="woman drinking tea"
            />
        </section>

        {/* Canister Grid */}
        <section className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="flex flex-col">
                    <div style={{ backgroundColor: '#d97706' }} className="p-4 text-center">
                        <h3 className="font-headline text-2xl text-white tracking-widest">CINNAMON</h3>
                    </div>
                    <div className="relative aspect-square">
                        <Image
                            src="https://placehold.co/600x600.png"
                            alt="cinnamon tea canister"
                            fill
                            className="object-cover"
                            data-ai-hint="tea canister"
                        />
                    </div>
                </div>
                 <div className="flex flex-col">
                    <div style={{ backgroundColor: '#84cc16' }} className="p-4 text-center">
                        <h3 className="font-headline text-2xl text-white tracking-widest">CARDAMOM</h3>
                    </div>
                    <div className="relative aspect-square">
                        <Image
                            src="https://placehold.co/600x600.png"
                            alt="cardamom tea canister"
                            fill
                            className="object-cover"
                            data-ai-hint="tea canister"
                        />
                    </div>
                </div>
                 <div className="flex flex-col">
                    <div style={{ backgroundColor: '#f97316' }} className="p-4 text-center">
                        <h3 className="font-headline text-2xl text-white tracking-widest">GINGER</h3>
                    </div>
                    <div className="relative aspect-square">
                        <Image
                            src="https://placehold.co/600x600.png"
                            alt="ginger tea canister"
                            fill
                            className="object-cover"
                            data-ai-hint="tea canister"
                        />
                    </div>
                </div>
            </div>
        </section>

      </main>
    </div>
  );
}

import { teas } from '@/lib/tea-data';
import type { Tea } from '@/lib/types';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { AddToCartButton } from '@/components/AddToCartButton';
import { BrewingGuide } from '@/components/BrewingGuide';
import { TeaCard } from '@/components/TeaCard';
import { Separator } from '@/components/ui/separator';

interface TeaPageProps {
  params: {
    id: string;
  };
}

export default function TeaPage({ params }: TeaPageProps) {
  const tea = teas.find((t) => t.id === params.id);

  if (!tea) {
    notFound();
  }

  const recommendedTeas = teas
    .filter((t) => t.id !== tea.id && t.type === tea.type)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl shadow-lg">
          <Image
            src={tea.image}
            alt={tea.name}
            fill
            className="object-cover"
            data-ai-hint={tea.dataAiHint}
            priority
          />
        </div>
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Badge variant="outline">{tea.type}</Badge>
              <span className="text-sm text-muted-foreground">{tea.origin}</span>
            </div>
            <h1 className="font-headline text-5xl text-primary">{tea.name}</h1>
            <p className="text-xl text-muted-foreground">{tea.longDescription}</p>
          </div>
          <div className="flex items-center gap-3">
            {tea.flavorProfile.map((flavor) => (
              <Badge key={flavor} variant="secondary">
                {flavor}
              </Badge>
            ))}
          </div>
          <div className="flex items-baseline gap-4 pt-4">
            <span className="text-4xl font-bold text-primary">${tea.price.toFixed(2)}</span>
            <AddToCartButton tea={tea} />
          </div>
        </div>
      </div>

      <div className="mt-16 md:mt-24">
        <BrewingGuide teaType={tea.type} />
      </div>

      {recommendedTeas.length > 0 && (
        <div className="mt-16 md:mt-24">
            <Separator className="my-8" />
          <h2 className="font-headline text-4xl text-center text-primary mb-12">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommendedTeas.map((recTea) => (
              <TeaCard key={recTea.id} tea={recTea} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  return teas.map((tea) => ({
    id: tea.id,
  }));
}

import type { Tea } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

interface TeaCardProps {
  tea: Tea;
}

export function TeaCard({ tea }: TeaCardProps) {
  return (
    <Link href={`/tea/${tea.id}`} className="group">
      <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1 border-transparent hover:border-primary/20 bg-card">
        <CardHeader>
          <div className="aspect-square overflow-hidden rounded-lg relative">
            <Image
              src={tea.image}
              alt={tea.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={tea.dataAiHint}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardTitle className="font-headline text-xl leading-tight">{tea.name}</CardTitle>
          <p className="text-muted-foreground mt-1">{tea.description}</p>
        </CardContent>
        <CardFooter>
          <p className="text-lg font-bold text-primary">
            ${tea.price.toFixed(2)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}

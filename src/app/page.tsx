import { TeaCard } from '@/components/TeaCard';
import { teas } from '@/lib/tea-data';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold text-primary mb-2">Explore Our Teas</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the rich heritage and exquisite flavors of Ceylon, captured in every cup.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {teas.map((tea) => (
          <TeaCard key={tea.id} tea={tea} />
        ))}
      </div>
    </div>
  );
}

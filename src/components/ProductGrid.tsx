
import type { Tea } from '@/lib/types';
import { TeaCard } from './TeaCard';

interface ProductGridProps {
  teas: Tea[];
}

export function ProductGrid({ teas }: ProductGridProps) {
  if (teas.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="font-headline text-3xl text-neutral-300">No Teas Found</h3>
        <p className="text-neutral-400 mt-2">Try adjusting your filters to find your perfect cup.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
      {teas.map(tea => (
        <TeaCard key={tea.id} tea={tea} />
      ))}
    </div>
  );
}

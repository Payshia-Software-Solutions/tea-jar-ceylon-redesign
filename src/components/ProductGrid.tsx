
import type { Tea } from '@/lib/types';
import { TeaCard } from './TeaCard';

interface ProductGridProps {
  teas: Tea[];
}

export function ProductGrid({ teas }: ProductGridProps) {
  if (teas.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-neutral-400 mt-2">No matching teas found for this collection.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-8">
      {teas.map(tea => (
        <TeaCard key={tea.id} tea={tea} />
      ))}
    </div>
  );
}

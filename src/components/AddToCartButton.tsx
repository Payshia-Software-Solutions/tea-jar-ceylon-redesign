'use client';

import { useCart } from '@/hooks/use-cart.tsx';
import type { Tea } from '@/lib/types';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
  tea: Tea;
}

export function AddToCartButton({ tea }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(tea);
    toast({
      title: 'Added to Cart',
      description: `${tea.name} has been added to your cart.`,
    });
  };

  return (
    <Button size="lg" onClick={handleAddToCart}>
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  );
}

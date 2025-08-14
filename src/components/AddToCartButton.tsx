
'use client';

import { useCart } from '@/hooks/use-cart.tsx';
import type { Tea } from '@/lib/types';
import { Button, ButtonProps } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';
import * as fbq from '@/lib/fpixel';

interface AddToCartButtonProps extends ButtonProps {
  tea: Tea;
  quantity?: number;
}

export function AddToCartButton({ tea, quantity = 1, className, ...props }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(tea, quantity);
    toast({
      title: 'Added to Cart',
      description: `${quantity} x ${tea.name} has been added to your cart.`,
    });
    fbq.event('AddToCart', {
      content_ids: [tea.id],
      content_name: tea.name,
      content_type: 'product',
      value: tea.salePrice ?? tea.price,
      currency: 'LKR',
    });
  };

  return (
    <Button size="lg" onClick={handleAddToCart} className={className} {...props}>
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  );
}

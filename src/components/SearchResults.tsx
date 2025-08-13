
'use client';

import type { ApiProduct } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

interface SearchResultsProps {
    results: ApiProduct[];
    isLoading: boolean;
    onClose: () => void;
}

export function SearchResults({ results, isLoading, onClose }: SearchResultsProps) {
    if (isLoading) {
        return (
            <div className="absolute top-full mt-2 w-full max-h-96 overflow-y-auto rounded-md bg-[#2a2f28] border border-neutral-700 shadow-lg z-50 p-4">
                <div className="flex justify-center items-center gap-2 text-neutral-300">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Searching...</span>
                </div>
            </div>
        );
    }
    
    if (results.length === 0) {
        return null;
    }

    return (
        <div className="absolute top-full mt-2 w-full max-h-96 overflow-y-auto rounded-md bg-[#2a2f28] border border-neutral-700 shadow-lg z-50">
            <ul className="divide-y divide-neutral-700">
                {results.map(product => (
                    <li key={product.product_id}>
                        <Link 
                            href={`/products/${product.slug || product.product_id}`} 
                            className="flex items-center justify-between gap-4 p-3 hover:bg-neutral-800 transition-colors"
                            onClick={onClose}
                        >
                            <p className="font-semibold text-white line-clamp-2 flex-1">{product.product_name.trim()}</p>
                            <p className="text-sm text-neutral-400">Rs {parseFloat(product.selling_price).toFixed(2)}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}


'use client';

import type { ApiProduct } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SearchResultsProps {
    results: ApiProduct[];
    isLoading: boolean;
    onClose: () => void;
    query: string;
    isMobile?: boolean;
}

export function SearchResults({ results, isLoading, onClose, query, isMobile = false }: SearchResultsProps) {
    const showNoResults = !isLoading && query.length > 1 && results.length === 0;

    if (!isLoading && !showNoResults && results.length === 0) {
        return null;
    }

    return (
        <div className={cn(
            "overflow-y-auto",
            isMobile 
                ? "h-full"
                : "absolute top-full mt-2 w-full max-h-[60vh] rounded-md bg-[#2a2f28] border border-neutral-700 shadow-lg z-50"
        )}>
            {isLoading ? (
                <div className="flex justify-center items-center gap-2 text-neutral-300 p-4">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Searching...</span>
                </div>
            ) : showNoResults ? (
                <div className="p-4 text-center text-neutral-400">
                    <p>No results found for &quot;{query}&quot;</p>
                </div>
            ) : (
                <ul className={cn("divide-y", isMobile ? "divide-neutral-800" : "divide-neutral-700")}>
                    {results.map(product => {
                        const imageUrl = `https://kdu-admin.payshia.com/pos-system/assets/images/products/${product.product_id}/${product.image_path}`;
                        return (
                            <li key={product.product_id}>
                                <Link 
                                    href={`/products/${product.slug || product.product_id}`} 
                                    className="flex items-center gap-4 p-3 hover:bg-neutral-800 transition-colors"
                                    onClick={onClose}
                                >
                                    <div className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-white p-1">
                                        <Image
                                            src={imageUrl}
                                            alt={product.product_name}
                                            fill
                                            className="object-contain"
                                            unoptimized
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-white text-sm line-clamp-2">{product.product_name.trim()}</p>
                                        <p className="text-xs text-neutral-400 mt-1">Rs {parseFloat(product.selling_price).toFixed(2)}</p>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

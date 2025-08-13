
'use client';

import type { ApiProduct } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
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
        <div className="absolute top-full mt-2 w-full max-h-[60vh] overflow-y-auto rounded-md bg-[#2a2f28] border border-neutral-700 shadow-lg z-50">
            <ul className="divide-y divide-neutral-700">
                {results.map(product => {
                    const imageUrl = `https://kdu-admin.payshia.com/pos-system/assets/images/products/${product.product_id}/${product.image_path}`;
                    return (
                        <li key={product.product_id}>
                            <Link 
                                href={`/products/${product.slug || product.product_id}`} 
                                className="flex items-center gap-4 p-3 hover:bg-neutral-800 transition-colors"
                                onClick={onClose}
                            >
                                <div className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden">
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
        </div>
    );
}

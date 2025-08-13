
'use client';

import type { Tea } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface SearchResultsProps {
    results: Tea[];
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
                    <li key={product.id}>
                        <Link 
                            href={`/products/${product.id}`} 
                            className="flex items-center gap-4 p-3 hover:bg-neutral-800 transition-colors"
                            onClick={onClose}
                        >
                            <div className="relative h-14 w-14 flex-shrink-0 bg-white rounded-md overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-white line-clamp-2">{product.name}</p>
                                <p className="text-sm text-neutral-400">Rs {product.price.toFixed(2)}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

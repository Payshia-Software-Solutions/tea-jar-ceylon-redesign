
'use client';

import { useState } from 'react';
import type { Tea } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getTranslatedProduct, type TranslateProductInput, type TranslateProductOutput } from '@/ai/flows/translate-product';
import { Loader2, ArrowLeft, Gift } from 'lucide-react';

const languages = [
    { code: 'ja', name: '日本語', flag: '/flags/jp.svg' },
    { code: 'zh', name: '中文', flag: '/flags/cn.svg' },
    { code: 'ar', name: 'العربية', flag: '/flags/ae.svg' },
    { code: 'ru', name: 'Русский', flag: '/flags/ru.svg' },
];

const TeaSpoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M50.6 30.6c.3-3.8-2.2-7.2-5.5-8.1-.9-.3-1.8-.4-2.8-.4H19.5c-4.4 0-8 3.6-8 8v.1c0 4.4 3.6 8 8 8h25.5c3.5 0 6.5-2.5 7.1-5.9.1-.4.1-.8.1-1.2 0-.2 0-.3-.1-.5z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
    </svg>
);

const TeaBagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M32 6.5L21.5 21.6h21L32 6.5z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
        <path d="M44.5 57.5h-25c-1.1 0-2-.9-2-2V23.6c0-1.1.9-2 2-2h25c1.1 0 2 .9 2 2v31.9c0 1.1-.9 2-2 2z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
    </svg>
);

interface ViewProductClientProps {
    product: Tea;
}

export function ViewProductClient({ product }: ViewProductClientProps) {
    const [selectedLang, setSelectedLang] = useState<string | null>(null);
    const [translatedProduct, setTranslatedProduct] = useState<TranslateProductOutput | null>(null);
    const [translating, setTranslating] = useState(false);

    const handleLanguageSelect = async (langCode: string) => {
        if (!product) return;
        
        setSelectedLang(langCode);
        setTranslating(true);
        
        try {
            const input: TranslateProductInput = {
                productId: product.productId!,
                targetLanguage: langCode,
            };
            const result = await getTranslatedProduct(input);
            setTranslatedProduct(result);
        } catch (error) {
            console.error('Failed to translate product:', error);
            // Optionally, show an error message to the user
        } finally {
            setTranslating(false);
        }
    };

    const handleBackToLangSelect = () => {
        setSelectedLang(null);
        setTranslatedProduct(null);
    }

    if (!selectedLang || translating) {
        return (
            <div className="bg-[#1a2e23] text-white min-h-screen flex flex-col items-center justify-center p-4 pt-32 pb-12">
                <div className="text-center mb-8">
                    <h1 className="font-headline text-4xl md:text-5xl text-white mb-2">Select Your Language</h1>
                    <p className="text-neutral-300">Choose your preferred language to view product details.</p>
                </div>
                
                <div className="w-full max-w-sm text-center">
                     <div className="relative aspect-square w-full bg-white p-4 rounded-lg shadow-lg">
                        <Image src={product.image} alt={product.name} fill className="object-contain" unoptimized/>
                    </div>
                    <h2 className="font-headline text-3xl md:text-4xl text-amber-100/90 mt-6 mb-8">{product.name}</h2>
                </div>

                {translating ? (
                     <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 animate-spin text-amber-200" />
                        <p className="text-lg text-amber-100/90">Translating to {languages.find(l => l.code === selectedLang)?.name}...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageSelect(lang.code)}
                                className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4 flex flex-col items-center gap-4 hover:bg-neutral-700/70 hover:border-amber-300/50 transition-all duration-300"
                            >
                                <div className="relative w-24 h-16">
                                    <Image src={lang.flag} alt={`${lang.name} flag`} fill className="object-contain" unoptimized />
                                </div>
                                <span className="font-headline text-xl text-neutral-200">{lang.name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    }
    
    if (translatedProduct) {
        return (
            <div className="bg-[#1a2e23] text-white min-h-screen flex flex-col items-center justify-center p-4">
                 <Button onClick={handleBackToLangSelect} variant="ghost" className="absolute top-6 left-6 text-amber-200/90 hover:text-amber-200 hover:bg-white/10 z-10">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Language Selection
                </Button>
                <div className="bg-[#0b2218] border border-[#d4af37]/30 rounded-lg p-8 md:p-12 w-full max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="md:col-span-1 space-y-4 text-white">
                            <h1 className="font-headline text-4xl">{translatedProduct.name}</h1>
                            <p className="text-xl text-[#d4af37]">{translatedProduct.flavorProfile}</p>
                            <p className="text-neutral-300 leading-relaxed">{translatedProduct.description}</p>
                            <p className="text-neutral-200 italic">{translatedProduct.bestSipped}</p>
                        </div>

                        {/* Middle Column */}
                        <div className="md:col-span-1 flex flex-col justify-between border-l border-r border-[#d4af37]/30 px-8">
                            <div className="space-y-6">
                                <div className="border-b border-[#d4af37]/30 pb-4">
                                    <h3 className="font-semibold mb-2">Loose Leaf</h3>
                                    <div className="flex items-center gap-4">
                                        <TeaSpoonIcon className="w-10 h-10 text-white" />
                                        <div className="flex-grow">
                                            <p className="text-sm">175g</p>
                                            <p className="text-sm font-semibold text-[#d4af37]">Rs 2,430.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-b border-[#d4af37]/30 pb-4">
                                     <h3 className="font-semibold mb-2">Tea Bag</h3>
                                    <div className="flex items-center gap-4">
                                        <TeaBagIcon className="w-10 h-10 text-white" />
                                        <div className="flex-grow">
                                            <p className="text-sm">15 Tea Bags</p>
                                            <p className="text-sm font-semibold text-[#d4af37]">Rs 1,370.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-4">
                                        <Gift className="w-8 h-8 text-white" />
                                        <p>Gift Wrapping Available</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="md:col-span-1">
                            <div className="relative aspect-square w-full bg-white p-2 rounded-lg shadow-lg">
                                <Image src={product.image} alt={product.name} fill className="object-contain" unoptimized/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null; // Should not be reached
}

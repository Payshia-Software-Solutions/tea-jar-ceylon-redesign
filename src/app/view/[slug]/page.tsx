
'use client';

import { useState, useEffect } from 'react';
import type { Tea, ApiProduct } from '@/lib/types';
import { notFound, useParams }s from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getTranslatedProduct, type TranslateProductInput, type TranslateProductOutput } from '@/ai/flows/translate-product';
import { Loader2, Globe, ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const languages = [
    { code: 'ja', name: '日本語', flag: '/flags/jp.svg', originalText: '言語を選択', scanText: '今すぐスキャン' },
    { code: 'zh', name: '中文', flag: '/flags/cn.svg', originalText: '选择你的语言', scanText: '立即扫描' },
    { code: 'ar', name: 'العربية', flag: '/flags/ae.svg', originalText: 'اختر لغتك', scanText: 'امسح الآن' },
    { code: 'ru', name: 'Русский', flag: '/flags/ru.svg', originalText: 'Выберите Язык', scanText: 'СКАНИРОВАТЬ СЕЙЧАС' },
];

export default function ViewProductPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [product, setProduct] = useState<Tea | null>(null);
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [selectedLang, setSelectedLang] = useState<string | null>(null);
    const [translatedProduct, setTranslatedProduct] = useState<TranslateProductOutput | null>(null);
    const [translating, setTranslating] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
            if (!slug) return;
            try {
                const response = await fetch(`https://kduserver.payshia.com/products/get-by-slug/${slug}`);
                if (!response.ok) {
                    setLoadingProduct(false);
                    return;
                }
                const apiProduct: ApiProduct = await response.json();
                
                const price = parseFloat(apiProduct.selling_price);
                const imageUrl = `https://kdu-admin.payshia.com/pos-system/assets/images/products/${apiProduct.product_id}/${apiProduct.image_path}`;

                const formattedProduct: Tea = {
                    id: apiProduct.slug || apiProduct.product_id,
                    productId: apiProduct.product_id,
                    name: apiProduct.product_name.trim(),
                    description: apiProduct.product_description || 'A delightful tea from Ceylon.',
                    longDescription: apiProduct.how_to_use || '100% Ceylon black tea.',
                    price: price,
                    image: imageUrl,
                    dataAiHint: 'tea product',
                    type: 'Black',
                    flavorProfile: [],
                    origin: 'Sri Lanka',
                };
                
                setProduct(formattedProduct);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoadingProduct(false);
            }
        }

        fetchProduct();
    }, [slug]);

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

    if (loadingProduct) {
        return (
            <div className="bg-[#1a2e23] text-white min-h-screen flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-amber-200" />
            </div>
        );
    }

    if (!product) {
        return notFound();
    }

    if (!selectedLang || translating) {
        return (
            <div className="bg-[#1a2e23] text-white min-h-screen flex flex-col items-center justify-center p-4">
                <div className="text-center mb-8">
                    <h1 className="font-headline text-4xl md:text-5xl text-white mb-2">Select Your Language</h1>
                    <p className="text-neutral-300">Choose your preferred language to view product details.</p>
                </div>
                
                <div className="w-full max-w-sm mb-8">
                     <div className="relative aspect-square w-full bg-white p-4 rounded-lg shadow-lg">
                        <Image src={product.image} alt={product.name} fill className="object-contain" unoptimized/>
                    </div>
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
            <div className="bg-[#1a2e23] text-white min-h-screen pt-12 pb-12">
                <div className="container mx-auto px-4 max-w-2xl">
                     <Button onClick={handleBackToLangSelect} variant="ghost" className="mb-8 text-amber-200/90 hover:text-amber-200 hover:bg-white/10">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Language Selection
                    </Button>
                    <div className="relative aspect-square w-full bg-white p-4 rounded-lg shadow-lg mb-8">
                        <Image src={product.image} alt={product.name} fill className="object-contain" unoptimized/>
                    </div>

                    <h1 className="font-headline text-4xl md:text-5xl text-white text-center mb-4">{translatedProduct.name}</h1>
                    
                    <Separator className="my-8 bg-neutral-700" />
                    
                    <div className="space-y-6">
                        <div>
                            <h2 className="font-headline text-2xl text-amber-200/90 mb-2">Description</h2>
                            <p className="text-neutral-300 whitespace-pre-line leading-relaxed">{translatedProduct.description}</p>
                        </div>
                         <div>
                            <h2 className="font-headline text-2xl text-amber-200/90 mb-2">Brewing Instructions</h2>
                            <p className="text-neutral-300 whitespace-pre-line leading-relaxed">{translatedProduct.howToUse}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null; // Should not be reached
}

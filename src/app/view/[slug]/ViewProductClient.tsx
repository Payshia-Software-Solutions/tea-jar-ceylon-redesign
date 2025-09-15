
'use client';

import { useState, useEffect } from 'react';
import type { Tea } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const languages = [
    { code: 'en', name: 'English', flag: '/flags/gb.svg' },
    { code: 'ja', name: '日本語', flag: '/flags/jp.svg' },
    { code: 'zh', name: '中文', flag: '/flags/cn.svg' },
    { code: 'ar', name: 'العربية', flag: '/flags/ae.svg' },
    { code: 'ru', name: 'Русский', flag: '/flags/ru.svg' },
];

const translatedImages: Record<string, Record<string, string>> = {
    'pure-ceylon-green-tea-15-tea-bags': {
        en: 'https://content-provider.payshia.com/tea-jar/translations/en/pure-ceylon-green-tea-en.PNG',
        ja: 'https://content-provider.payshia.com/tea-jar/translations/jp/pure-ceylon-green-tea-jp.PNG',
        zh: 'https://content-provider.payshia.com/tea-jar/translations/cn/pure-ceylon-green-tea-cn.PNG',
    }
};

interface ViewProductClientProps {
    product: Tea;
}

export function ViewProductClient({ product }: ViewProductClientProps) {
    const [selectedLang, setSelectedLang] = useState<string | null>(null);

    useEffect(() => {
        if (selectedLang) {
            const element = document.getElementById('translation-section');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [selectedLang]);

    const handleLanguageSelect = (langCode: string) => {
        setSelectedLang(langCode);
    };

    const handleBackToLangSelect = () => {
        setSelectedLang(null);
    }

    const getTranslatedImage = () => {
        const productImages = translatedImages[product.id];
        if (!productImages) {
            return translatedImages['pure-ceylon-green-tea-15-tea-bags']['en']; // default fallback
        }
        return productImages[selectedLang!] || productImages['en'];
    }

    return (
      <div className="bg-[#1a2e23] text-white min-h-screen w-full flex flex-col items-center p-4 pt-32 pb-12">
        {/* Static Content */}
        <div className="text-center mb-8 w-full max-w-4xl">
            <h1 className="font-headline text-4xl md:text-5xl text-white mb-2">
                Select Your Language
            </h1>
            <p className="text-neutral-300">
                Choose your preferred language to view product details.
            </p>
        </div>

        <div className="w-full max-w-sm text-center mb-8">
            <div className="relative aspect-square w-full bg-white p-4 rounded-lg shadow-lg">
                <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                unoptimized
                />
            </div>
            <h2 className="font-headline text-3xl md:text-4xl text-amber-100/90 mt-6">
                {product.name}
            </h2>
        </div>

        {/* Dynamic Content Area */}
        <div id="translation-section" className="w-full max-w-5xl">
            <AnimatePresence mode="wait">
            {selectedLang ? (
                <motion.div
                    key="image-view"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="w-full flex flex-col items-center"
                >
                    <div className="w-full mb-4">
                        <Button
                        onClick={handleBackToLangSelect}
                        variant="ghost"
                        className="text-amber-200/90 hover:text-amber-200 hover:bg-white/10"
                        >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Language Selection
                        </Button>
                    </div>
                    <div className="w-full">
                        <Image
                        src={getTranslatedImage()}
                        alt={`Translated details for ${product.name} in ${selectedLang}`}
                        width={1200}
                        height={800}
                        className="object-contain w-full h-full rounded-lg"
                        unoptimized
                        />
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="lang-select"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                        {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageSelect(lang.code)}
                            className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4 flex flex-col items-center gap-4 hover:bg-neutral-700/70 hover:border-amber-300/50 transition-all duration-300"
                        >
                            <div className="relative w-24 h-16">
                            <Image
                                src={lang.flag}
                                alt={`${lang.name} flag`}
                                fill
                                className="object-contain"
                                unoptimized
                            />
                            </div>
                            <span className="font-headline text-xl text-neutral-200">
                            {lang.name}
                            </span>
                        </button>
                        ))}
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
        </div>

      </div>
    );
}

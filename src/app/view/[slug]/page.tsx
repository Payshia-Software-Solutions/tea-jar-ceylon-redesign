

import type { Tea, ApiProduct } from '@/lib/types';
import { notFound } from 'next/navigation';
import { ViewProductClient } from './ViewProductClient';
import type { Metadata } from 'next';

interface ViewPageProps {
    params: {
        slug: string;
    };
}

async function getTeaData(slug: string): Promise<Tea | null> {
    try {
        const response = await fetch(`https://kduserver.payshia.com/products/get-by-slug/${slug}`);
        if (!response.ok) {
            return null;
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
        
        return formattedProduct;
    } catch (error) {
        console.error('Failed to fetch product:', error);
        return null;
    }
}

export async function generateMetadata({ params }: ViewPageProps): Promise<Metadata> {
    const product = await getTeaData(params.slug);

    if (!product) {
        return {
            title: 'Product not found',
        };
    }

    const productName = product.name.trim();
    const description = product.description || `Discover the exquisite taste of ${productName}, a premium Ceylon tea from Tea Jar.`;

    return {
        title: `${productName} - View`,
        description: description,
        openGraph: {
            title: `${productName} | Tea Jar`,
            description: description,
            type: 'product',
            url: `/view/${params.slug}`,
            images: [
                {
                    url: product.image,
                    width: 800,
                    height: 800,
                    alt: productName,
                },
            ],
            siteName: 'Tea Jar',
        },
    };
}


export default async function ViewProductPage({ params }: ViewPageProps) {
    const product = await getTeaData(params.slug);

    if (!product) {
        notFound();
    }

    return <ViewProductClient product={product} />;
}

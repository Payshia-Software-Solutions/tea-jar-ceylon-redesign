
import type { Tea, ApiProduct, ApiImage } from '@/lib/types';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ProductDetailClient } from '@/components/ProductDetailClient';

interface TeaPageProps {
  params: {
    slug: string;
  };
}

async function getTeaData(slug: string): Promise<{tea: Tea | null, recommendedTeas: Tea[]}> {
    try {
        const response = await fetch(`https://kduserver.payshia.com/products/get-by-slug/${slug}`);
        if (!response.ok) {
            return { tea: null, recommendedTeas: [] };
        }
        const apiProduct: ApiProduct = await response.json();

        const price = parseFloat(apiProduct.selling_price);
        let salePrice: number | undefined;

        if (apiProduct.special_promo && apiProduct.special_promo_type === 'percentage') {
            const discount = parseFloat(apiProduct.special_promo);
            salePrice = price - (price * discount / 100);
        } else if (apiProduct.special_promo) {
             salePrice = price - parseFloat(apiProduct.special_promo);
        }

        const imageUrl = `https://kdu-admin.payshia.com/pos-system/assets/images/products/${apiProduct.product_id}/${apiProduct.image_path}`;

        const imagesResponse = await fetch(`https://kduserver.payshia.com/product-images/get-by-product/${apiProduct.product_id}`);
        const apiImages: ApiImage[] = await imagesResponse.json();
        const galleryImages = apiImages.map(img => `https://kdu-admin.payshia.com/pos-system/assets/images/products/${apiProduct.product_id}/${img.image_path}`);

        const formattedProduct: Tea = {
            id: apiProduct.slug || apiProduct.product_id,
            productId: apiProduct.product_id,
            name: apiProduct.product_name.trim(),
            description: apiProduct.product_description || 'A delightful tea from Ceylon.',
            longDescription: apiProduct.how_to_use || '100% Ceylon black tea.',
            price: price,
            salePrice: salePrice,
            image: imageUrl,
            images: galleryImages.length > 0 ? galleryImages : [imageUrl],
            dataAiHint: 'tea product',
            type: 'Black',
            flavorProfile: [],
            origin: 'Sri Lanka',
            netWeight: '350.00 g'
        };

        // Fetch recommendations
        const allProductsResponse = await fetch('https://kduserver.payshia.com/products');
        const allProductsData: ApiProduct[] = await allProductsResponse.json();
        const allFormattedProducts: Tea[] = allProductsData.map(p => {
            const p_price = parseFloat(p.selling_price);
            let p_salePrice: number | undefined;
            if (p.special_promo && p.special_promo_type === 'percentage') {
                const discount = parseFloat(p.special_promo);
                p_salePrice = p_price - (p_price * discount / 100);
            } else if (p.special_promo) {
                 p_salePrice = p_price - parseFloat(p.special_promo);
            }
            return {
                id: p.slug || p.product_id,
                productId: p.product_id,
                name: p.product_name.trim(),
                description: '',
                longDescription: p.product_description || '',
                price: p_price,
                salePrice: p_salePrice,
                image: `https://kdu-admin.payshia.com/pos-system/assets/images/products/${p.product_id}/${p.image_path}`,
                dataAiHint: 'tea product',
                type: 'Black',
                flavorProfile: [],
                origin: 'Sri Lanka',
            };
        });

        const recs = allFormattedProducts.filter(t => t.id !== formattedProduct.id).slice(0, 4);

        return { tea: formattedProduct, recommendedTeas: recs };

      } catch (error) {
        console.error('Failed to fetch product:', error);
        return { tea: null, recommendedTeas: [] };
      }
}


export async function generateMetadata({ params }: TeaPageProps): Promise<Metadata> {
  const { tea } = await getTeaData(params.slug);

  if (!tea) {
      return {
          title: 'Product not found',
          description: 'The requested product could not be found.',
      };
  }

  const productName = tea.name.trim();
  const description = tea.description || `Discover the exquisite taste of ${productName}, a premium Ceylon tea from Tea Jar.`;

  return {
    title: productName,
    description: description,
    keywords: ['Ceylon tea', 'Sri Lankan tea', 'Tea Jar', productName, tea.type],
    openGraph: {
      title: `${productName} | Tea Jar`,
      description: description,
      type: 'website',
      url: `/products/${params.slug}`,
      images: [
        {
          url: tea.image,
          width: 800,
          height: 800,
          alt: productName,
        },
      ],
    },
  };
}


export default async function TeaPage({ params }: TeaPageProps) {
  const {tea, recommendedTeas} = await getTeaData(params.slug);

  if (!tea) {
    notFound();
  }

  return <ProductDetailClient tea={tea} recommendedTeas={recommendedTeas} />;
}

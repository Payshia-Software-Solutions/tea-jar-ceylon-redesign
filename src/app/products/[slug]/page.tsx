
import type { Tea, ApiProduct, ApiImage, Department, Category, EcomValues } from '@/lib/types';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ProductDetailClient } from '@/components/ProductDetailClient';

interface TeaPageProps {
  params: {
    slug: string;
  };
}

async function getTeaData(slug: string): Promise<{tea: Tea | null, relatedTeas: Tea[], departmentName: string | null}> {
    try {
        const [
            productResponse, 
            allDeptsRes, 
            allCategoriesRes
        ] = await Promise.all([
            fetch(`https://kduserver.payshia.com/products/get-by-slug/${slug}`),
            fetch('https://kduserver.payshia.com/departments'),
            fetch('https://kduserver.payshia.com/categories')
        ]);
        
        if (!productResponse.ok) {
            return { tea: null, relatedTeas: [], departmentName: null };
        }
        
        const apiProduct: ApiProduct = await productResponse.json();
        const allDepts: Department[] = await allDeptsRes.json();
        const allCategories: Category[] = await allCategoriesRes.json();
        
        const categoryMap = new Map(allCategories.map(c => [c.id, c.category_name]));

        // Fetch e-commerce values
        const ecomValuesResponse = await fetch(`https://kduserver.payshia.com/product-ecom-values/by-product/${apiProduct.product_id}`);
        let ecomValues: EcomValues | null = null;
        if (ecomValuesResponse.ok) {
            const ecomData = await ecomValuesResponse.json();
            if (Array.isArray(ecomData) && ecomData.length > 0) {
                ecomValues = ecomData[0];
            } else if (!Array.isArray(ecomData)) {
                ecomValues = ecomData;
            }
        }

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
            description: ecomValues?.detailed_description || apiProduct.product_description || 'A delightful tea from Ceylon.',
            longDescription: apiProduct.how_to_use || '100% Ceylon black tea.',
            price: price,
            salePrice: salePrice,
            image: imageUrl,
            images: galleryImages.length > 0 ? galleryImages : [imageUrl],
            dataAiHint: 'tea product',
            type: 'Black',
            flavorProfile: [],
            origin: 'Sri Lanka',
            netWeight: ecomValues?.net_weight ? `${ecomValues.net_weight} g` : '350.00 g',
            departmentId: apiProduct.department_id,
            categoryId: apiProduct.category_id,
            categoryName: categoryMap.get(apiProduct.category_id),
            stock_status: apiProduct.stock_status,
            tastingNotes: ecomValues?.tasting_notes,
            ingredients: ecomValues?.ingredients,
            teaGrades: ecomValues?.tea_grades,
            caffeineLevel: ecomValues?.caffain_level,
            brewTemp: ecomValues?.breaw_temp,
            usageType: ecomValues?.usage_type,
            waterType: ecomValues?.water_type,
            waterAmount: ecomValues?.water,
            brewDuration: ecomValues?.brew_duration,
            detailedDescription: ecomValues?.detailed_description,
            productType: ecomValues?.product_type,
            servingCount: ecomValues?.serving_count,
            perPackGram: ecomValues?.per_pack_gram,
            tbCount: ecomValues?.tb_count,
        };

        let departmentName: string | null = null;
        let relatedTeas: Tea[] = [];
        
        if(formattedProduct.departmentId){
            // Fetch department name
            const currentDept = allDepts.find(d => d.id === formattedProduct.departmentId);
            if (currentDept) {
                departmentName = currentDept.department_name;
            }

            // Fetch related products from the same department
            const relatedResponse = await fetch(`https://kduserver.payshia.com/products/get-by-department/${formattedProduct.departmentId}`);
            const relatedApiProducts: ApiProduct[] = await relatedResponse.json();

            relatedTeas = relatedApiProducts
                .filter(p => p.slug !== slug) // Filter out the current product
                .map(p => {
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
                        categoryId: p.category_id,
                        categoryName: categoryMap.get(p.category_id),
                        stock_status: p.stock_status,
                    };
                });
        }
        
        return { tea: formattedProduct, relatedTeas, departmentName };

      } catch (error) {
        console.error('Failed to fetch product:', error);
        return { tea: null, relatedTeas: [], departmentName: null };
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
  const {tea, relatedTeas, departmentName} = await getTeaData(params.slug);

  if (!tea) {
    notFound();
  }

  return <ProductDetailClient tea={tea} relatedTeas={relatedTeas} departmentName={departmentName} />;
}

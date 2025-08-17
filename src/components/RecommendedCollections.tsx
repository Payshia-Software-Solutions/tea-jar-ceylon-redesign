
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Department, ApiProduct } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { useState, useEffect } from 'react';

const collectionVideos: Record<string, string> = {
  'Classic Teas': 'https://teajarceylon.com/assets/videos/recommendation/Classic.mp4',
  'Flavored Teas': 'https://teajarceylon.com/assets/videos/recommendation/Flavoured.mp4',
  'Exceptional Teas': 'https://teajarceylon.com/assets/videos/recommendation/Exceptional.mp4',
  'Exclusive Teas': 'https://teajarceylon.com/assets/videos/recommendation/Exclusive.mp4',
  'Organic Teas': 'https://teajarceylon.com/assets/videos/recommendation/Organic.mp4',
  'Factory Teas': 'https://teajarceylon.com/assets/videos/recommendation/Factory-Series.mp4'
};

export function RecommendedCollections() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(collectionVideos['Classic Teas']);
  const [activeAccordionItem, setActiveAccordionItem] = useState('item-0');

  useEffect(() => {
    async function fetchData() {
      try {
        const [departmentsRes, productsRes] = await Promise.all([
          fetch('https://kduserver.payshia.com/departments'),
          fetch('https://kduserver.payshia.com/products')
        ]);

        const departmentsData: Department[] = await departmentsRes.json();
        const productsData: ApiProduct[] = await productsRes.json();

        const filteredDepartments = departmentsData.map(dept => {
            if (dept.department_name === 'Factory Series') {
                return { ...dept, department_name: 'Factory Teas' };
            }
            return dept;
        }).filter(
          (dept) => dept.department_name !== 'Special Offers' && dept.department_name !== 'Gift'
        );

        setDepartments(filteredDepartments);
        setProducts(productsData);

        if (filteredDepartments.length > 0) {
            const firstDeptVideo = collectionVideos[filteredDepartments[0].department_name];
            if(firstDeptVideo) {
                setActiveVideo(firstDeptVideo);
            }
        }

      } catch (error) {
        console.error("Failed to fetch collections data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleValueChange = (departmentName: string) => {
    const videoUrl = collectionVideos[departmentName];
    if (videoUrl) {
      setActiveVideo(videoUrl);
    }
  };

  const handleMobileValueChange = (value: string) => {
    if (!value) return;
    setActiveAccordionItem(value);
    const index = parseInt(value.replace('item-', ''), 10);
    const departmentName = departments[index]?.department_name;
    if (departmentName) {
        handleValueChange(departmentName);
    }
  };

  const getGroupedProducts = (departmentName: string, departmentId: string) => {
    const departmentProducts = products.filter((p) => p.department_id === departmentId);
    
    if (departmentName === 'Flavored Teas' || departmentName === 'Exceptional Teas') {
        const grouped = departmentProducts.reduce((acc, product) => {
            const commonName = product.product_name.split(' ')[0];
            if (!acc[commonName]) {
                acc[commonName] = {
                    name: commonName,
                    link: `/shop?department=${encodeURIComponent(departmentName)}`,
                };
            }
            return acc;
        }, {} as Record<string, {name: string, link: string}>);
        return Object.values(grouped);
    }

    return departmentProducts.map(product => ({
        name: product.product_name,
        link: `/products/${product.slug || product.product_id}`
    }));
  };

  if (loading) {
    return (
        <section className="bg-[#353d32] text-white py-16">
            <div className="container mx-auto px-4">
                <h2 className="font-headline text-3xl md:text-4xl mb-8 text-center">Recommended Collections</h2>
                 <div className="hidden md:grid md:grid-cols-2">
                    <div className="relative min-h-[600px] bg-neutral-800 animate-pulse" />
                    <div className="p-8 md:p-16 flex flex-col justify-start">
                         <div className="h-8 w-1/2 bg-neutral-700 rounded-md animate-pulse mb-8" />
                         <div className="space-y-4">
                            <div className="h-6 w-1/3 bg-neutral-700 rounded-md animate-pulse" />
                            <div className="h-6 w-1/3 bg-neutral-700 rounded-md animate-pulse" />
                            <div className="h-6 w-1/3 bg-neutral-700 rounded-md animate-pulse" />
                            <div className="h-6 w-1/3 bg-neutral-700 rounded-md animate-pulse" />
                         </div>
                    </div>
                 </div>
            </div>
        </section>
    );
  }

  return (
    <section className="bg-[#353d32] text-white">
      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-2">
        <div className="relative min-h-[400px] md:h-[800px]">
           <video
            key={activeVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute z-0 w-full h-full object-cover object-bottom transition-opacity duration-500"
          >
            <source src={activeVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
           <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="p-8 md:p-16 flex flex-col justify-start">
          <h2 className="font-headline text-3xl md:text-4xl mb-8">Recommended Collections</h2>
          <Tabs defaultValue={departments[0]?.department_name} className="flex flex-col md:flex-row gap-8" orientation="vertical" onValueChange={handleValueChange}>
            <TabsList className="bg-transparent flex-shrink-0 items-start p-0">
                <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
                    {departments.map((dept) => (
                        <TabsTrigger
                            key={dept.id}
                            value={dept.department_name}
                            className="text-neutral-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:shadow-none text-lg text-left justify-start p-2 whitespace-nowrap"
                        >
                            {dept.department_name}
                        </TabsTrigger>
                    ))}
                </div>
            </TabsList>
            <div className="w-px bg-neutral-600 hidden md:block" />
            <div className="flex-grow">
              {departments.map((dept) => (
                <TabsContent key={dept.id} value={dept.department_name} className="mt-0">
                  <div className="space-y-6">
                    {getGroupedProducts(dept.department_name, dept.id).map((product) => (
                        <Link href={product.link} key={product.name} className="flex items-center justify-between group">
                          <span className="text-xl font-headline group-hover:text-amber-100 transition-colors">
                            {product.name}
                          </span>
                          <Leaf className="w-5 h-5 text-neutral-500 group-hover:text-amber-100 transition-colors" />
                        </Link>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
      
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="p-8">
            <h2 className="font-headline text-3xl mb-8 text-center">Recommended Collections</h2>
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0" onValueChange={handleMobileValueChange}>
            {departments.map((dept, index) => {
                const videoUrl = collectionVideos[dept.department_name];
                return (
                    <AccordionItem key={dept.id} value={`item-${index}`} className="border-b border-neutral-600/50">
                    <AccordionTrigger className="text-base font-semibold text-left hover:no-underline py-4 text-neutral-100">
                        {dept.department_name}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 px-4">
                        <div className="grid grid-cols-2 gap-4 items-start">
                            {videoUrl && (
                                <div className="relative aspect-[9/16] rounded-lg overflow-hidden">
                                     <video
                                        key={videoUrl}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="absolute z-0 w-full h-full object-cover"
                                    >
                                        <source src={videoUrl} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <div className="absolute inset-0 bg-black/20"></div>
                                </div>
                            )}
                            <div className="space-y-3">
                                {getGroupedProducts(dept.department_name, dept.id).map((product) => (
                                    <Link href={product.link} key={product.name} className="flex items-center justify-between group">
                                    <span className="text-sm font-headline group-hover:text-amber-100 transition-colors">
                                        {product.name}
                                    </span>
                                    <Leaf className="w-4 h-4 text-neutral-500 group-hover:text-amber-100 transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </AccordionContent>
                    </AccordionItem>
                )
            })}
            </Accordion>
        </div>
      </div>
    </section>
  );
}


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
};

export function RecommendedCollections() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(collectionVideos['Classic Teas']);

  useEffect(() => {
    async function fetchData() {
      try {
        const [departmentsRes, productsRes] = await Promise.all([
          fetch('https://kduserver.payshia.com/departments'),
          fetch('https://kduserver.payshia.com/products')
        ]);

        const departmentsData: Department[] = await departmentsRes.json();
        const productsData: ApiProduct[] = await productsRes.json();

        // Filter out unwanted departments
        const allowedDepartmentIds = ["1", "2", "3", "4", "6"];
        const filteredDepartments = departmentsData.filter(dep => allowedDepartmentIds.includes(dep.id));
        
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
        <div className="relative min-h-[300px] md:min-h-[600px]">
           <video
            key={activeVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute z-0 w-full h-full object-cover transition-opacity duration-500"
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
                    {products
                      .filter((product) => product.department_id === dept.id)
                      .map((product) => (
                        <Link href={`/products/${product.slug || product.product_id}`} key={product.product_id} className="flex items-center justify-between group">
                          <span className="text-xl font-headline group-hover:text-amber-100 transition-colors">
                            {product.product_name}
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
      <div className="md:hidden p-8">
        <h2 className="font-headline text-3xl md:text-4xl mb-8 text-center">Recommended Collections</h2>
        <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
          {departments.map((dept, index) => (
            <AccordionItem key={dept.id} value={`item-${index}`} className="border-b border-neutral-600/50">
              <AccordionTrigger className="text-base md:text-lg font-semibold text-left hover:no-underline py-4 text-neutral-100">
                {dept.department_name}
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                 <div className="space-y-4">
                    {products
                      .filter((product) => product.department_id === dept.id)
                      .map((product) => (
                        <Link href={`/products/${product.slug || product.product_id}`} key={product.product_id} className="flex items-center justify-between group">
                          <span className="text-lg font-headline group-hover:text-amber-100 transition-colors">
                            {product.product_name}
                          </span>
                          <Leaf className="w-5 h-5 text-neutral-500 group-hover:text-amber-100 transition-colors" />
                        </Link>
                      ))}
                  </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

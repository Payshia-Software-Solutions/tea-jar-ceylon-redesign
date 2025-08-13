
'use client';

import { useState, useEffect } from 'react';
import type { Tea } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { DepartmentShowcase } from '@/components/DepartmentShowcase';

interface Department {
    id: string;
    department_name: string;
}

export default function ShopPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDepartments() {
        try {
            const response = await fetch('https://kduserver.payshia.com/departments');
            const data: Department[] = await response.json();
            // Filter out "Special Offers" as per user flow, can be changed later
            const filteredDepartments = data.filter(dep => dep.department_name !== 'Special Offers');
            setDepartments(filteredDepartments);
        } catch (error) {
            console.error('Failed to fetch departments:', error);
        } finally {
            setLoading(false);
        }
    }

    fetchDepartments();
  }, []);

  return (
    <div className="bg-[#353d32] text-white min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="font-headline text-5xl md:text-6xl">Our Tea Collection</h1>
          <p className="text-lg text-neutral-300 mt-4 max-w-2xl mx-auto">
            Explore our curated selection of the finest Ceylon teas, organized by collection.
          </p>
        </div>
        
        <Separator className="bg-neutral-700/50 my-8" />

        <main className="space-y-16">
            {loading ? (
                 <>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="space-y-8">
                            <Skeleton className="h-10 w-1/3 mx-auto" />
                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="p-1 space-y-4">
                                        <Skeleton className="h-[250px] w-full rounded-lg" />
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                departments.map(department => (
                    <DepartmentShowcase key={department.id} department={department} />
                ))
            )}
        </main>
      </div>
    </div>
  );
}

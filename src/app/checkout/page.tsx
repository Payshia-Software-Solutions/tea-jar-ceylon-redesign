
'use client';

import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Tag } from 'lucide-react';

const checkoutSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  country: z.string().min(1, { message: 'Country is required.' }),
  firstName: z.string().min(1, { message: 'First name is required.' }),
  lastName: z.string().min(1, { message: 'Last name is required.' }),
  address: z.string().min(1, { message: 'Address is required.' }),
  apartment: z.string().optional(),
  city: z.string().min(1, { message: 'City is required.' }),
  postalCode: z.string().min(1, { message: 'Postal code is required.' }),
  phone: z.string().optional(),
  saveInfo: z.boolean().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const totalPrice = getTotalPrice();
  const shippingCost = 0; // Assuming free shipping
  const total = totalPrice + shippingCost;

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
        email: '',
        country: 'Sri Lanka',
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        postalCode: '',
        phone: '',
        saveInfo: false,
    }
  });

  function onSubmit(data: CheckoutFormValues) {
    console.log('Form Submitted:', data);
    // Here you would typically process the payment
    alert('Payment successful! (Simulation)');
    clearCart();
    form.reset();
  }

  return (
    <div className="bg-[#1a1a1a] text-white min-h-screen">
        <div className="grid lg:grid-cols-2 min-h-screen">
            
            {/* Left Side - Form */}
            <div className="py-12 px-4 sm:px-6 lg:px-12 bg-[#2a2f28] flex flex-col justify-center">
                <div className="max-w-lg mx-auto w-full">
                    <h1 className="font-headline text-3xl mb-2 text-center text-white">Tea Jar</h1>
                    <nav className="text-sm text-center text-neutral-300 mb-10" aria-label="Breadcrumb">
                        <ol className="flex items-center justify-center space-x-2">
                            <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
                            <li><span className="text-neutral-500">›</span></li>
                            <li className="font-semibold text-white">Information</li>
                            <li><span className="text-neutral-500">›</span></li>
                            <li className="text-neutral-500">Shipping</li>
                             <li><span className="text-neutral-500">›</span></li>
                            <li className="text-neutral-500">Payment</li>
                        </ol>
                    </nav>
                    
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Contact Information</h2>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email" {...field} className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400" />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Shipping Address</h2>
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country/Region</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                                                <SelectValue placeholder="Select a country" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
                                            <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                                            <SelectItem value="United States">United States</SelectItem>
                                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                        </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <div className="grid md:grid-cols-2 gap-4">
                                     <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400" />
                                                </FormControl>
                                                 <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="apartment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Apartment, suite, etc. (optional)</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <div className="grid md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>City</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="postalCode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Postal Code</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                 <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone (optional)</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            
                             <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4">
                                <Link href="/shop" className="text-amber-200/80 hover:text-amber-200/100 flex items-center gap-2 text-sm">
                                    <ArrowLeft className="w-4 h-4" />
                                    Return to shop
                                </Link>
                                <Button type="submit" size="lg" className="w-full sm:w-auto bg-amber-200/80 text-black hover:bg-amber-200/100">
                                    Continue to Shipping
                                </Button>
                            </div>
                        </form>
                    </Form>

                    <Separator className="my-8 bg-neutral-700" />
                     <p className="text-xs text-center text-neutral-400">All rights reserved Tea Jar</p>
                </div>
            </div>

            {/* Right Side - Order Summary */}
            <div className="py-12 px-4 sm:px-6 lg:px-12 bg-[#1a1a1a] flex flex-col justify-center">
                 <div className="max-w-lg mx-auto w-full">
                    {items.length > 0 ? (
                        <div className="space-y-4">
                            {items.map(item => (
                                <div key={item.product.id} className="flex items-center gap-4">
                                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-neutral-700 bg-white">
                                        <Image
                                        src={item.product.image}
                                        alt={item.product.name}
                                        fill
                                        className="object-contain p-1"
                                        unoptimized
                                        />
                                        <div className="absolute -top-2 -right-2 bg-neutral-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                                            {item.quantity}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{item.product.name}</h3>
                                        <p className="text-sm text-neutral-400">Weight: 175g</p>
                                    </div>
                                    <p className="font-semibold">Rs {(item.product.salePrice ?? item.product.price).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-neutral-400">Your cart is empty.</p>
                        </div>
                    )}
                    
                    <Separator className="my-6 bg-neutral-700" />

                    <div className="flex items-center gap-4">
                        <Input placeholder="Discount code" className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400" />
                        <Button className="bg-neutral-700 text-white hover:bg-neutral-600" >Apply</Button>
                    </div>

                    <Separator className="my-6 bg-neutral-700" />

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-neutral-400">Subtotal</span>
                            <span className="font-semibold">Rs {totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-400">Shipping</span>
                            <span className="font-semibold">{shippingCost > 0 ? `Rs ${shippingCost.toFixed(2)}` : 'Free'}</span>
                        </div>
                    </div>
                    
                    <Separator className="my-6 bg-neutral-700" />

                    <div className="flex justify-between items-baseline">
                        <span className="text-lg">Total</span>
                        <div className="flex items-baseline gap-2">
                             <span className="text-xs text-neutral-400">LKR</span>
                             <span className="text-2xl font-bold">Rs {total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Button 
                            onClick={form.handleSubmit(onSubmit)} 
                            size="lg" 
                            className="w-full bg-amber-200/80 text-black hover:bg-amber-200/100 text-lg font-bold"
                            disabled={items.length === 0}
                        >
                            <CreditCard className="w-5 h-5 mr-2" />
                            Pay Now
                        </Button>
                    </div>

                 </div>
            </div>

        </div>
    </div>
  );
}

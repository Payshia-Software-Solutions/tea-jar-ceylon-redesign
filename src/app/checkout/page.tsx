
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
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CreditCard, Banknote, AlertTriangle } from 'lucide-react';

const checkoutSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  emailOffers: z.boolean().optional(),
  country: z.string().min(1, { message: 'Country is required.' }),
  firstName: z.string().optional(),
  lastName: z.string().min(1, { message: 'Last name is required.' }),
  address: z.string().min(1, { message: 'Address is required.' }),
  apartment: z.string().optional(),
  city: z.string().min(1, { message: 'City is required.' }),
  postalCode: z.string().min(1, { message: 'Postal code is required.' }),
  phone: z.string().optional(),
  saveInfo: z.boolean().optional(),
  billingAddress: z.enum(['same', 'different']).default('same'),
  paymentMethod: z.enum(['payhere', 'cod']).default('payhere'),
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
        emailOffers: false,
        country: 'Sri Lanka',
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        postalCode: '',
        phone: '',
        saveInfo: false,
        billingAddress: 'same',
        paymentMethod: 'payhere',
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
    <div className="bg-[#353d32] text-white min-h-screen font-sans">
        <div className="grid lg:grid-cols-2 min-h-screen pt-24">
            
            {/* Left Side - Form */}
            <div className="py-8 px-4 sm:px-6 lg:px-12 border-r border-neutral-700 flex flex-col items-end">
                <div className="max-w-xl w-full mx-auto lg:mr-0 space-y-8">
                    <h1 className="font-headline text-3xl mb-2 text-left text-white">Tea Jar</h1>
                    
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                            {/* Contact */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold">Contact</h2>
                                    <Link href="#" className="text-sm text-blue-400 hover:underline">Log in</Link>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Enter your email" {...field} className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-amber-300 focus:ring-amber-300" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="emailOffers"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-neutral-500 data-[state=checked]:bg-amber-200 data-[state=checked]:text-black" />
                                            </FormControl>
                                            <Label htmlFor="emailOffers" className="font-normal text-neutral-300">Email me with news and offers</Label>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Delivery */}
                             <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Delivery</h2>
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white focus:border-amber-300 focus:ring-amber-300">
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
                                                <FormControl>
                                                    <Input placeholder="First name (optional)" {...field} className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-amber-300 focus:ring-amber-300" />
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
                                                <FormControl>
                                                    <Input placeholder="Last name" {...field} className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-amber-300 focus:ring-amber-300" />
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
                                            <FormControl>
                                                <Input placeholder="Address" {...field} className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-amber-300 focus:ring-amber-300" />
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
                                            <FormControl>
                                                <Input placeholder="Apartment, suite, etc. (optional)" {...field} className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-amber-300 focus:ring-amber-300" />
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
                                                <FormControl>
                                                    <Input placeholder="City" {...field} className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-amber-300 focus:ring-amber-300" />
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
                                                <FormControl>
                                                    <Input placeholder="Postal Code" {...field} className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-amber-300 focus:ring-amber-300" />
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
                                            <FormControl>
                                                <Input placeholder="Phone" {...field} className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-amber-300 focus:ring-amber-300" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="saveInfo"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2 space-y-0 pt-2">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-neutral-500 data-[state=checked]:bg-amber-200 data-[state=checked]:text-black" />
                                            </FormControl>
                                            <Label htmlFor="saveInfo" className="font-normal text-neutral-300">Save this information for next time</Label>
                                        </FormItem>
                                    )}
                                />
                            </div>

                             {/* Billing Address */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Billing Address</h2>
                                <FormField
                                    control={form.control}
                                    name="billingAddress"
                                    render={({ field }) => (
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-0">
                                        <div className="border border-neutral-700 rounded-t-md p-4 flex items-center space-x-3 has-[:checked]:bg-amber-200/10 has-[:checked]:border-amber-300/50">
                                            <FormControl>
                                                <RadioGroupItem value="same" id="same" className="border-neutral-500 text-amber-200" />
                                            </FormControl>
                                            <Label htmlFor="same" className="font-normal w-full text-neutral-300">Same as shipping address</Label>
                                        </div>
                                         <div className="border border-t-0 border-neutral-700 rounded-b-md p-4 flex items-center space-x-3 has-[:checked]:bg-amber-200/10 has-[:checked]:border-amber-300/50">
                                            <FormControl>
                                                <RadioGroupItem value="different" id="different" className="border-neutral-500 text-amber-200" />
                                            </FormControl>
                                            <Label htmlFor="different" className="font-normal w-full text-neutral-300">Use a different billing address</Label>
                                        </div>
                                    </RadioGroup>
                                    )}
                                />
                            </div>

                            {/* Shipping Method */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Shipping method</h2>
                                <div className="border border-neutral-700 rounded-md p-4 flex justify-between items-center bg-neutral-800/50">
                                    <p>Standard Shipping</p>
                                    <p className="font-semibold">Rs 0</p>
                                </div>
                            </div>
                        </form>
                    </Form>

                    <div className="py-8">
                        <Link href="/shop" className="text-blue-400 text-sm hover:underline">
                           &larr; Return to cart
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Side - Order Summary */}
            <div className="py-8 px-4 sm:px-6 lg:px-12 bg-[#2a2f28] flex flex-col items-start">
                 <div className="max-w-xl w-full mx-auto lg:ml-0 space-y-6">
                    {items.length > 0 ? (
                        <div className="space-y-4">
                            {items.map(item => (
                                <div key={item.product.id} className="flex items-center gap-4">
                                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-neutral-700 bg-white">
                                        <Image
                                        src={item.product.image}
                                        alt={item.product.name}
                                        fill
                                        className="object-contain p-1"
                                        unoptimized
                                        />
                                        <div className="absolute -top-2 -right-2 bg-neutral-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {item.quantity}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm text-white">{item.product.name}</h3>
                                        <div className="flex items-baseline gap-2 text-xs">
                                            {item.product.salePrice ? (
                                                <>
                                                  <span className="text-neutral-400 line-through">LKR {item.product.price.toFixed(2)}</span>
                                                  <span className="text-white font-medium">LKR {item.product.salePrice.toFixed(2)}</span>
                                                </>
                                            ): (
                                                 <span className="text-white font-medium">LKR {item.product.price.toFixed(2)}</span>
                                            )}
                                            
                                        </div>
                                    </div>
                                    <p className="font-medium text-sm text-white">LKR {(item.product.salePrice ?? item.product.price).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-neutral-500">Your cart is empty.</p>
                        </div>
                    )}
                    
                    <Separator className="my-6 bg-neutral-700" />

                    <div className="flex items-center gap-4">
                        <Input placeholder="Discount code or gift card" className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-amber-300 focus:ring-amber-300" />
                        <Button className="bg-neutral-600 text-neutral-200 hover:bg-neutral-700" >Apply</Button>
                    </div>

                    <Separator className="my-6 bg-neutral-700" />

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-neutral-400">Subtotal</span>
                            <span className="font-semibold text-white">Rs {totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-400">Shipping</span>
                            <span className="font-semibold text-white">{shippingCost > 0 ? `Rs ${shippingCost.toFixed(2)}` : 'Rs 0.00'}</span>
                        </div>
                    </div>
                    
                    <Separator className="my-6 bg-neutral-700" />

                    <div className="flex justify-between items-baseline">
                        <span className="text-lg text-white">Total</span>
                        <div className="flex items-baseline gap-2">
                             <span className="text-sm text-neutral-400">LKR</span>
                             <span className="text-2xl font-bold text-white">Rs {total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="space-y-6 pt-6">
                        <div>
                            <h2 className="text-xl font-semibold text-white">Payment</h2>
                            <p className="text-sm text-neutral-400">All transactions are secure and encrypted.</p>
                        </div>
                        <RadioGroup name="paymentMethod" defaultValue="payhere" className="space-y-0">
                            <div className="border border-amber-300/80 rounded-t-md has-[:checked]:bg-amber-200/10">
                                <div className="p-4 flex items-center space-x-3">
                                    <RadioGroupItem value="payhere" id="payhere" className="border-neutral-500 text-amber-200" />
                                    <Label htmlFor="payhere" className="font-normal w-full text-neutral-300">Bank Card / Bank Account - PayHere</Label>
                                </div>
                                <div className="bg-neutral-800/60 px-4 py-6 text-center text-neutral-400 text-sm space-y-4">
                                     <CreditCard className="w-10 h-10 text-neutral-500 mx-auto" />
                                     <p>After clicking "Pay now", you will be redirected to Bank Card / Bank Account - PayHere to complete your purchase securely.</p>
                                </div>
                            </div>
                            <div className="border border-t-0 border-neutral-700 rounded-b-md p-4 flex items-center space-x-3 has-[:checked]:bg-amber-200/10 has-[:checked]:border-amber-300/50">
                                <RadioGroupItem value="cod" id="cod" className="border-neutral-500 text-amber-200" />
                                <Label htmlFor="cod" className="font-normal w-full text-neutral-300">Cash On Delivery</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <Alert className="bg-yellow-900/30 border-yellow-300/30 text-yellow-200">
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                        <AlertTitle className="font-semibold text-yellow-300">Important Notice</AlertTitle>
                        <AlertDescription className="text-xs text-yellow-300/80">
                           Please do not close your tab or browser after completing your payment. Kindly remain on this tab/browser until you are redirected to the order confirmation page to ensure that your transaction is processed successfully.
                        </AlertDescription>
                    </Alert>

                    <div className="mt-8">
                        <Button 
                            onClick={form.handleSubmit(onSubmit)} 
                            size="lg" 
                            className="w-full bg-white text-black hover:bg-neutral-200 text-lg font-bold"
                            disabled={items.length === 0}
                        >
                            Pay Now
                        </Button>
                    </div>

                 </div>
            </div>

        </div>
    </div>
  );
}

    

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
  lastName: z.string().optional(),
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
    <div className="bg-white text-black min-h-screen font-sans">
        <div className="grid lg:grid-cols-2 min-h-screen">
            
            {/* Left Side - Form */}
            <div className="py-8 px-4 sm:px-6 lg:px-12 border-r border-neutral-200 flex flex-col items-end">
                <div className="max-w-xl w-full mx-auto lg:mr-0 space-y-8">
                    <h1 className="font-headline text-3xl mb-2 text-left text-black">Tea Jar</h1>
                    
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                            {/* Contact */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold">Contact</h2>
                                    <Link href="#" className="text-sm text-blue-600 hover:underline">Log in</Link>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Enter your email" {...field} className="bg-white border-neutral-300 focus:border-black focus:ring-black" />
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
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <Label htmlFor="emailOffers" className="font-normal">Email me with news and offers</Label>
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
                                            <SelectTrigger className="bg-white border-neutral-300 focus:border-black focus:ring-black">
                                                <SelectValue placeholder="Select a country" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-white border-neutral-300 text-black">
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
                                                    <Input placeholder="First name (optional)" {...field} className="bg-white border-neutral-300 focus:border-black focus:ring-black" />
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
                                                    <Input placeholder="Last name" {...field} className="bg-white border-neutral-300 focus:border-black focus:ring-black" />
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
                                                <Input placeholder="Address" {...field} className="bg-white border-neutral-300 focus:border-black focus:ring-black" />
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
                                                <Input placeholder="Apartment, suite, etc. (optional)" {...field} className="bg-white border-neutral-300 focus:border-black focus:ring-black" />
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
                                                    <Input placeholder="City" {...field} className="bg-white border-neutral-300 focus:border-black focus:ring-black" />
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
                                                    <Input placeholder="Postal Code" {...field} className="bg-white border-neutral-300 focus:border-black focus:ring-black" />
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
                                                <Input placeholder="Phone" {...field} className="bg-white border-neutral-300 focus:border-black focus:ring-black" />
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
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <Label htmlFor="saveInfo" className="font-normal">Save this information for next time</Label>
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
                                        <div className="border border-neutral-300 rounded-t-md p-4 flex items-center space-x-3 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500">
                                            <FormControl>
                                                <RadioGroupItem value="same" id="same" />
                                            </FormControl>
                                            <Label htmlFor="same" className="font-normal w-full">Same as shipping address</Label>
                                        </div>
                                         <div className="border border-t-0 border-neutral-300 rounded-b-md p-4 flex items-center space-x-3 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500">
                                            <FormControl>
                                                <RadioGroupItem value="different" id="different" />
                                            </FormControl>
                                            <Label htmlFor="different" className="font-normal w-full">Use a different billing address</Label>
                                        </div>
                                    </RadioGroup>
                                    )}
                                />
                            </div>

                            {/* Shipping Method */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Shipping method</h2>
                                <div className="border border-neutral-300 rounded-md p-4 flex justify-between items-center bg-neutral-100/50">
                                    <p>Standard Shipping</p>
                                    <p className="font-semibold">Rs 0</p>
                                </div>
                            </div>
                        </form>
                    </Form>

                    <div className="py-8">
                        <Link href="/shop" className="text-blue-600 text-sm hover:underline">
                           &larr; Return to cart
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Side - Order Summary */}
            <div className="py-8 px-4 sm:px-6 lg:px-12 bg-neutral-50/70 flex flex-col items-start">
                 <div className="max-w-xl w-full mx-auto lg:ml-0 space-y-6">
                    {items.length > 0 ? (
                        <div className="space-y-4">
                            {items.map(item => (
                                <div key={item.product.id} className="flex items-center gap-4">
                                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-neutral-300 bg-white">
                                        <Image
                                        src={item.product.image}
                                        alt={item.product.name}
                                        fill
                                        className="object-contain p-1"
                                        unoptimized
                                        />
                                        <div className="absolute -top-2 -right-2 bg-neutral-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {item.quantity}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm">{item.product.name}</h3>
                                        <div className="flex items-baseline gap-2 text-xs">
                                            {item.product.salePrice ? (
                                                <>
                                                  <span className="text-neutral-500 line-through">LKR {item.product.price.toFixed(2)}</span>
                                                  <span className="text-black font-medium">LKR {item.product.salePrice.toFixed(2)}</span>
                                                </>
                                            ): (
                                                 <span className="text-black font-medium">LKR {item.product.price.toFixed(2)}</span>
                                            )}
                                            
                                        </div>
                                    </div>
                                    <p className="font-medium text-sm">LKR {(item.product.salePrice ?? item.product.price).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-neutral-500">Your cart is empty.</p>
                        </div>
                    )}
                    
                    <Separator className="my-6 bg-neutral-300" />

                    <div className="flex items-center gap-4">
                        <Input placeholder="Discount code or gift card" className="bg-white border-neutral-300 focus:border-black focus:ring-black" />
                        <Button className="bg-neutral-300 text-neutral-600 hover:bg-neutral-400" >Apply</Button>
                    </div>

                    <Separator className="my-6 bg-neutral-300" />

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-neutral-600">Subtotal</span>
                            <span className="font-semibold">Rs {totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-600">Shipping</span>
                            <span className="font-semibold">{shippingCost > 0 ? `Rs ${shippingCost.toFixed(2)}` : 'Rs 0.00'}</span>
                        </div>
                    </div>
                    
                    <Separator className="my-6 bg-neutral-300" />

                    <div className="flex justify-between items-baseline">
                        <span className="text-lg">Total</span>
                        <div className="flex items-baseline gap-2">
                             <span className="text-sm text-neutral-600">LKR</span>
                             <span className="text-2xl font-bold">Rs {total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="space-y-6 pt-6">
                        <div>
                            <h2 className="text-xl font-semibold">Payment</h2>
                            <p className="text-sm text-neutral-600">All transactions are secure and encrypted.</p>
                        </div>
                        <RadioGroup name="paymentMethod" defaultValue="payhere" className="space-y-0">
                            <div className="border border-blue-500 rounded-t-md has-[:checked]:bg-blue-50">
                                <div className="p-4 flex items-center space-x-3">
                                    <RadioGroupItem value="payhere" id="payhere" />
                                    <Label htmlFor="payhere" className="font-normal w-full">Bank Card / Bank Account - PayHere</Label>
                                </div>
                                <div className="bg-neutral-100/80 px-4 py-6 text-center text-neutral-600 text-sm space-y-4">
                                     <CreditCard className="w-10 h-10 text-neutral-500 mx-auto" />
                                     <p>After clicking "Pay now", you will be redirected to Bank Card / Bank Account - PayHere to complete your purchase securely.</p>
                                </div>
                            </div>
                            <div className="border border-t-0 border-neutral-300 rounded-b-md p-4 flex items-center space-x-3 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500">
                                <RadioGroupItem value="cod" id="cod" />
                                <Label htmlFor="cod" className="font-normal w-full">Cash On Delivery</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <Alert className="bg-yellow-100 border-yellow-300 text-yellow-800">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <AlertTitle className="font-semibold">Important Notice</AlertTitle>
                        <AlertDescription className="text-xs">
                           Please do not close your tab or browser after completing your payment. Kindly remain on this tab/browser until you are redirected to the order confirmation page to ensure that your transaction is processed successfully.
                        </AlertDescription>
                    </Alert>

                    <div className="mt-8">
                        <Button 
                            onClick={form.handleSubmit(onSubmit)} 
                            size="lg" 
                            className="w-full bg-black text-white hover:bg-neutral-800 text-lg font-bold"
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

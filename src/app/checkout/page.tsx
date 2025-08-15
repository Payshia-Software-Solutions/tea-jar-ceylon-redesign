
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
import { cn } from '@/lib/utils';
import * as fbq from '@/lib/fpixel';
import { useEffect } from 'react';

const checkoutSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  emailOffers: z.boolean().optional(),
  // Shipping Address
  shippingCountry: z.string().min(1, { message: 'Country is required.' }),
  shippingFirstName: z.string().optional(),
  shippingLastName: z.string().min(1, { message: 'Last name is required.' }),
  shippingAddress: z.string().min(1, { message: 'Address is required.' }),
  shippingApartment: z.string().optional(),
  shippingCity: z.string().min(1, { message: 'City is required.' }),
  shippingPostalCode: z.string().min(1, { message: 'Postal code is required.' }),
  shippingPhone: z.string().optional(),
  saveInfo: z.boolean().optional(),
  // Billing Logic
  billingAddress: z.enum(['same', 'different']).default('same'),
  paymentMethod: z.enum(['payhere', 'cod', 'mintpay']).default('payhere'),
  // Billing Address (optional based on selection)
  billingCountry: z.string().optional(),
  billingFirstName: z.string().optional(),
  billingLastName: z.string().optional(),
  billingAddressLine: z.string().optional(),
  billingApartment: z.string().optional(),
billingCity: z.string().optional(),
  billingPostalCode: z.string().optional(),
  billingPhone: z.string().optional(),
}).refine(data => {
    if (data.billingAddress === 'different') {
        return !!data.billingCountry && !!data.billingLastName && !!data.billingAddressLine && !!data.billingCity && !!data.billingPostalCode;
    }
    return true;
}, {
    message: "Billing address fields are required when using a different billing address.",
    // We can't apply this to a specific path, so we'll just have to show a general error or handle it in the UI.
    // This is a limitation of Zod's `refine` on the object level.
    // We will handle required messages on the individual fields for better UX.
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
        shippingCountry: 'Sri Lanka',
        shippingFirstName: '',
        shippingLastName: '',
        shippingAddress: '',
        shippingApartment: '',
        shippingCity: '',
        shippingPostalCode: '',
        shippingPhone: '',
        saveInfo: false,
        billingAddress: 'same',
        paymentMethod: 'payhere',
        billingCountry: 'Sri Lanka',
    }
  });

  const watchBillingAddress = form.watch('billingAddress');
  const watchPaymentMethod = form.watch('paymentMethod');


  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
        fbq.event('InitiateCheckout');
    }
  }, []);

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
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
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
                                    name="shippingCountry"
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
                                        name="shippingFirstName"
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
                                        name="shippingLastName"
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
                                    name="shippingAddress"
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
                                    name="shippingApartment"
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
                                        name="shippingCity"
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
                                        name="shippingPostalCode"
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
                                    name="shippingPhone"
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
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
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
                                        <div className={cn("border border-neutral-700 rounded-t-md p-4 flex items-center space-x-3 has-[:checked]:bg-amber-200/10 has-[:checked]:border-amber-300/50", watchBillingAddress === 'different' ? 'rounded-b-none' : 'rounded-b-md')}>
                                            <FormControl>
                                                <RadioGroupItem value="same" id="same" />
                                            </FormControl>
                                            <Label htmlFor="same" className="font-normal w-full text-neutral-300">Same as shipping address</Label>
                                        </div>
                                         <div className="border border-t-0 border-neutral-700 p-4 flex items-center space-x-3 has-[:checked]:bg-amber-200/10 has-[:checked]:border-amber-300/50 rounded-b-md">
                                            <FormControl>
                                                <RadioGroupItem value="different" id="different" />
                                            </FormControl>
                                            <Label htmlFor="different" className="font-normal w-full text-neutral-300">Use a different billing address</Label>
                                        </div>
                                    </RadioGroup>
                                    )}
                                />

                                {watchBillingAddress === 'different' && (
                                     <div className="border border-neutral-700 rounded-md p-4 space-y-4 bg-neutral-800/20">
                                        <h3 className="font-semibold text-lg text-white">Enter Billing Address</h3>
                                         <FormField
                                            control={form.control}
                                            name="billingCountry"
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
                                                name="billingFirstName"
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
                                                name="billingLastName"
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
                                            name="billingAddressLine"
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
                                            name="billingApartment"
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
                                                name="billingCity"
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
                                                name="billingPostalCode"
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
                                            name="billingPhone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder="Phone (optional)" {...field} className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-amber-300 focus:ring-amber-300" />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}
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
                        <Link href="/shop">
                            <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black">
                               &larr; Return to Shopping
                            </Button>
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
                                        <div className="absolute -top-2 -right-2 bg-amber-200 text-black font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {item.quantity}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm text-white">{item.product.name}</h3>
                                        <p className="text-neutral-400 text-xs">
                                          Qty: {item.quantity}
                                        </p>
                                        <div className="flex items-baseline gap-2 text-xs">
                                            {item.product.salePrice ? (
                                                <>
                                                  <span className="text-neutral-400 line-through">LKR {item.product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                                  <span className="text-white font-medium">LKR {item.product.salePrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                                </>
                                            ): (
                                                 <span className="text-white font-medium">LKR {item.product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                            )}
                                            
                                        </div>
                                    </div>
                                    <p className="font-medium text-sm text-white">LKR {(item.quantity * (item.product.salePrice ?? item.product.price)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
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
                            <span className="font-semibold text-white">Rs {totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-400">Shipping</span>
                            <span className="font-semibold text-white">{shippingCost > 0 ? `Rs ${shippingCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Rs 0.00'}</span>
                        </div>
                    </div>
                    
                    <Separator className="my-6 bg-neutral-700" />

                    <div className="flex justify-between items-baseline">
                        <span className="text-lg text-white">Total</span>
                        <div className="flex items-baseline gap-2">
                             <span className="text-sm text-neutral-400">LKR</span>
                             <span className="text-2xl font-bold text-white">Rs {total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="space-y-6 pt-6">
                        <div>
                            <h2 className="text-xl font-semibold text-white">Payment</h2>
                            <p className="text-sm text-neutral-400">All transactions are secure and encrypted.</p>
                        </div>
                        
                        <Form {...form}>
                            <FormField
                                control={form.control}
                                name="paymentMethod"
                                render={({ field }) => (
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-0">
                                    {/* PayHere Option */}
                                    <div className={cn("border rounded-t-md has-[:checked]:bg-amber-200/10 has-[:checked]:border-amber-300/50", watchPaymentMethod === 'payhere' ? "border-amber-300/80" : "border-neutral-700")}>
                                        <div className="p-4 flex items-center space-x-3">
                                            <FormControl>
                                                <RadioGroupItem value="payhere" id="payhere" />
                                            </FormControl>
                                            <Label htmlFor="payhere" className="font-normal w-full text-neutral-300">Bank Card / Bank Account - PayHere</Label>
                                        </div>
                                        {watchPaymentMethod === 'payhere' && (
                                            <div className="bg-neutral-800/60 px-4 py-6 text-center text-neutral-400 text-sm space-y-4">
                                                <CreditCard className="w-10 h-10 text-neutral-500 mx-auto" />
                                                <p>After clicking "Pay now", you will be redirected to Bank Card / Bank Account - PayHere to complete your purchase securely.</p>
                                            </div>
                                        )}
                                    </div>
                                    {/* Mintpay Option */}
                                    <div className={cn("border border-t-0 has-[:checked]:bg-amber-200/10 has-[:checked]:border-amber-300/50", watchPaymentMethod === 'mintpay' ? "border-amber-300/80" : "border-neutral-700")}>
                                        <div className="p-4 flex items-center space-x-3">
                                            <FormControl>
                                                <RadioGroupItem value="mintpay" id="mintpay" />
                                            </FormControl>
                                            <Label htmlFor="mintpay" className="font-normal w-full text-neutral-300 flex items-center justify-between">
                                                <span>Pay with Mintpay</span>
                                                <Image src="https://content-provider.payshia.com/tea-jar/mintpay-pill.png" alt="Mintpay" width={80} height={20} />
                                            </Label>
                                        </div>
                                         {watchPaymentMethod === 'mintpay' && (
                                            <div className="bg-neutral-800/60 px-4 py-6 text-center text-neutral-400 text-sm space-y-4">
                                                <p>Pay in 3 interest-free installments. After clicking "Pay now", you will be redirected to Mintpay to complete your purchase.</p>
                                            </div>
                                        )}
                                    </div>
                                    {/* Cash on Delivery Option */}
                                    <div className={cn("border border-t-0 rounded-b-md p-4 flex items-center space-x-3 has-[:checked]:bg-amber-200/10 has-[:checked]:border-amber-300/50", watchPaymentMethod === 'cod' ? "border-amber-300/80" : "border-neutral-700")}>
                                        <FormControl>
                                            <RadioGroupItem value="cod" id="cod" />
                                        </FormControl>
                                        <Label htmlFor="cod" className="font-normal w-full text-neutral-300">Cash On Delivery</Label>
                                    </div>
                                </RadioGroup>
                                )}
                            />
                        </Form>
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

    
    
    

    

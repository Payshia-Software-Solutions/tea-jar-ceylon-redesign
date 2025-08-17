
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Shipping Policy',
    description: 'Information about our delivery and return policies for Tea Jar Ceylon.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-[#2a2f28] text-white pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-headline text-4xl md:text-5xl text-center mb-12">Delivery and Return Policy</h1>
        <div className="prose prose-invert prose-p:text-neutral-300 prose-headings:text-white prose-a:text-amber-200 hover:prose-a:text-white max-w-none space-y-6">
          
          <h2 className="font-headline text-2xl">Delivery Policy</h2>
          <p>
            You can track your order via the local courier service's website or by logging into your Tea Jar Ceylon account. We provide island-wide delivery service to any address you specify. All prices and special offers available on this site are only applicable for deliveries carried out by our partnered courier companies.
          </p>

          <h2 className="font-headline text-2xl">Return Policy</h2>
          <p>
            We are confident that you will enjoy our tea products. However, if you need to return your order, please contact us at <a href="mailto:marketing@teajarceylon.com">marketing@teajarceylon.com</a>. Our goal is your satisfaction.
          </p>

          <h3 className="font-headline text-xl">Conditions for Returning Products:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>The product must be shipped back to us. Return shipping costs are non-refundable unless the return is due to our error, such as a product defect.</li>
            <li>We can accept product returns up to 30 days after delivery.</li>
            <li>We cannot accept a product return that has been largely consumed (more than two servings).</li>
            <li>We cannot accept a product return if you have simply changed your mind, such as a preference for a different tea.</li>
          </ul>
          
          <p>
            If you have any questions or concerns about our delivery or return policy, please contact us at <a href="mailto:marketing@teajarceylon.com">marketing@teajarceylon.com</a>.
          </p>

        </div>
      </div>
    </div>
  );
}

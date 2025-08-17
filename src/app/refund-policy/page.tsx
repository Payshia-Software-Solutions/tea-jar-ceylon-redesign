
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Refund Policy',
    description: 'Our return policy is valid for 30 days from the date of purchase. Learn more about our refund process and eligibility.',
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-[#2a2f28] text-white pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-headline text-4xl md:text-5xl text-center mb-12">Refund Policy</h1>
        <div className="prose prose-invert prose-p:text-neutral-300 prose-headings:text-white prose-a:text-amber-200 hover:prose-a:text-white max-w-none space-y-6">
          
          <h2 className="font-headline text-2xl">Returns</h2>
          <p>
            Our return policy is valid for 30 days from the date of purchase. If 30 days have passed since your purchase, unfortunately, we are unable to offer a refund or exchange.
          </p>
          <p>
            To be eligible for a return, your item must be unused and in the same condition that you received it. It should also be in its original packaging.
          </p>
          <p>Non-returnable items:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Opened tea products or used tea accessories.</li>
            <li>Perishable goods, such as loose leaf teas and pre-brewed tea items.</li>
            <li>Custom or personalized items (e.g., special blends, custom tea accessories).</li>
          </ul>

          <h2 className="font-headline text-2xl">How to Complete a Return</h2>
          <p>
            To initiate a return, please contact us at info@teajarceylon.com and provide proof of purchase. Please do not send your purchase back to the manufacturer.
          </p>

          <h2 className="font-headline text-2xl">Partial Refunds (if applicable)</h2>
          <p>Partial refunds may be granted for:</p>
            <ul className="list-disc pl-6 space-y-2">
                <li>Tea products that have been opened or used.</li>
                <li>Items that are damaged or missing parts not caused by us.</li>
                <li>Products returned more than 30 days after delivery.</li>
            </ul>

          <h2 className="font-headline text-2xl">Refunds (if applicable)</h2>
          <p>
            Once we receive and inspect your returned item, we will notify you by email about the approval or rejection of your refund. If approved, your refund will be processed and credited to your original method of payment within a few days.
          </p>

          <h2 className="font-headline text-2xl">Late or Missing Refunds (if applicable)</h2>
          <p>If you haven’t received your refund yet:</p>
            <ul className="list-disc pl-6 space-y-2">
                <li>Check your bank account again.</li>
                <li>Contact your credit card company or bank, as it may take some time for the refund to appear.</li>
                <li>If you still haven’t received the refund, please contact us at <a href="mailto:marketing@teajarceylon.com">marketing@teajarceylon.com</a>.</li>
            </ul>

          <h2 className="font-headline text-2xl">Sale Items (if applicable)</h2>
          <p>
            Only regular-priced items are eligible for a refund. Sale items are not refundable.
          </p>
          
          <h2 className="font-headline text-2xl">Exchanges (if applicable)</h2>
          <p>
            We only replace items if they are defective or damaged. If you need to exchange a defective item for the same product, please send us an email at info@teajarceylon.com and mail the item to:
          </p>
          <address className="not-italic">
            KDU Exports (PVT) Ltd,<br/>
            Galpadithenna Tea Factory,<br/>
            Lellopitiya, Ratnapura, Sri Lanka.
          </address>

          <h2 className="font-headline text-2xl">Gifts</h2>
          <p>
            If the item was marked as a gift during purchase and shipped directly to you, you will receive a gift credit for the value of the returned item. Once we receive the returned item, we will issue a gift certificate.
          </p>

          <h2 className="font-headline text-2xl">Shipping</h2>
          <p>
            To return your product, please mail it to:
          </p>
           <address className="not-italic">
            KDU Exports (PVT) Ltd,<br/>
            Galpadithenna Tea Factory,<br/>
            Lellopitiya, Ratnapura, Sri Lanka.
          </address>
          <p>
            You will be responsible for paying the return shipping costs. Shipping costs are non-refundable. If a refund is issued, the cost of return shipping will be deducted.
          </p>
          <p>
            If your order exceeds $75, we recommend using a trackable shipping service or purchasing shipping insurance, as we cannot guarantee that we will receive your returned item.
          </p>

        </div>
      </div>
    </div>
  );
}

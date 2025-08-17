
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Read the Terms of Service for Tea Jar Ceylon. By using our website, you agree to these terms and conditions.',
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-[#2a2f28] text-white pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-headline text-4xl md:text-5xl text-center mb-12">Terms of Service</h1>
        <div className="prose prose-invert prose-p:text-neutral-300 prose-headings:text-white prose-a:text-amber-200 hover:prose-a:text-white max-w-none space-y-6">
          
          <h2 className="font-headline text-2xl">Overview</h2>
          <p>
            This website is operated by Tea Jar Ceylon. Throughout this document, the terms "we," "us," and "our" refer to Tea Jar. By accessing and using this website, including all services, information, and products offered, you agree to abide by these Terms of Service as well as all related policies and notices provided.
          </p>
          <p>
            By browsing or purchasing from our site, you are engaging with our "Service" and are bound by these Terms. These terms also include any additional terms and policies referenced in this document or provided through links.
          </p>
          <p>
            Please take the time to read these Terms of Service carefully before using our website. By accessing or using any portion of the site, you confirm your agreement to be bound by these Terms. If you disagree with any part of these Terms, you must refrain from using the website and services.
          </p>
          <p>
            Our store is hosted by Shopify Inc., which provides us with the platform that allows us to sell our products and services to you.
          </p>

          <h2 className="font-headline text-2xl">Section 1 - Online Store Terms</h2>
          <p>
            By agreeing to these Terms, you confirm that you are of legal age in your state or province of residence, or that you have obtained consent from a legal guardian to allow a minor dependent to use this site.
          </p>
          <p>
            You must not transmit any harmful code, such as viruses or worms. Any violation of these Terms will result in the immediate suspension of your access to our services.
          </p>

          <h2 className="font-headline text-2xl">Section 2 - General Conditions</h2>
          <p>
            We reserve the right to refuse service to anyone at any time and for any reason. Your content (excluding payment information) may be transferred unencrypted and may be altered to conform to the technical requirements of different networks or devices.
          </p>
          <p>
            You agree not to reproduce, copy, sell, or exploit any part of the Service, or access to the Service, without prior written consent from us.
          </p>

          <h2 className="font-headline text-2xl">Section 3 - Accuracy, Completeness, and Timeliness of Information</h2>
          <p>
            We do not guarantee that all information on this website is complete, accurate, or current. Any use of material from this site is at your own risk.
          </p>
          
          <h2 className="font-headline text-2xl">Section 4 - Modifications to the Service and Prices</h2>
          <p>
            The prices for our products are subject to change without notice. We may modify, suspend, or discontinue any part of the Service at any time, without notice.
          </p>

          <h2 className="font-headline text-2xl">Section 5 - Products or Services</h2>
          <p>
            Certain products or services may be available only through the website and may have limited availability, with returns or exchanges governed by our Return Policy.
          </p>

          <h2 className="font-headline text-2xl">Section 6 - Accuracy of Billing and Account Information</h2>
          <p>
            We reserve the right to refuse any order you place with us. We may limit or cancel orders based on customer account information, payment details, or shipping address.
          </p>

          <h2 className="font-headline text-2xl">Section 7 - Optional Tools</h2>
          <p>
            We may provide access to third-party tools that we neither monitor nor have control over.
          </p>

          <h2 className="font-headline text-2xl">Section 8 - Third-Party Links</h2>
          <p>
            Some content, products, or services available via our Service may include materials from third parties.
          </p>

          <h2 className="font-headline text-2xl">Section 9 - User Comments, Feedback, and Other Submissions</h2>
          <p>
            If you submit creative ideas, suggestions, or proposals, you agree that we may use, modify, or publish such content in any form and across any medium without restriction.
          </p>

          <h2 className="font-headline text-2xl">Section 10 - Personal Information</h2>
          <p>
            The submission of your personal information through the store is governed by our Privacy Policy.
          </p>

          <h2 className="font-headline text-2xl">Section 12 - Prohibited Uses</h2>
          <p>
            You are prohibited from using this site for unlawful purposes or to encourage illegal activities.
          </p>
          
          <p>
            If you have questions about these Terms of Service, please contact us at <a href="mailto:marketing@teajarceylon.com">marketing@teajarceylon.com</a>.
          </p>

        </div>
      </div>
    </div>
  );
}

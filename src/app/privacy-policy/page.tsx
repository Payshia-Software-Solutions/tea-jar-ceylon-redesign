
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'This Privacy Policy explains how your personal information is collected, used, and shared when you visit or make a purchase from www.teajarceylon.com.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#2a2f28] text-white pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-headline text-4xl md:text-5xl text-center mb-12">Privacy Policy</h1>
        <div className="prose prose-invert prose-p:text-neutral-300 prose-headings:text-white prose-a:text-amber-200 hover:prose-a:text-white max-w-none space-y-6">
          <p>
            This Privacy Policy explains how your personal information is collected, used, and shared when you visit or make a purchase from www.teajarceylon.com (the “Site”).
          </p>

          <h2 className="font-headline text-2xl">Personal Information We Collect</h2>
          <p>
            When you visit the Site, we automatically collect certain information about your device, including details about your web browser, IP address, time zone, and some cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, the websites or search terms that referred you to the Site, and how you interact with the Site. This automatically-collected information is referred to as “Device Information.”
          </p>
          <p>We collect Device Information using the following technologies:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Cookies:</strong> Small data files placed on your device or computer, often containing an anonymous unique identifier. For more information about cookies and how to disable them, visit <a href="http://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
            </li>
            <li>
              <strong>Log Files:</strong> Track actions on the Site and gather data such as your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.
            </li>
            <li>
              <strong>Web Beacons, Tags, and Pixels:</strong> These are electronic files used to record information about how you browse the Site.
            </li>
          </ul>

          <h2 className="font-headline text-2xl">How We Use Your Personal Information</h2>
          <p>We use the Order Information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process any orders placed through the Site, including payment processing, shipping arrangements, and providing order confirmations.</li>
            <li>Communicate with you regarding your orders and any related matters.</li>
            <li>Prevent fraud or monitor for potential risks with your orders.</li>
          </ul>
          <p>We also use the Device Information to help us:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Screen for potential fraud or risk (in particular, your IP address).</li>
            <li>Improve and optimize our Site, generate analytics on how our customers browse the Site, and assess the success of marketing and advertising campaigns.</li>
          </ul>

          <h2 className="font-headline text-2xl">Sharing Your Personal Information</h2>
          <p>We share your Personal Information with trusted third parties to assist in the operation of the Site and provide our services. For example:</p>
            <ul className="list-disc pl-6 space-y-2">
                <li>
                    We use Shopify to power our online store. You can read more about how Shopify uses your Personal Information <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noopener noreferrer">here</a>.
                </li>
                <li>
                    We use Google Analytics to understand how our customers interact with the Site. You can read more about how Google uses your data <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noopener noreferrer">here</a>, and you can opt out of Google Analytics <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">here</a>.
                </li>
            </ul>
          
          <h2 className="font-headline text-2xl">Behavioral Advertising</h2>
            <p>
                We use your Personal Information to deliver targeted advertisements or marketing communications that may be of interest to you. For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s educational page <a href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work" target="_blank" rel="noopener noreferrer">here</a>.
            </p>

          <h2 className="font-headline text-2xl">Your Rights</h2>
          <p>
            If you are a resident of the European Economic Area (EEA), you have the right to access, correct, update, or delete your personal information. If you wish to exercise this right, please contact us using the contact information provided below.
          </p>

          <h2 className="font-headline text-2xl">Data Retention</h2>
          <p>
            We will retain your Order Information for as long as needed for business or legal purposes, including fulfilling any orders, unless you request deletion of this information.
          </p>

          <h2 className="font-headline text-2xl">Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy periodically to reflect changes in our practices or for other operational, legal, or regulatory reasons.
          </p>

          <h2 className="font-headline text-2xl">Contact Us</h2>
          <p>
            For more information about our privacy practices, if you have any questions, or if you would like to make a complaint, please contact us by email at marketing@teajarceylon.com or by mail at:
          </p>
          <address className="not-italic">
            KDU Exports (PVT) Ltd<br />
            Galpadithenne Tea Factory<br />
            Lellopitiya, Ratnapura,<br />
            Sri Lanka<br />
            Phone: (+94)70 55 08 800
          </address>
        </div>
      </div>
    </div>
  );
}

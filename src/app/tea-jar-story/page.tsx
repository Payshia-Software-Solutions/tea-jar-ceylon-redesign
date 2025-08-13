
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Story',
    description: 'Discover the rich heritage and story behind Tea Jar, from our founding in 1978 to our commitment to delivering the finest Ceylon tea to the world.',
};

export default function StoryPage() {
    return (
        <div className="bg-[#f7f5f2] text-[#3c3c3c] pt-24">
            <main>
                {/* Section 1: Intro */}
                <section className="grid md:grid-cols-2 items-center">
                    <div className="order-2 md:order-1 bg-[#f7f5f2] p-8 md:p-16 lg:p-24 flex justify-center">
                        <div className="max-w-md space-y-6">
                            <Image
                                src="https://content-provider.payshia.com/tea-jar/gold-logo.webp"
                                alt="Tea Jar Logo"
                                width={200}
                                height={80}
                                className="object-contain mx-auto"
                            />
                            <p className="text-sm md:text-base leading-relaxed">
                                Sri Lanka&apos;s iconic Ceylon tea, gifted from generation to generation. Two of the freshest leaves and bud are handpicked and manufactured at the state-of-the-art tea factories in Sri Lanka.
                            </p>
                            <p className="text-sm md:text-base leading-relaxed">
                                Tea Jar, which was founded in 1978, produces some of the finest Ceylon tea to date. Ranging from the simplest black tea to the most renowned flavours, we offer a wide variety of elixirs to suit tea lovers across the globe.
                            </p>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 h-64 md:h-auto min-h-[40vh] md:min-h-screen relative">
                        <Image
                            src="https://content-provider.payshia.com/tea-jar/tea-jar-story-side.webp"
                            alt="A woman enjoying a cup of Tea Jar tea"
                            fill
                            className="object-cover"
                        />
                    </div>
                </section>

                {/* Section 2: Ceylon's Finest Tea */}
                <section className="grid md:grid-cols-2 items-center">
                    <div className="h-64 md:h-auto min-h-[40vh] md:min-h-screen relative">
                        <Image
                            src="https://content-provider.payshia.com/tea-jar/ceylon-finest-tea.webp"
                            alt="A pyramid tea bag being dipped into a glass cup"
                            fill
                            className="object-cover"
                        />
                    </div>
                     <div className="bg-[#eafde9] p-8 md:p-16 lg:p-24 flex justify-center">
                        <div className="max-w-md space-y-6">
                            <h2 className="font-headline text-3xl md:text-4xl">CEYLON&apos;S FINEST TEA</h2>
                            <p className="text-sm font-semibold tracking-wider">Mastering the Art of World Renowned, Single Origin Ceylon Tea Since 1978</p>
                            <p className="text-sm md:text-base leading-relaxed">
                                Tea Jar possesses unique and specific characteristics of quality and taste which are attributed by the passion and provenance of the unique manufacturing practices, that have been mastered over the years, infused with contemporary creativity and imagination to satisfy the most devoted tea lovers.
                            </p>
                            <p className="text-sm md:text-base leading-relaxed">
                                From harvest to the freshest bud along with its two leaves, to withering, rolling, drying, sorting, and packing, we take utmost care in conducting the entire process in line with international standards of quality and hygiene. Over the years, the reputation of “Tea Jar” has grown tremendously due to the consistency in quality, and the eminence in the richly aromatic and flavourful characters, being the obvious certainty in the journey of our success.
                            </p>
                             <Image
                                src="https://content-provider.payshia.com/tea-jar/ceylon-tea-logo.webp"
                                alt="Ceylon Tea Lion Logo"
                                width={80}
                                height={100}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </section>

                {/* Section 3: Founder's Message */}
                 <section className="grid md:grid-cols-2 items-center">
                    <div className="order-2 md:order-1 bg-white p-8 md:p-16 lg:p-24 flex justify-center">
                        <div className="max-w-md space-y-6">
                            <h2 className="font-headline text-3xl md:text-4xl">Founder&apos;s Message</h2>
                            <p className="text-sm md:text-base leading-relaxed">
                                As the founder of Tea Jar and Chairman of KDU Group, I take immense pride in the journey that began with a single vision: to share the unparalleled richness of Ceylon tea with the world. Since 1978, our commitment has been to uphold the legacy of Sri Lanka’s tea heritage, ensuring every sip reflects the passion, dedication, and authenticity that our family business stands for.
                            </p>
                            <p className="text-sm md:text-base leading-relaxed">
                                Tea Jar is more than just a brand; it is a testament to our pursuit of excellence. From our state-of-the-art factories to the carefully curated blends that embody the essence of Ceylon, Tea Jar showcases our relentless efforts to maintain the highest standards. Through Tea Jar, we connect with tea lovers globally while preserving the traditions and values that make Ceylon tea truly special.
                            </p>
                             <p className="text-sm md:text-base leading-relaxed">
                                I am grateful to see how Tea Jar has grown into a boutique tea brand appreciated locally and internationally, and I remain committed to driving innovation while cherishing our roots. Together, let us continue to celebrate the artistry and heritage of Ceylon tea.
                            </p>
                            <div className="pt-4">
                                <p className="font-handwritten text-xl">Warm regards,</p>
                                <p className="font-semibold">Saman Upasena</p>
                                <p className="text-sm text-neutral-600">Founder, Tea Taster</p>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 h-64 md:h-auto min-h-[40vh] md:min-h-screen relative">
                        <Image
                            src="https://content-provider.payshia.com/tea-jar/saman_nbgv1.webp"
                            alt="Saman Upasena, Founder of Tea Jar"
                            fill
                            className="object-contain object-bottom"
                        />
                    </div>
                </section>

                {/* Section 4: Managing Director's Message */}
                <section className="grid md:grid-cols-2 items-center">
                     <div className="h-64 md:h-auto min-h-[40vh] md:min-h-screen relative">
                        <Image
                            src="https://content-provider.payshia.com/tea-jar/deelaka_nbg.webp"
                            alt="Deelaka Upasena, Managing Director of Tea Jar"
                            fill
                            className="object-contain object-bottom"
                        />
                    </div>
                    <div className="bg-white p-8 md:p-16 lg:p-24 flex justify-center">
                        <div className="max-w-md space-y-6">
                            <h2 className="font-headline text-3xl md:text-4xl">Managing Director&apos;s Message</h2>
                            <p className="text-sm md:text-base leading-relaxed">
                                Under my leadership as Managing Director of KDU Group, Tea Jar has evolved into a brand that seamlessly blends tradition with modernity. Building on the strong foundation laid by my father, I have envisioned Tea Jar as a global ambassador for Ceylon tea, delivering premium-quality blends to discerning tea lovers across the world.
                            </p>
                            <p className="text-sm md:text-base leading-relaxed">
                                With deep roots in Sri Lanka, Tea Jar operates as a local treasure and an international icon. Our boutiques in Ella and at the DoubleTree by Hilton Weerawila Rajawarna Resort offer personalized tea experiences, while our lounges in Ratnapura and Colombo create spaces where guests can immerse themselves in the culture of Ceylon tea. On the global stage, Tea Jar’s reach extends to markets in the USA, UK, UAE, Russia, China, and beyond.
                            </p>
                            <p className="text-sm md:text-base leading-relaxed">
                                Our success lies in our dedication to authenticity, sustainability, and innovation. By combining centuries-old tea traditions with cutting-edge production techniques and eco-friendly practices, we ensure that every cup of Tea Jar tea is exceptional.
                            </p>
                            <p className="text-sm md:text-base leading-relaxed">
                                Looking ahead, my vision for Tea Jar is to solidify its position as a global brand synonymous with luxury, quality, and heritage. Through innovation, strategic partnerships, and unwavering commitment, we aim to make Tea Jar the go-to choice for tea connoisseurs worldwide.
                            </p>
                             <div className="pt-4">
                                <Image
                                    src="https://content-provider.payshia.com/tea-jar/deelaka-sign.webp"
                                    alt="Deelaka Upasena's Signature"
                                    width={100}
                                    height={50}
                                    className="object-contain"
                                />
                                <p className="font-semibold mt-2">Deelaka Upasena</p>
                                <p className="text-sm text-neutral-600">Tea Taster</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

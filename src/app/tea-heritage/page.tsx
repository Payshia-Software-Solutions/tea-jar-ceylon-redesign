
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ceylon Tea Heritage',
    description: "Discover the rich history of Ceylon tea, from its introduction to Sri Lanka in the 19th century to its rise as one of the world's most renowned teas. Learn how Tea Jar honors this legacy.",
};

export default function TeaHeritagePage() {
    return (
        <div className="bg-[#f7f5f2] text-[#3c3c3c] pt-24 min-h-screen">
            <main>
                <section className="grid md:grid-cols-2 items-center">
                    <div className="p-8 md:p-16 lg:p-24 flex justify-center">
                        <div className="max-w-md space-y-6">
                            <h1 className="font-headline text-3xl md:text-4xl">CEYLON TEA HERITAGE</h1>
                            <p className="text-sm md:text-base leading-relaxed">
                                Ceylon tea, known for its distinct flavor and aroma, has a rich history that dates back to the 19th century. The story of Ceylon tea begins with its introduction to Sri Lanka, then known as Ceylon, by the British. In 1824, the British brought the first tea plant to Ceylon from China and planted it in the Royal Botanical Gardens in Peradeniya. However, it wasn't until the disastrous coffee blight of the 1860s that tea became a significant crop in the region.
                            </p>
                            <p className="text-sm md:text-base leading-relaxed">
                                James Taylor, a Scottish planter, is often credited with pioneering the tea industry in Ceylon. In 1867, he established the first tea plantation on the Loolecondera estate, laying the foundation for what would become one of the world's most renowned tea industries. Taylor's innovative techniques in cultivation and processing set the standard for tea production in Ceylon.
                            </p>
                             <p className="text-sm md:text-base leading-relaxed">
                                By the late 19th century, the success of Ceylon tea was evident. The country began exporting tea to London, and by the early 20th century, Ceylon tea had gained international acclaim for its superior quality. The island's unique climate and fertile soil, particularly in regions like Nuwara Eliya, Kandy, and Uva, contribute to the distinctive flavors and characteristics of Ceylon tea.
                            </p>
                            <p className="text-sm md:text-base leading-relaxed">
                                At Tea Jar, we honor this rich legacy by sourcing our teas from the finest estates across Sri Lanka. Our commitment to quality ensures that every sip of Tea Jar tea carries the tradition and excellence established over a century ago. By working closely with local tea growers, we continue to uphold the standards set by pioneers like James Taylor, delivering the authentic taste of Ceylon tea to tea lovers worldwide.
                            </p>
                            <p className="text-sm md:text-base leading-relaxed">
                                Whether you are savoring a robust black tea from the highlands or a delicate green tea from the lowlands, each cup of Tea Jar tea is a tribute to the enduring heritage of Ceylon tea. Join us on this journey through time and experience the legacy of one of the world's most beloved teas.
                            </p>
                        </div>
                    </div>
                    <div className="h-64 md:h-auto min-h-[50vh] md:min-h-screen relative">
                        <Image
                            src="https://content-provider.payshia.com/tea-jar/heritage-image-optimized.webp"
                            alt="A woman enjoying a cup of Tea Jar tea, representing Ceylon Tea Heritage"
                            fill
                            className="object-cover"
                        />
                    </div>
                </section>
            </main>
        </div>
    );
}

import CTASection from "@/components/cta";
import HeroSearchSection from "@/components/banner";
import Listing from "@/components/listing";
import FeaturesSection from "@/components/howto";
import CategoryCardsSection from "@/components/feature";
import CitySearchCarousel from "@/components/countries";
import DirectoryListingCTA from "@/components/c-t-a";
import ContactSupportSection from "@/components/contactbanner";
import FAQSection from "@/components/faq";
import ContactFormSection from "@/components/contact";
import type {Metadata} from "next";


export const metadata: Metadata = {
    title: "Contactez-nous - NDC Travels",
    description: "Chaque voyage compte, chaque colis arrive",
};

export default function Home() {
    return (
        <>
            <ContactSupportSection/>

            <div className={"h-[100px]"}></div>
            <section className="bg-gray-50 py-12">
                <div className="container mx-auto px-4 py-8 lg:py-12">
                    <ContactFormSection/>
                </div>
            </section>

            <FAQSection/>
        </>
    );
}

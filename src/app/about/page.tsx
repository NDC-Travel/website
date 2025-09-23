
import FeaturesSection from "@/components/aboutBloc";
import FAQSection from "@/components/faq";
import type {Metadata} from "next";
import AboutHeroSection from "@/components/aboutBanner";
import PrinciplesSection from "@/components/about";


export const metadata: Metadata = {
    title: "À Propos - NDC Travels",
    description: "Chaque voyage compte, chaque colis arrive",
};

export default function Home() {
    return (
        <>
            <AboutHeroSection />

            <FeaturesSection />

            <PrinciplesSection/>
        </>
    );
}

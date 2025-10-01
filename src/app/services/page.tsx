
import FeaturesSection from "@/components/aboutBloc";
import FAQSection from "@/components/faq";
import type {Metadata} from "next";
import AboutHeroSection from "@/components/aboutBanner";
import PrinciplesSection from "@/components/about";
import AppCTA from "@/components/service-cta";
import ServiceBanner from "@/components/serviceBanner";
import ServiceProcess from "@/components/serviceProcess";
import OurService from "@/components/ourService";


export const metadata: Metadata = {
    title: "Nos Services - NDC Travels",
    description: "Chaque voyage compte, chaque colis arrive",
};

export default function Home() {
    return (
        <>
            <ServiceBanner />

            <OurService />

            <ServiceProcess />

            <AppCTA/>
        </>
    );
}

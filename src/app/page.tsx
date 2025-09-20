import CTASection from "@/components/cta";
import HeroSearchSection from "@/components/banner";
import Listing from "@/components/listing";
import FeaturesSection from "@/components/howto";
import CategoryCardsSection from "@/components/feature";

export default function Home() {
  return (
    <>
        <HeroSearchSection />

        <Listing />

        <FeaturesSection />

        <CTASection />

        <CategoryCardsSection />
    </>
  );
}

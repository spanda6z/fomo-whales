import { Hero } from "@/components/home/Hero";
import { FeaturedChannels } from "@/components/home/FeaturedChannels";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CallTypes } from "@/components/home/CallTypes";
import { RecentPromotions } from "@/components/home/RecentPromotions";
import { TopLeaders } from "@/components/home/TopLeaders";
import { FAQPreview } from "@/components/home/FAQPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedChannels />
      <HowItWorks />
      <CallTypes />
      <RecentPromotions />
      <TopLeaders />
      <FAQPreview />
    </>
  );
}

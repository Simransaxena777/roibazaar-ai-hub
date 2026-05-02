import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { OfferMarquee } from "@/components/site/OfferMarquee";
import { Stats } from "@/components/site/Stats";
import { SpecialOffers } from "@/components/site/SpecialOffers";
import { Testimonials } from "@/components/site/Testimonials";
import { Partners, WhyUs } from "@/components/site/Partners";
import { AppDownload } from "@/components/site/AppDownload";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "₹OI Bazaar.com — India's #1 Financial Marketplace" },
      { name: "description", content: "Compare loans, cards, insurance & investments. Earn cashback and get instant approvals." },
      { property: "og:title", content: "₹OI Bazaar.com — Compare & Choose the Best Financial Products" },
      { property: "og:description", content: "Compare loans, cards, insurance & investments. Earn cashback and get instant approvals." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { handleAction, setModal } = useSite();
  return (
    <>
      <Hero
        onCompare={() => handleAction("Compare Products")}
        onTalk={() => setModal({ title: "Connecting you to an Expert", message: "An advisor will call you within 2 minutes on your registered number." })}
      />
      <OfferMarquee />
      <Stats />
      <SpecialOffers onAction={(label) => handleAction(label)} />
      <WhyUs />
      <Testimonials />
      <Partners />
      <AppDownload />
    </>
  );
}

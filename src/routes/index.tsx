import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { MarketTicker } from "@/components/site/MarketTicker";
import { Hero } from "@/components/site/Hero";
import { OfferMarquee } from "@/components/site/OfferMarquee";
import { Stats } from "@/components/site/Stats";
import { SpecialOffers } from "@/components/site/SpecialOffers";
import { Products } from "@/components/site/Products";
import { CreditScore } from "@/components/site/CreditScore";
import { Investments } from "@/components/site/Investments";
import { Insurance } from "@/components/site/Insurance";
import { EmiCalculator } from "@/components/site/EmiCalculator";
import { Recharge } from "@/components/site/Recharge";
import { Testimonials } from "@/components/site/Testimonials";
import { Partners, WhyUs } from "@/components/site/Partners";
import { AppDownload } from "@/components/site/AppDownload";
import { Blog } from "@/components/site/Blog";
import { CTASection, Footer } from "@/components/site/Footer";
import { AIChatWidget } from "@/components/site/AIChatWidget";
import { LoginModal } from "@/components/site/LoginModal";
import { ActionModal } from "@/components/site/ActionModal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [modal, setModal] = useState<{ title: string; message: string } | null>(null);

  const trackAction = (label: string, item?: string) => {
    const history = JSON.parse(localStorage.getItem("roi_history") || "[]");
    history.unshift({ label, item, time: new Date().toISOString() });
    localStorage.setItem("roi_history", JSON.stringify(history.slice(0, 50)));
  };

  const handleAction = (label: string, item?: string) => {
    trackAction(label, item);
    if (!user) {
      setLoginOpen(true);
      return;
    }
    setModal({
      title: `${label} Initiated! 🎉`,
      message: item
        ? `Your request for "${item}" has been received. Our team will contact you within 5 minutes. Track this in your dashboard.`
        : `Your "${label}" request has been received. We'll process it shortly.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <MarketTicker />
      <Header
        onSignIn={() => setLoginOpen(true)}
        onGetStarted={() => setLoginOpen(true)}
        onQR={() => setModal({ title: "Scan QR Code", message: "Open your camera and scan the QR code to download the ₹OI Bazaar app." })}
        onSearch={() => setModal({ title: "Global Search", message: "Search any product, calculator, or feature across ₹OI Bazaar." })}
      />

      <Hero
        onCompare={() => handleAction("Compare Products")}
        onTalk={() => setModal({ title: "Connecting you to an Expert", message: "An advisor will call you within 2 minutes on your registered number." })}
      />
      <OfferMarquee />
      <Stats />
      <SpecialOffers onAction={(label) => handleAction(label)} />
      <Products onAction={(product, cta) => handleAction(cta, product)} />
      <CreditScore onAction={(label) => handleAction(label)} />
      <Investments onAction={(label, item) => handleAction(label, item)} />
      <Insurance onAction={(label, item) => handleAction(label, item)} />
      <EmiCalculator />
      <Recharge onAction={(label) => handleAction(label)} />
      <WhyUs />
      <Testimonials />
      <Partners />
      <AppDownload />
      <Blog />
      <CTASection onAction={() => setLoginOpen(true)} />
      <Footer />

      <AIChatWidget />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onSuccess={(name) => { setUser(name); setModal({ title: `Welcome, ${name}! 👋`, message: "You're now logged in. Explore your personalized dashboard, portfolio, and exclusive offers." }); }} />
      <ActionModal open={!!modal} title={modal?.title || ""} message={modal?.message || ""} onClose={() => setModal(null)} />

      {user && (
        <div className="fixed top-20 right-4 z-30 hidden lg:block rounded-2xl bg-white shadow-card border border-border px-4 py-2 text-sm">
          <p className="font-bold">👋 {user}</p>
          <p className="text-xs text-muted-foreground">View Dashboard →</p>
        </div>
      )}
    </div>
  );
}

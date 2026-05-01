import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LayoutDashboard } from "lucide-react";
import { Header } from "@/components/site/Header";
import { MarketTicker } from "@/components/site/MarketTicker";
import { Hero } from "@/components/site/Hero";
import { OfferMarquee } from "@/components/site/OfferMarquee";
import { Stats } from "@/components/site/Stats";
import { SpecialOffers } from "@/components/site/SpecialOffers";
import { Products } from "@/components/site/Products";
import { CreditCards } from "@/components/site/CreditCards";
import { CreditScore } from "@/components/site/CreditScore";
import { Investments } from "@/components/site/Investments";
import { Insurance } from "@/components/site/Insurance";
import { EmiCalculator } from "@/components/site/EmiCalculator";
import { Recharge } from "@/components/site/Recharge";
import { Testimonials } from "@/components/site/Testimonials";
import { Partners, WhyUs } from "@/components/site/Partners";
import { AppDownload } from "@/components/site/AppDownload";
import { Blog } from "@/components/site/Blog";
import { FAQ } from "@/components/site/FAQ";
import { CTASection, Footer } from "@/components/site/Footer";
import { AIChatWidget } from "@/components/site/AIChatWidget";
import { LoginModal } from "@/components/site/LoginModal";
import { ActionModal } from "@/components/site/ActionModal";
import { PaymentModal, type PaymentRequest, type TxnRecord } from "@/components/site/PaymentModal";
import { Dashboard } from "@/components/site/Dashboard";

export const Route = createFileRoute("/")({
  component: Index,
});

// Decide a sensible amount per action so the payment modal always has a value.
function inferAmount(label: string, item?: string): number {
  const l = label.toLowerCase();
  const i = (item || "").toLowerCase();
  if (l.includes("sip") || l.includes("invest")) return 5000;
  if (l.includes("loan") || l.includes("apply")) return 999; // processing fee
  if (l.includes("insur")) return 1499; // premium token
  if (l.includes("card") || l.includes("get card")) return 499; // card fee
  if (l.includes("recharge") || l.includes("bill") || i.includes("recharge") || i.includes("bill")) return 299;
  if (l.includes("compare") || l.includes("talk")) return 0;
  return 199;
}

const PAID_ACTIONS = ["apply", "invest", "sip", "recharge", "bill", "get card", "buy", "pay"];

function Index() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [modal, setModal] = useState<{ title: string; message: string } | null>(null);
  const [payment, setPayment] = useState<PaymentRequest | null>(null);
  const [dashOpen, setDashOpen] = useState(false);

  const trackAction = (label: string, item?: string) => {
    const history = JSON.parse(localStorage.getItem("roi_history") || "[]");
    history.unshift({ label, item, time: new Date().toISOString() });
    localStorage.setItem("roi_history", JSON.stringify(history.slice(0, 50)));
  };

  const saveTxn = (t: TxnRecord) => {
    const list = JSON.parse(localStorage.getItem("roi_txns") || "[]");
    list.unshift(t);
    localStorage.setItem("roi_txns", JSON.stringify(list.slice(0, 100)));
  };

  const handleAction = (label: string, item?: string) => {
    trackAction(label, item);
    if (!user) {
      setLoginOpen(true);
      return;
    }
    const isPaid = PAID_ACTIONS.some(k => label.toLowerCase().includes(k) || (item || "").toLowerCase().includes(k));
    const amount = inferAmount(label, item);
    if (isPaid && amount > 0) {
      setPayment({ title: label, item, amount });
    } else {
      setModal({
        title: `${label} Initiated! 🎉`,
        message: item
          ? `Your request for "${item}" has been received. Our team will contact you within 5 minutes.`
          : `Your "${label}" request has been received. We'll process it shortly.`,
      });
    }
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
        <CreditCards onAction={(label, item) => handleAction(label, item)} />
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
      <FAQ />
      <CTASection onAction={() => setLoginOpen(true)} />
      <Footer />

      <AIChatWidget />
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={(name) => {
          setUser(name);
          setModal({ title: `Welcome, ${name}! 👋`, message: "You're now logged in. Explore your personalized dashboard, portfolio, and exclusive offers." });
        }}
      />
      <ActionModal open={!!modal} title={modal?.title || ""} message={modal?.message || ""} onClose={() => setModal(null)} />

      <PaymentModal
        open={!!payment}
        request={payment}
        onClose={() => setPayment(null)}
        onComplete={(t) => saveTxn(t)}
      />

      <Dashboard open={dashOpen} user={user} onClose={() => setDashOpen(false)} />

      {/* Floating Dashboard launcher */}
      {user && (
        <button
          onClick={() => setDashOpen(true)}
          className="fixed bottom-24 right-4 z-40 lg:bottom-6 lg:right-24 inline-flex items-center gap-2 rounded-full bg-white border border-border shadow-card hover:shadow-glow px-4 py-3 text-sm font-bold transition hover:-translate-y-0.5"
        >
          <span className="h-7 w-7 rounded-full bg-gradient-primary text-white flex items-center justify-center font-extrabold text-xs">
            {user.slice(0, 1).toUpperCase()}
          </span>
          <LayoutDashboard size={16} className="text-primary" /> Dashboard
        </button>
      )}
    </div>
  );
}

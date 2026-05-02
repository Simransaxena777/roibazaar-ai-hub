import { useEffect, useState } from "react";
import { CreditCard, Percent, Zap, Shield, ArrowRight, Sparkles, ChevronLeft, ChevronRight, Wallet, TrendingUp, PiggyBank, Gift } from "lucide-react";
import aiAvatar from "@/assets/ai-riya.jpg";

type Slide = {
  badge: string;
  titleA: string;
  titleB: string;
  titleBClass: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  cards: {
    icon: typeof CreditCard;
    title: string;
    value: string;
    valueClass?: string;
    accent?: string;
  }[];
  bubble: { label: string; value: string; sub: string };
};

const SLIDES: Slide[] = [
  {
    badge: "India's #1 Financial Marketplace",
    titleA: "Compare & Choose the",
    titleB: "Best Financial Products",
    titleBClass: "text-gradient-purple",
    subtitle: "Up to 5% Cashback",
    description: "Loans, credit cards, insurance & investments — all in one place. Instant approval in 5 minutes.",
    ctaLabel: "Compare Products",
    cards: [
      { icon: Percent, title: "Low Interest", value: "Starting 10.5% p.a." },
      { icon: Zap, title: "Instant Approval", value: "5 Minutes", valueClass: "text-brand-green" },
    ],
    bubble: { label: "Cashback", value: "₹5,000", sub: "+ Welcome Bonus" },
  },
  {
    badge: "Premium Credit Cards",
    titleA: "Premium",
    titleB: "Credit Cards",
    titleBClass: "text-gradient-primary",
    subtitle: "Earn up to 5% Cashback",
    description: "Exclusive rewards, travel benefits, and zero joining fees.",
    ctaLabel: "Compare Cards",
    cards: [
      { icon: Percent, title: "Low Interest", value: "Starting from 10.5% p.a." },
      { icon: Zap, title: "Instant Approval", value: "5 Minutes", valueClass: "text-brand-green" },
    ],
    bubble: { label: "Cashback", value: "₹5,000", sub: "Lifetime Free" },
  },
  {
    badge: "Personal & Home Loans",
    titleA: "Loans at",
    titleB: "Best Rates",
    titleBClass: "text-gradient-purple",
    subtitle: "Starting @ 8.5% p.a.",
    description: "Personal, home, and business loans up to ₹50L with minimal documentation.",
    ctaLabel: "Apply for Loan",
    cards: [
      { icon: Wallet, title: "Loan Amount", value: "Up to ₹50L" },
      { icon: Shield, title: "Tenure", value: "Up to 30 Years", valueClass: "text-brand-green" },
    ],
    bubble: { label: "EMI from", value: "₹999", sub: "per ₹1L borrowed" },
  },
  {
    badge: "Smart Investments",
    titleA: "Grow Your",
    titleB: "Wealth Smartly",
    titleBClass: "text-gradient-primary",
    subtitle: "Returns up to 18% p.a.",
    description: "Mutual funds, SIPs, FDs & stocks — start investing with just ₹500.",
    ctaLabel: "Start Investing",
    cards: [
      { icon: TrendingUp, title: "Top Mutual Funds", value: "18% avg returns" },
      { icon: PiggyBank, title: "Start SIP", value: "From ₹500", valueClass: "text-brand-green" },
    ],
    bubble: { label: "Returns", value: "18%", sub: "p.a. average" },
  },
  {
    badge: "Festive Offers",
    titleA: "Mega",
    titleB: "Cashback Bonanza",
    titleBClass: "text-gradient-purple",
    subtitle: "Limited time only",
    description: "Get instant cashback up to ₹10,000 on loans, cards & recharges this season.",
    ctaLabel: "Grab Offer",
    cards: [
      { icon: Gift, title: "Welcome Bonus", value: "₹2,000 free" },
      { icon: Zap, title: "Recharge Cashback", value: "Up to 10%", valueClass: "text-brand-green" },
    ],
    bubble: { label: "Save up to", value: "₹10K", sub: "this festive season" },
  },
];

export function Hero({ onCompare, onTalk }: { onCompare: () => void; onTalk: () => void }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = SLIDES.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 4500);
    return () => clearInterval(id);
  }, [paused, total]);

  const slide = SLIDES[index];
  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  return (
    <section
      className="relative overflow-hidden bg-gradient-hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-brand-purple/20 blur-3xl" />
      <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-brand-cyan/20 blur-3xl" />

      {/* Arrows */}
      <button
        aria-label="Previous offer"
        onClick={goPrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/90 backdrop-blur shadow-soft flex items-center justify-center text-foreground hover:bg-white hover:scale-110 transition-all"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        aria-label="Next offer"
        onClick={goNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/90 backdrop-blur shadow-soft flex items-center justify-center text-foreground hover:bg-white hover:scale-110 transition-all"
      >
        <ChevronRight size={20} />
      </button>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div key={index} className="grid lg:grid-cols-2 gap-12 items-center animate-fade-in">
          {/* Left content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 text-xs font-bold text-primary shadow-soft">
              <Sparkles size={14} className="text-brand-pink" />
              {slide.badge}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-foreground">
              {slide.titleA}{" "}
              <span className={slide.titleBClass}>{slide.titleB}</span>
            </h1>

            <p className="text-lg font-semibold text-gradient-purple">{slide.subtitle}</p>
            <p className="text-base text-muted-foreground max-w-xl">{slide.description}</p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={onCompare}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-purple px-7 py-3.5 text-base font-bold text-white shadow-glow-pink hover:scale-105 transition-all animate-pulse-glow"
              >
                {slide.ctaLabel}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onTalk}
                className="inline-flex items-center gap-2 rounded-full bg-white border-2 border-primary/20 px-7 py-3.5 text-base font-bold text-primary hover:bg-primary hover:text-white transition-all"
              >
                Talk to Expert
              </button>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <div className="relative">
                <img src={aiAvatar} alt="AI Assistant" className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-soft" />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-brand-green border-2 border-white animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Meet Riya — Your AI Advisor</p>
                <p className="text-xs text-muted-foreground">Speaks Hindi, English, Tamil, Telugu, Bengali +6 more</p>
              </div>
            </div>
          </div>

          {/* Right floating cards */}
          <div className="relative h-[480px] lg:h-[520px]">
            <div className="absolute inset-x-8 top-12 bottom-12 rounded-3xl bg-gradient-primary opacity-10 blur-2xl" />

            {/* Top-left main card */}
            <div className="absolute left-0 top-8 w-64 rounded-2xl bg-white p-5 shadow-card animate-float">
              <div className="h-12 w-12 rounded-xl bg-gradient-purple flex items-center justify-center text-white shadow-glow-pink mb-3">
                <CreditCard size={22} />
              </div>
              <p className="font-display font-extrabold text-foreground text-lg leading-tight">{slide.titleB}</p>
              <p className="text-xs text-muted-foreground mt-1">{slide.subtitle}</p>
            </div>

            {/* Card 1 */}
            <div className="absolute right-0 top-0 w-60 rounded-2xl bg-white p-5 shadow-card animate-float" style={{ animationDelay: "1s" }}>
              <div className="h-12 w-12 rounded-xl bg-gradient-purple flex items-center justify-center text-white shadow-glow-pink mb-3">
                <slide.cards[0].icon size={22} />
              </div>
              <p className="font-display font-bold text-foreground">{slide.cards[0].title}</p>
              <p className={`text-xs mt-1 ${slide.cards[0].valueClass ?? "text-muted-foreground"}`}>{slide.cards[0].value}</p>
              <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-primary rounded-full" />
              </div>
            </div>

            {/* Center bubble */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full bg-white shadow-card flex flex-col items-center justify-center animate-float-slow border border-border">
              <p className="text-xs text-muted-foreground">{slide.bubble.label}</p>
              <p className="font-display font-extrabold text-4xl text-brand-orange">{slide.bubble.value}</p>
              <p className="text-xs text-brand-green font-semibold mt-1">{slide.bubble.sub}</p>
            </div>

            {/* Card 2 */}
            <div className="absolute right-2 bottom-12 w-60 rounded-2xl bg-white p-5 shadow-card animate-float" style={{ animationDelay: "2s" }}>
              <div className="h-12 w-12 rounded-xl bg-gradient-purple flex items-center justify-center text-white shadow-glow-pink mb-3">
                <slide.cards[1].icon size={22} />
              </div>
              <p className="font-display font-bold text-foreground">{slide.cards[1].title}</p>
              <p className={`font-extrabold text-xl mt-1 ${slide.cards[1].valueClass ?? "text-foreground"}`}>{slide.cards[1].value}</p>
            </div>

            {/* Secure */}
            <div className="absolute left-4 bottom-0 w-56 rounded-2xl bg-white p-4 shadow-card animate-float" style={{ animationDelay: "1.5s" }}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white shrink-0">
                  <Shield size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm">100% Secure</p>
                  <p className="text-[10px] text-muted-foreground">RBI compliant • SSL</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

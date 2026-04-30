import { CreditCard, Percent, Zap, Shield, ArrowRight, Sparkles } from "lucide-react";
import aiAvatar from "@/assets/ai-riya.jpg";

export function Hero({ onCompare, onTalk }: { onCompare: () => void; onTalk: () => void }) {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-brand-purple/20 blur-3xl" />
      <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-brand-cyan/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 text-xs font-bold text-primary shadow-soft">
              <Sparkles size={14} className="text-brand-pink" />
              India's #1 Financial Marketplace
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-foreground">
              Compare & Choose the{" "}
              <span className="text-gradient-purple">Best Financial</span>{" "}
              <span className="text-gradient-primary">Products</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              Loans, credit cards, insurance, mutual funds & more — all in one place. Earn up to 5% cashback, get instant approval in 5 minutes.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={onCompare}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-purple px-7 py-3.5 text-base font-bold text-white shadow-glow-pink hover:scale-105 transition-all animate-pulse-glow"
              >
                Compare Products
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
            {/* Background glow card */}
            <div className="absolute inset-x-8 top-12 bottom-12 rounded-3xl bg-gradient-primary opacity-10 blur-2xl" />

            {/* Premium Credit Card title card */}
            <div
              className="absolute left-0 top-8 w-64 rounded-2xl bg-white p-5 shadow-card animate-float"
              style={{ animationDelay: "0s" }}
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-purple flex items-center justify-center text-white shadow-glow-pink mb-3">
                <CreditCard size={22} />
              </div>
              <p className="font-display font-extrabold text-foreground text-lg leading-tight">Premium Credit Cards</p>
              <p className="text-xs text-muted-foreground mt-1">Earn up to 5% cashback</p>
            </div>

            {/* Low Interest card */}
            <div
              className="absolute right-0 top-0 w-60 rounded-2xl bg-white p-5 shadow-card animate-float"
              style={{ animationDelay: "1s" }}
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-purple flex items-center justify-center text-white shadow-glow-pink mb-3">
                <Percent size={22} />
              </div>
              <p className="font-display font-bold text-foreground">Low Interest</p>
              <p className="text-xs text-muted-foreground mt-1">Starting from 10.5% p.a.</p>
              <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-primary rounded-full" />
              </div>
            </div>

            {/* Center cashback bubble */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full bg-white shadow-card flex flex-col items-center justify-center animate-float-slow border border-border">
              <p className="text-xs text-muted-foreground">Cashback</p>
              <p className="font-display font-extrabold text-4xl text-brand-orange">₹5,000</p>
              <p className="text-xs text-brand-green font-semibold mt-1">+ Welcome Bonus</p>
            </div>

            {/* Instant Approval card */}
            <div
              className="absolute right-2 bottom-12 w-60 rounded-2xl bg-white p-5 shadow-card animate-float"
              style={{ animationDelay: "2s" }}
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-purple flex items-center justify-center text-white shadow-glow-pink mb-3">
                <Zap size={22} />
              </div>
              <p className="font-display font-bold text-foreground">Instant Approval</p>
              <p className="text-brand-green font-extrabold text-xl mt-1">5 Minutes</p>
            </div>

            {/* Secure card */}
            <div
              className="absolute left-4 bottom-0 w-56 rounded-2xl bg-white p-4 shadow-card animate-float"
              style={{ animationDelay: "1.5s" }}
            >
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
      </div>
    </section>
  );
}

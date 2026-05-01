import { CreditCard, Plane, ShoppingBag, Fuel, Star, Check, Zap } from "lucide-react";
import imgCard from "@/assets/products/credit-card.jpg";

const cards = [
  {
    id: "platinum",
    name: "₹OI Platinum",
    tag: "Most Popular",
    bg: "from-indigo-600 via-purple-600 to-pink-600",
    cashback: "5%",
    fee: "₹999 (Waived on ₹2L spend)",
    perks: ["5% cashback on online shopping", "Airport lounge access (8/yr)", "Movie ticket BOGO", "Fuel surcharge waiver"],
    icon: ShoppingBag,
  },
  {
    id: "travel",
    name: "₹OI Travel Elite",
    tag: "Best for Travel",
    bg: "from-cyan-500 via-blue-600 to-indigo-700",
    cashback: "10X",
    fee: "₹2,499 LTF on spend",
    perks: ["10X reward points on flights & hotels", "Unlimited lounge access worldwide", "Free travel insurance ₹50L", "Priority Pass membership"],
    icon: Plane,
  },
  {
    id: "fuel",
    name: "₹OI Fuel Saver",
    tag: "Lifetime Free",
    bg: "from-orange-500 via-red-500 to-rose-600",
    cashback: "4%",
    fee: "₹0 — Lifetime Free",
    perks: ["4% cashback on fuel spends", "1% surcharge waiver", "Roadside assistance", "Reward points on groceries"],
    icon: Fuel,
  },
];

export function CreditCards({ onAction }: { onAction: (label: string, item?: string) => void }) {
  return (
    <section id="cards" className="py-16 lg:py-24 bg-gradient-to-b from-white to-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-primary uppercase tracking-wider">Credit Cards</p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold mt-2">
            Premium <span className="text-gradient-purple">Credit Cards</span> for You
          </h2>
          <p className="mt-3 text-muted-foreground text-lg max-w-2xl mx-auto">
            Earn up to 5% cashback, lounge access, and exclusive rewards. Instant approval in 5 minutes.
          </p>
        </div>

        {/* Hero banner */}
        <div className="relative rounded-3xl overflow-hidden mb-12 shadow-card">
          <img src={imgCard} alt="Credit Cards" className="w-full h-56 lg:h-72 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex items-center">
            <div className="p-6 lg:p-12 text-white max-w-lg">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-bold mb-3">
                <Star size={12} className="fill-yellow-300 text-yellow-300" /> Welcome bonus ₹5,000
              </div>
              <h3 className="font-display text-2xl lg:text-4xl font-extrabold leading-tight">
                Apply once. Enjoy lifetime rewards.
              </h3>
              <p className="text-sm lg:text-base text-white/80 mt-2">No income proof needed for select cards. RBI approved.</p>
            </div>
          </div>
        </div>

        {/* Card grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div key={c.id} className="group rounded-3xl bg-white border border-border overflow-hidden hover:shadow-glow hover:-translate-y-1 transition-all">
              {/* 3D card preview */}
              <div className={`relative h-48 bg-gradient-to-br ${c.bg} p-5 flex flex-col justify-between text-white`}>
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
                <div className="absolute -right-4 bottom-4 h-20 w-20 rounded-full bg-white/10" />
                <div className="flex items-start justify-between relative">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur px-2 py-1 rounded-full">{c.tag}</span>
                  <c.icon size={22} />
                </div>
                <div className="relative">
                  <p className="text-xs opacity-80 font-mono">**** **** **** 1234</p>
                  <p className="font-display font-extrabold text-lg mt-1">{c.name}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-display font-extrabold text-3xl text-gradient-primary">{c.cashback}</span>
                  <span className="text-xs text-muted-foreground">cashback / rewards</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">Annual fee: <span className="font-semibold text-foreground">{c.fee}</span></p>
                <ul className="space-y-2 mb-5">
                  {c.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-foreground/80">
                      <Check size={14} className="text-brand-green shrink-0 mt-0.5" /> {p}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <button
                    onClick={() => onAction("Apply Now", c.name)}
                    className="flex-1 rounded-full bg-gradient-primary text-white font-bold text-sm py-2.5 shadow-glow hover:scale-[1.02] transition flex items-center justify-center gap-1.5"
                  >
                    <Zap size={14} /> Apply Now
                  </button>
                  <button
                    onClick={() => onAction("Compare Card", c.name)}
                    className="rounded-full border border-border px-4 text-sm font-semibold hover:border-primary hover:text-primary transition"
                  >
                    Compare
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits strip */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Zap, title: "Instant Approval", desc: "Decision in 5 mins" },
            { icon: CreditCard, title: "Zero Hidden Fees", desc: "Transparent pricing" },
            { icon: Plane, title: "Lounge Access", desc: "Airports worldwide" },
            { icon: Star, title: "Reward Points", desc: "Up to 10X earnings" },
          ].map((b) => (
            <div key={b.title} className="rounded-2xl bg-white border border-border p-5 hover:shadow-soft transition">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary text-white flex items-center justify-center mb-3">
                <b.icon size={18} />
              </div>
              <p className="font-display font-extrabold text-foreground">{b.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

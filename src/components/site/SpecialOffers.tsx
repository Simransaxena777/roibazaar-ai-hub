import { Gift, Zap, Percent, TrendingUp, Flame } from "lucide-react";

const deals = [
  {
    badge: "LIMITED TIME",
    badgeColor: "bg-blue-500",
    icon: Percent,
    title: "0% EMI for 12 Months",
    subtitle: "On Premium Credit Cards",
    desc: "Convert any purchase to easy EMI with zero interest charges",
    cta: "Apply Now",
    gradient: "from-blue-50 to-cyan-50",
    iconGradient: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
  {
    badge: "EXCLUSIVE",
    badgeColor: "bg-pink-500",
    icon: Gift,
    title: "₹10K Cashback",
    subtitle: "₹10,000 Welcome Bonus",
    desc: "Apply for premium credit cards and get instant cashback",
    cta: "Get Card",
    gradient: "from-pink-50 to-purple-50",
    iconGradient: "bg-gradient-purple",
    titleColor: "text-gradient-purple",
  },
  {
    badge: "HOT DEAL",
    badgeColor: "bg-red-500",
    icon: Zap,
    title: "Instant",
    subtitle: "5-Minute Approval",
    desc: "Get your loan approved and disbursed within 5 minutes",
    cta: "Apply Loan",
    gradient: "from-emerald-50 to-teal-50",
    iconGradient: "bg-gradient-to-br from-emerald-500 to-teal-500",
    titleColor: "text-emerald-600",
  },
  {
    badge: "TRENDING",
    badgeColor: "bg-orange-500",
    icon: TrendingUp,
    title: "18% Returns",
    subtitle: "Top Mutual Funds",
    desc: "Start SIP from just ₹500 and grow your wealth",
    cta: "Invest Now",
    gradient: "from-amber-50 to-orange-50",
    iconGradient: "bg-gradient-to-br from-amber-500 to-orange-500",
    titleColor: "text-orange-600",
  },
];

export function SpecialOffers({ onAction }: { onAction: (label: string) => void }) {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-400 to-red-500 px-5 py-2 text-xs font-extrabold text-white uppercase tracking-wider shadow-glow mb-4">
            <Flame size={14} /> Special Offers
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-foreground">
            Exclusive Deals You Can't Miss
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">Limited time offers with maximum savings</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((d, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${d.gradient} p-6 border border-white shadow-card hover:shadow-glow hover:-translate-y-2 transition-all duration-300`}
            >
              <span className={`absolute top-4 right-4 ${d.badgeColor} text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wide`}>
                {d.badge}
              </span>
              <div className={`h-14 w-14 rounded-2xl ${d.iconGradient} flex items-center justify-center text-white shadow-glow mb-4 group-hover:scale-110 transition-transform`}>
                <d.icon size={26} />
              </div>
              <h3 className={`font-display text-2xl font-extrabold ${d.titleColor || "text-foreground"}`}>
                {d.title}
              </h3>
              <p className="font-bold text-foreground mt-1">{d.subtitle}</p>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{d.desc}</p>
              <button
                onClick={() => onAction(d.cta)}
                className={`mt-5 w-full rounded-full ${d.iconGradient} text-white font-bold text-sm py-2.5 shadow-soft hover:shadow-glow transition-shadow`}
              >
                {d.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

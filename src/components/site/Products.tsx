import { useState } from "react";
import { CreditCard, Home, Briefcase, Car, GraduationCap, TrendingUp, PiggyBank, Shield, Zap, Star } from "lucide-react";
import imgPersonal from "@/assets/products/personal-loan.jpg";
import imgHome from "@/assets/products/home-loan.jpg";
import imgCar from "@/assets/products/car-loan.jpg";
import imgCard from "@/assets/products/credit-card.jpg";
import imgEdu from "@/assets/products/education-loan.jpg";
import imgBiz from "@/assets/products/business-loan.jpg";
import imgMF from "@/assets/products/mutual-funds.jpg";
import imgFD from "@/assets/products/fixed-deposit.jpg";
import imgHealth from "@/assets/insurance/health.jpg";

const products = [
  { id: "personal-loan", icon: Briefcase, image: imgPersonal, title: "Personal Loan", desc: "Quick personal loans for any need", rate: "10.5% p.a.", features: ["Loans up to ₹40L", "Tenure up to 7 years", "No collateral"], color: "from-blue-500 to-indigo-600", cta: "Apply Now", category: "loans" },
  { id: "home-loan", icon: Home, image: imgHome, title: "Home Loan", desc: "Make your dream home a reality", rate: "8.40% p.a.", features: ["Loans up to ₹10Cr", "Tenure up to 30 years", "Tax benefits"], color: "from-emerald-500 to-teal-600", cta: "Apply Now", category: "loans" },
  { id: "car-loan", icon: Car, image: imgCar, title: "Car Loan", desc: "Drive home your favorite car today", rate: "9.25% p.a.", features: ["100% on-road funding", "Quick approval", "Zero processing fee"], color: "from-orange-500 to-red-600", cta: "Apply Now", category: "loans" },
  { id: "credit-card", icon: CreditCard, image: imgCard, title: "Credit Cards", desc: "Premium cards with rewards", rate: "5% Cashback", features: ["Lifetime free options", "Airport lounge access", "Reward points"], color: "from-purple-500 to-pink-600", cta: "Apply Now", category: "cards" },
  { id: "education-loan", icon: GraduationCap, image: imgEdu, title: "Education Loan", desc: "Fund your higher education", rate: "8.85% p.a.", features: ["Up to ₹1.5Cr", "Moratorium period", "Tax benefits u/s 80E"], color: "from-cyan-500 to-blue-600", cta: "Apply Now", category: "loans" },
  { id: "business-loan", icon: Briefcase, image: imgBiz, title: "Business Loan", desc: "Grow your business faster", rate: "11.5% p.a.", features: ["Up to ₹50L", "Minimal documentation", "48hr disbursal"], color: "from-amber-500 to-orange-600", cta: "Apply Now", category: "loans" },
  { id: "mutual-funds", icon: TrendingUp, image: imgMF, title: "Mutual Funds", desc: "Top performing equity funds", rate: "18%+ returns", features: ["SIP from ₹500", "Tax saving ELSS", "Expert curated"], color: "from-violet-500 to-purple-600", cta: "Invest Now", category: "investments" },
  { id: "fixed-deposit", icon: PiggyBank, image: imgFD, title: "Fixed Deposit", desc: "Safe & guaranteed returns", rate: "8.25% p.a.", features: ["Senior citizen extra", "Flexible tenure", "Auto renewal"], color: "from-pink-500 to-rose-600", cta: "Invest Now", category: "investments" },
  { id: "insurance", icon: Shield, image: imgHealth, title: "Health Insurance", desc: "Protect your family's health", rate: "₹250/month", features: ["Cashless 10,000+ hospitals", "No claim bonus", "Tax benefits"], color: "from-green-500 to-emerald-600", cta: "Buy Now", category: "insurance" },
];

const tabs = [
  { id: "all", label: "All Products" },
  { id: "loans", label: "Loans & Cards" },
  { id: "investments", label: "Investments" },
  { id: "insurance", label: "Insurance" },
];

export function Products({ onAction }: { onAction: (product: string, cta: string) => void }) {
  const [activeTab, setActiveTab] = useState("all");
  const filtered = activeTab === "all" ? products : products.filter(p => p.category === activeTab || (activeTab === "loans" && p.category === "cards"));

  return (
    <section id="loans" className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-bold text-primary uppercase tracking-wider">Our Products</p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold mt-2">
            Find the <span className="text-gradient-primary">Perfect Match</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">Compare and apply in minutes</p>
        </div>

        {/* Sticky pill tabs */}
        <div className="sticky top-16 z-30 -mx-4 px-4 py-3 bg-background/80 backdrop-blur-md mb-8">
          <div className="flex justify-center gap-2 flex-wrap">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeTab === t.id
                    ? "bg-gradient-primary text-white shadow-glow"
                    : "bg-muted text-foreground hover:bg-muted/70"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="group relative rounded-3xl bg-white border border-border hover:border-primary/30 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Real image banner */}
              <div className="relative h-40 overflow-hidden">
                <img src={p.image} alt={p.title} className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" width={768} height={512} />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent`} />
                <div className={`absolute top-3 left-3 h-11 w-11 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white shadow-glow`}>
                  <p.icon size={20} />
                </div>
                <div className="absolute top-3 right-3 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-[10px] font-extrabold text-primary shadow-soft">
                  {p.rate}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-display font-extrabold text-xl text-foreground">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                <ul className="mt-4 space-y-2 flex-1">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                      <Star size={12} className="text-primary fill-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onAction(p.title, p.cta)}
                  className={`mt-5 w-full rounded-full bg-gradient-to-r ${p.color} text-white font-bold text-sm py-3 shadow-soft hover:shadow-glow transition-all flex items-center justify-center gap-2`}
                >
                  <Zap size={14} /> {p.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

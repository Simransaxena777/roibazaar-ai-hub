import { Heart, ShieldCheck, Car, Plane } from "lucide-react";

const plans = [
  { icon: Heart, title: "Health Insurance", desc: "Cashless treatment at 10,000+ hospitals", price: "₹250/month", color: "from-pink-500 to-rose-600", coverage: "Up to ₹1Cr" },
  { icon: ShieldCheck, title: "Life Insurance", desc: "Secure your family's future", price: "₹500/month", color: "from-blue-500 to-indigo-600", coverage: "Up to ₹2Cr" },
  { icon: Car, title: "Vehicle Insurance", desc: "Comprehensive cover for car & bike", price: "₹2,000/year", color: "from-amber-500 to-orange-600", coverage: "Zero depreciation" },
  { icon: Plane, title: "Travel Insurance", desc: "Worldwide coverage for trips", price: "₹150/trip", color: "from-emerald-500 to-teal-600", coverage: "Up to $50,000" },
];

export function Insurance({ onAction }: { onAction: (label: string, item?: string) => void }) {
  return (
    <section id="insurance" className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-bold text-primary uppercase tracking-wider">Protection Plans</p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold mt-2">
            Insurance for <span className="text-gradient-primary">Everyone</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">Compare 30+ insurers in one place</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map(p => (
            <div key={p.title} className="group rounded-3xl bg-white border border-border p-6 hover:border-primary/30 hover:shadow-glow hover:-translate-y-1 transition-all">
              <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white shadow-card group-hover:scale-110 transition-transform`}>
                <p.icon size={26} />
              </div>
              <h3 className="font-display font-extrabold text-xl mt-4">{p.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
              <div className="mt-4 flex justify-between items-center text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Starting at</p>
                  <p className="font-extrabold text-primary">{p.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Coverage</p>
                  <p className="font-bold text-emerald-600">{p.coverage}</p>
                </div>
              </div>
              <button
                onClick={() => onAction("Buy Insurance", p.title)}
                className={`mt-5 w-full rounded-full bg-gradient-to-r ${p.color} text-white font-bold text-sm py-3 shadow-soft hover:shadow-glow transition`}
              >
                Get Quote
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Smartphone, Tv, Zap, CarFront, CreditCard, Wifi } from "lucide-react";

const services = [
  { icon: Smartphone, label: "Mobile Recharge", color: "from-blue-500 to-indigo-600" },
  { icon: Tv, label: "DTH Recharge", color: "from-purple-500 to-pink-600" },
  { icon: Zap, label: "Electricity Bill", color: "from-amber-500 to-orange-600" },
  { icon: CarFront, label: "FASTag Recharge", color: "from-emerald-500 to-teal-600" },
  { icon: CreditCard, label: "Credit Card Bill", color: "from-rose-500 to-red-600" },
  { icon: Wifi, label: "Broadband Bill", color: "from-cyan-500 to-blue-600" },
];

export function Recharge({ onAction }: { onAction: (label: string) => void }) {
  return (
    <section id="recharge" className="py-16 lg:py-24 bg-gradient-hero">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-bold text-primary uppercase tracking-wider">Quick Pay</p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold mt-2">
            Recharge & <span className="text-gradient-primary">Pay Bills</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">All your bills in one place • Earn cashback on every payment</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map(s => (
            <button
              key={s.label}
              onClick={() => onAction(s.label)}
              className="group rounded-2xl bg-white p-5 text-center border border-border hover:border-primary/40 hover:shadow-glow hover:-translate-y-1 transition-all"
            >
              <div className={`mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-card group-hover:scale-110 transition-transform mb-3`}>
                <s.icon size={26} />
              </div>
              <p className="text-sm font-bold">{s.label}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, AreaChart, Area } from "recharts";
import { TrendingUp, PiggyBank, BarChart3, Coins, ArrowRight } from "lucide-react";

const portfolio = [
  { month: "Jan", value: 100000 }, { month: "Feb", value: 108000 }, { month: "Mar", value: 105000 },
  { month: "Apr", value: 118000 }, { month: "May", value: 132000 }, { month: "Jun", value: 145000 },
  { month: "Jul", value: 158000 }, { month: "Aug", value: 172000 }, { month: "Sep", value: 185000 },
];

const funds = [
  { name: "Axis Bluechip Fund", category: "Large Cap", returns3y: 18.5, rating: 5, min: 500 },
  { name: "Mirae Asset Emerging", category: "Mid Cap", returns3y: 24.2, rating: 5, min: 1000 },
  { name: "Parag Parikh Flexi Cap", category: "Flexi Cap", returns3y: 22.8, rating: 5, min: 1000 },
  { name: "SBI Small Cap Fund", category: "Small Cap", returns3y: 28.5, rating: 4, min: 500 },
];

const tabs = [
  { id: "mf", label: "Mutual Funds", icon: TrendingUp },
  { id: "fd", label: "Fixed Deposits", icon: PiggyBank },
  { id: "stocks", label: "Stocks", icon: BarChart3 },
  { id: "bonds", label: "Bonds", icon: Coins },
];

export function Investments({ onAction }: { onAction: (label: string, item?: string) => void }) {
  const [tab, setTab] = useState("mf");
  const [sip, setSip] = useState(5000);
  const [years, setYears] = useState(10);
  const [returnRate] = useState(15);

  const futureValue = Math.round(sip * (((Math.pow(1 + returnRate / 100 / 12, years * 12) - 1) / (returnRate / 100 / 12)) * (1 + returnRate / 100 / 12)));
  const invested = sip * years * 12;
  const gains = futureValue - invested;

  return (
    <section id="investments" className="py-16 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-bold text-primary uppercase tracking-wider">Grow Your Wealth</p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold mt-2">
            Smart <span className="text-gradient-purple">Investments</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">Start with as low as ₹500 per month</p>
        </div>

        <div className="flex justify-center gap-2 flex-wrap mb-8">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                tab === t.id ? "bg-gradient-purple text-white shadow-glow-pink" : "bg-white text-foreground hover:bg-white/70"
              }`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Portfolio Graph - large */}
          <div className="lg:col-span-2 rounded-3xl bg-white p-6 lg:p-8 shadow-card border border-border">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Portfolio Performance</p>
                <p className="font-display font-extrabold text-3xl mt-1">₹1,85,000</p>
                <p className="text-sm text-emerald-600 font-bold flex items-center gap-1"><TrendingUp size={14} /> +85% (9 months)</p>
              </div>
              <button
                onClick={() => onAction("View Full Portfolio")}
                className="rounded-full bg-gradient-primary text-white font-bold text-sm px-5 py-2.5 shadow-glow flex items-center gap-2"
              >
                View Full Portfolio <ArrowRight size={14} />
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={portfolio}>
                  <defs>
                    <linearGradient id="pfGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.62 0.24 305)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="oklch(0.62 0.24 305)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 260)" />
                  <XAxis dataKey="month" stroke="oklch(0.5 0.03 260)" fontSize={11} />
                  <YAxis stroke="oklch(0.5 0.03 260)" fontSize={11} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`} />
                  <Area type="monotone" dataKey="value" stroke="oklch(0.62 0.24 305)" strokeWidth={3} fill="url(#pfGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* SIP Calculator */}
          <div className="rounded-3xl bg-gradient-to-br from-primary to-brand-purple text-white p-6 shadow-card">
            <p className="text-xs font-bold uppercase tracking-wider opacity-80">SIP Calculator</p>
            <h3 className="font-display font-extrabold text-2xl mt-1">Start Investing</h3>

            <div className="mt-6">
              <label className="text-xs font-bold opacity-80">Monthly SIP</label>
              <div className="flex justify-between items-center">
                <input type="range" min={500} max={50000} step={500} value={sip} onChange={(e) => setSip(+e.target.value)} className="w-full mt-2 accent-white" />
              </div>
              <p className="font-extrabold text-xl">₹{sip.toLocaleString("en-IN")}</p>
            </div>
            <div className="mt-4">
              <label className="text-xs font-bold opacity-80">Years</label>
              <input type="range" min={1} max={30} value={years} onChange={(e) => setYears(+e.target.value)} className="w-full mt-2 accent-white" />
              <p className="font-extrabold text-xl">{years} years</p>
            </div>

            <div className="mt-6 space-y-2 border-t border-white/20 pt-4 text-sm">
              <div className="flex justify-between"><span className="opacity-80">Invested</span><span className="font-bold">₹{invested.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between"><span className="opacity-80">Gains</span><span className="font-bold text-yellow-300">₹{gains.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between text-lg pt-2 border-t border-white/20"><span className="font-bold">Future Value</span><span className="font-extrabold">₹{futureValue.toLocaleString("en-IN")}</span></div>
            </div>

            <button
              onClick={() => onAction("Start SIP", `₹${sip}/month for ${years} years`)}
              className="mt-6 w-full rounded-full bg-white text-primary font-extrabold py-3 hover:scale-105 transition-transform"
            >
              Start SIP Now
            </button>
          </div>
        </div>

        {/* Top Funds */}
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-card border border-border">
          <h3 className="font-display font-extrabold text-xl mb-4">Top Performing Mutual Funds</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {funds.map(f => (
              <div key={f.name} className="p-4 rounded-2xl border border-border hover:border-primary/40 hover:shadow-soft transition-all">
                <div className="flex items-start justify-between">
                  <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold">{f.category}</span>
                  <span className="text-yellow-500 text-xs">{"★".repeat(f.rating)}</span>
                </div>
                <h4 className="font-bold text-sm mt-3">{f.name}</h4>
                <div className="mt-3 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-muted-foreground">3Y Returns</p>
                    <p className="font-extrabold text-emerald-600 text-xl">{f.returns3y}%</p>
                  </div>
                  <button
                    onClick={() => onAction("Invest Now", f.name)}
                    className="rounded-full bg-gradient-purple text-white text-xs font-bold px-3 py-2 shadow-soft"
                  >
                    Invest Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

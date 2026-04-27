import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Calculator } from "lucide-react";

const variants = [
  { id: "personal", label: "Personal", rate: 10.5, max: 4000000 },
  { id: "home", label: "Home", rate: 8.4, max: 100000000 },
  { id: "car", label: "Car", rate: 9.25, max: 5000000 },
  { id: "education", label: "Education", rate: 8.85, max: 15000000 },
];

export function EmiCalculator() {
  const [variant, setVariant] = useState(variants[0]);
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(variants[0].rate);
  const [tenure, setTenure] = useState(36);

  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure;
    const e = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = e * n;
    return { emi: Math.round(e), totalInterest: Math.round(total - amount), totalPayment: Math.round(total) };
  }, [amount, rate, tenure]);

  const data = [
    { name: "Principal", value: amount, color: "oklch(0.55 0.22 275)" },
    { name: "Interest", value: totalInterest, color: "oklch(0.68 0.25 350)" },
  ];

  const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <section id="calculator" className="py-16 lg:py-24 bg-gradient-hero">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-extrabold text-primary uppercase tracking-wider shadow-soft mb-4">
            <Calculator size={14} /> EMI Calculator
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold">
            Plan Your <span className="text-gradient-primary">EMI</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">Calculate your monthly installments instantly</p>
        </div>

        <div className="rounded-3xl bg-white p-6 lg:p-10 shadow-card border border-border">
          {/* Variant pills */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {variants.map(v => (
              <button
                key={v.id}
                onClick={() => { setVariant(v); setRate(v.rate); }}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  variant.id === v.id ? "bg-gradient-primary text-white shadow-glow" : "bg-muted text-foreground"
                }`}
              >
                {v.label} Loan
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <SliderField label="Loan Amount" value={amount} onChange={setAmount} min={50000} max={variant.max} step={10000} format={fmt} />
              <SliderField label="Interest Rate (% p.a.)" value={rate} onChange={setRate} min={6} max={24} step={0.05} format={(n) => `${n.toFixed(2)}%`} />
              <SliderField label="Loan Tenure (Months)" value={tenure} onChange={setTenure} min={6} max={360} step={6} format={(n) => `${n} months`} />
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-muted/50 to-white p-6 border border-border">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Stat label="Monthly EMI" value={fmt(emi)} highlight />
                <Stat label="Total Interest" value={fmt(totalInterest)} />
                <Stat label="Principal" value={fmt(amount)} />
                <Stat label="Total Payment" value={fmt(totalPayment)} />
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={2}>
                      {data.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 text-xs">
                <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-primary" /> Principal</span>
                <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-brand-pink" /> Interest</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SliderField({ label, value, onChange, min, max, step, format }: {
  label: string; value: number; onChange: (n: number) => void; min: number; max: number; step: number; format: (n: number) => string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-sm font-bold text-foreground">{label}</label>
        <span className="text-sm font-extrabold text-primary">{format(value)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary"
        style={{
          background: `linear-gradient(to right, oklch(0.55 0.22 275) ${((value - min) / (max - min)) * 100}%, oklch(0.92 0.01 260) ${((value - min) / (max - min)) * 100}%)`,
        }}
      />
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`p-3 rounded-xl ${highlight ? "bg-gradient-primary text-white" : "bg-white border border-border"}`}>
      <p className={`text-xs ${highlight ? "text-white/80" : "text-muted-foreground"}`}>{label}</p>
      <p className={`font-display font-extrabold text-lg ${highlight ? "text-white" : "text-foreground"} mt-1`}>{value}</p>
    </div>
  );
}

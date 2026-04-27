import { useState } from "react";
import { XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, Area, BarChart, Bar, CartesianGrid, Cell } from "recharts";
import { Download, Gauge, TrendingUp } from "lucide-react";

const bureaus = [
  { id: "cibil", name: "CIBIL", logo: "🏦", color: "from-blue-500 to-indigo-600", score: 782 },
  { id: "experian", name: "Experian", logo: "📊", color: "from-purple-500 to-pink-600", score: 765 },
  { id: "equifax", name: "Equifax", logo: "📈", color: "from-emerald-500 to-teal-600", score: 798 },
  { id: "highmark", name: "CRIF Highmark", logo: "⭐", color: "from-orange-500 to-red-600", score: 754 },
];

const trend = [
  { month: "Jan", score: 720 }, { month: "Feb", score: 735 }, { month: "Mar", score: 742 },
  { month: "Apr", score: 758 }, { month: "May", score: 765 }, { month: "Jun", score: 770 },
  { month: "Jul", score: 778 }, { month: "Aug", score: 782 },
];

const factors = [
  { name: "Payment History", value: 95, color: "oklch(0.65 0.18 155)" },
  { name: "Credit Utilization", value: 78, color: "oklch(0.55 0.22 275)" },
  { name: "Credit Age", value: 85, color: "oklch(0.74 0.14 215)" },
  { name: "Credit Mix", value: 70, color: "oklch(0.68 0.25 350)" },
  { name: "New Inquiries", value: 88, color: "oklch(0.72 0.18 45)" },
];

function ScoreGauge({ score }: { score: number }) {
  const min = 300, max = 900;
  const pct = ((score - min) / (max - min)) * 100;
  const angle = (pct / 100) * 180 - 90;
  const status = score >= 750 ? "Excellent" : score >= 700 ? "Good" : score >= 650 ? "Fair" : "Poor";
  const statusColor = score >= 750 ? "text-emerald-600" : score >= 700 ? "text-blue-600" : score >= 650 ? "text-amber-600" : "text-red-600";

  return (
    <div className="relative">
      <svg viewBox="0 0 200 120" className="w-full">
        <defs>
          <linearGradient id="gauge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.62 0.24 25)" />
            <stop offset="33%" stopColor="oklch(0.78 0.16 80)" />
            <stop offset="66%" stopColor="oklch(0.74 0.14 215)" />
            <stop offset="100%" stopColor="oklch(0.65 0.18 155)" />
          </linearGradient>
        </defs>
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="oklch(0.92 0.01 260)" strokeWidth="16" strokeLinecap="round" />
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#gauge)" strokeWidth="16" strokeLinecap="round"
          strokeDasharray={`${(pct / 100) * 251} 251`} />
        <g transform={`rotate(${angle} 100 100)`}>
          <line x1="100" y1="100" x2="100" y2="35" stroke="oklch(0.18 0.04 260)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="100" r="6" fill="oklch(0.18 0.04 260)" />
        </g>
      </svg>
      <div className="text-center -mt-8">
        <p className="font-display font-extrabold text-5xl text-gradient-primary">{score}</p>
        <p className={`font-bold ${statusColor}`}>{status}</p>
        <p className="text-xs text-muted-foreground">out of 900</p>
      </div>
    </div>
  );
}

export function CreditScore({ onAction }: { onAction: (label: string) => void }) {
  const [active, setActive] = useState(bureaus[0]);

  return (
    <section id="credit-score" className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2 text-xs font-extrabold text-white uppercase tracking-wider shadow-glow mb-4">
            <Gauge size={14} /> Free Credit Score
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold">
            Check Your <span className="text-gradient-primary">Credit Score</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">All 4 bureaus, completely free, no impact on your score</p>
        </div>

        {/* Bureau selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {bureaus.map(b => (
            <button
              key={b.id}
              onClick={() => setActive(b)}
              className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${
                active.id === b.id
                  ? `bg-gradient-to-r ${b.color} text-white shadow-glow scale-105`
                  : "bg-muted text-foreground hover:bg-muted/70"
              }`}
            >
              <span className="text-lg">{b.logo}</span> {b.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Gauge card */}
          <div className="rounded-3xl bg-gradient-to-br from-muted/30 to-white border border-border p-8 shadow-card">
            <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">{active.name} Score</p>
            <div className="mt-4">
              <ScoreGauge score={active.score} />
            </div>
            <div className="mt-6 grid grid-cols-4 text-[10px] font-bold text-center">
              <div className="text-red-600">Poor<br/>300-649</div>
              <div className="text-amber-600">Fair<br/>650-699</div>
              <div className="text-blue-600">Good<br/>700-749</div>
              <div className="text-emerald-600">Excellent<br/>750+</div>
            </div>
            <button
              onClick={() => onAction("Download Report")}
              className="mt-6 w-full rounded-full bg-gradient-primary text-white font-bold py-3 shadow-glow hover:shadow-glow-pink transition flex items-center justify-center gap-2"
            >
              <Download size={16} /> Download Full Report
            </button>
          </div>

          {/* Trend */}
          <div className="rounded-3xl bg-white border border-border p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">8-Month Trend</p>
                <p className="font-display font-extrabold text-2xl mt-1">+62 points</p>
              </div>
              <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1">
                <TrendingUp size={12} /> Improving
              </span>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.55 0.22 275)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="oklch(0.55 0.22 275)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 260)" />
                  <XAxis dataKey="month" stroke="oklch(0.5 0.03 260)" fontSize={11} />
                  <YAxis domain={[700, 800]} stroke="oklch(0.5 0.03 260)" fontSize={11} />
                  <Tooltip />
                  <Area type="monotone" dataKey="score" stroke="oklch(0.55 0.22 275)" strokeWidth={3} fill="url(#scoreGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Factors */}
          <div className="rounded-3xl bg-white border border-border p-6 shadow-card">
            <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider mb-4">Score Factors</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={factors} layout="vertical">
                  <XAxis type="number" hide domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" stroke="oklch(0.5 0.03 260)" fontSize={10} width={110} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {factors.map((f, i) => <Cell key={i} fill={f.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <button
              onClick={() => onAction("Improve Score")}
              className="mt-4 w-full rounded-full bg-muted text-foreground font-bold py-3 hover:bg-primary hover:text-white transition"
            >
              Get Improvement Tips
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { TrendingUp, TrendingDown } from "lucide-react";

const tickerData = [
  { label: "NIFTY 50", value: "24,587.50", change: "+0.82%", up: true },
  { label: "SENSEX", value: "80,845.32", change: "+0.74%", up: true },
  { label: "BANK NIFTY", value: "52,142.10", change: "-0.21%", up: false },
  { label: "GOLD", value: "₹74,520/10g", change: "+0.45%", up: true },
  { label: "SILVER", value: "₹92,180/kg", change: "+1.12%", up: true },
  { label: "USD/INR", value: "₹83.42", change: "-0.05%", up: false },
  { label: "EUR/INR", value: "₹89.71", change: "+0.18%", up: true },
  { label: "REPO RATE", value: "6.50%", change: "Stable", up: true },
  { label: "FD RATE", value: "Up to 8.25%", change: "Best", up: true },
  { label: "CRUDE OIL", value: "$78.45", change: "+0.92%", up: true },
];

export function MarketTicker() {
  const items = [...tickerData, ...tickerData];
  return (
    <div className="bg-gradient-dark text-white overflow-hidden border-b border-white/10">
      <div className="flex items-center">
        <div className="hidden md:flex shrink-0 bg-gradient-primary px-4 py-2 text-xs font-bold uppercase tracking-wider">
          Live Market
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-6 py-2 text-sm">
                <span className="font-bold text-white/90">{item.label}</span>
                <span className="text-white">{item.value}</span>
                <span className={`flex items-center gap-1 text-xs font-semibold ${item.up ? "text-emerald-400" : "text-red-400"}`}>
                  {item.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

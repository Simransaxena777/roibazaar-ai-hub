import { Flame } from "lucide-react";

const offers = [
  "🎁 ₹10,000 Welcome Bonus on Premium Credit Cards",
  "⚡ Instant Personal Loan Approval in 5 Minutes",
  "💰 Earn up to 5% Cashback on Every Transaction",
  "🏠 Home Loans Starting from 8.40% p.a.",
  "📈 Top Mutual Funds with 18%+ Returns",
  "🛡️ Health Insurance from ₹250/month",
  "🚗 Car Loans with Zero Processing Fee",
  "💳 Lifetime Free Credit Cards Available",
];

export function OfferMarquee() {
  const items = [...offers, ...offers];
  return (
    <div className="bg-gradient-purple text-white py-3 overflow-hidden marquee-pause">
      <div className="flex items-center">
        <div className="shrink-0 flex items-center gap-2 px-5 font-bold text-xs uppercase tracking-wider bg-black/20">
          <Flame size={14} /> Hot Offers
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {items.map((o, i) => (
              <span key={i} className="px-8 text-sm font-semibold">{o}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { ArrowRight, X, Calendar, User, Clock } from "lucide-react";

type Post = {
  title: string;
  category: string;
  date: string;
  image: string;
  author: string;
  readTime: string;
  excerpt: string;
  content: string[];
};

const posts: Post[] = [
  {
    title: "How to Improve Your Credit Score by 100 Points",
    category: "Credit Score",
    date: "Apr 22, 2026",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80",
    author: "Priya Sharma",
    readTime: "6 min read",
    excerpt: "A practical, step-by-step playbook to boost your CIBIL score quickly and unlock better loan rates.",
    content: [
      "Your credit score is a three-digit number between 300 and 900 that determines whether banks will lend to you — and at what rate. A score above 750 unlocks the best interest rates, premium credit cards, and faster approvals.",
      "Step 1: Pay every EMI and credit card bill on time. Payment history accounts for 35% of your score. Even a single missed payment can drop your score by 50–80 points. Set up auto-pay for at least the minimum amount due.",
      "Step 2: Keep your credit utilization below 30%. If your card limit is ₹1,00,000, never let your outstanding balance cross ₹30,000. This single change can lift your score by 40+ points within 2 months.",
      "Step 3: Don't close old credit cards. The age of your oldest account contributes 15% to your score. Keep your oldest card active with small recurring purchases.",
      "Step 4: Limit new credit applications. Every hard inquiry shaves 5–10 points. Apply only when you genuinely need credit, and never within 90 days of an upcoming loan application.",
      "Step 5: Check your credit report on ₹OI Bazaar every month — for free. Dispute any errors immediately. Roughly 1 in 5 reports has an error that's silently dragging the score down.",
      "Follow these five steps consistently and most users see a 80–120 point improvement within 4–6 months.",
    ],
  },
  {
    title: "Best Mutual Funds for SIP Investment in 2026",
    category: "Investments",
    date: "Apr 18, 2026",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80",
    author: "Rahul Mehta",
    readTime: "8 min read",
    excerpt: "The top-performing equity, hybrid, and index funds to start your SIP journey in 2026.",
    content: [
      "Systematic Investment Plans (SIPs) remain the smartest way for Indian investors to build long-term wealth. With as little as ₹500/month, you get rupee-cost averaging, the magic of compounding, and disciplined investing — all in one product.",
      "Top Large-Cap Picks: Funds tracking the Nifty 50 and Sensex have delivered ~12–14% annualised returns over the past 10 years. Look for low expense ratios (under 0.5% for index funds) and consistent fund managers.",
      "Best Flexi-Cap Funds: These give the fund manager freedom to invest across market caps. Top performers in this category have generated 16–18% CAGR, making them ideal for 7+ year horizons.",
      "Hybrid Aggressive Funds: A blend of 65–80% equity and 20–35% debt, perfect for first-time investors. Lower volatility than pure equity, with 11–13% historical returns.",
      "ELSS Tax Savers: Save up to ₹46,800 in taxes under Section 80C while building wealth. The 3-year lock-in is the shortest among 80C products.",
      "How to start: Pick 2–3 funds across categories, set up auto-debit on the 5th of every month, and review annually — not monthly. Start small, stay consistent, and let compounding work its magic.",
      "Use the ₹OI Bazaar SIP calculator to project how a ₹5,000/month SIP grows into ₹50+ lakhs over 20 years.",
    ],
  },
  {
    title: "Personal Loan vs Credit Card: Which is Better?",
    category: "Loans",
    date: "Apr 15, 2026",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80",
    author: "Anjali Verma",
    readTime: "5 min read",
    excerpt: "When to swipe your card and when to take a personal loan — a side-by-side comparison.",
    content: [
      "Both personal loans and credit cards are unsecured forms of credit, but they serve very different purposes. Picking the wrong one can cost you tens of thousands in unnecessary interest.",
      "Interest rates: Personal loans range from 10.5% to 18% p.a. Credit card revolving credit charges 36–42% p.a. — nearly 3× higher. For any expense you can't repay within 45 days, a personal loan is significantly cheaper.",
      "Tenure & EMIs: Personal loans offer 1–5 year tenures with fixed EMIs, making budgeting predictable. Credit cards have no fixed tenure — minimum-due traps can keep you in debt for years.",
      "Best for personal loan: Wedding (₹3–10 lakh), home renovation, medical emergency, debt consolidation, higher education.",
      "Best for credit card: Daily expenses, online shopping, travel bookings, EMI conversions on appliances (often at 0% via partner offers), and earning reward points.",
      "Pro tip: Use a credit card for everything you'd buy anyway, but pay the full bill every month. Use a personal loan only for one-time large expenses you can't clear in 1–2 months.",
      "Compare 50+ personal loan offers and 30+ credit cards on ₹OI Bazaar to find the lowest rate for your profile.",
    ],
  },
];

export function Blog() {
  const [active, setActive] = useState<Post | null>(null);

  return (
    <>
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
            <div>
              <p className="text-sm font-bold text-primary uppercase tracking-wider">Latest Insights</p>
              <h2 className="font-display text-4xl lg:text-5xl font-extrabold mt-2">
                From Our <span className="text-gradient-primary">Blog</span>
              </h2>
            </div>
            <button
              onClick={() => setActive(posts[0])}
              className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              View all posts <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <article
                key={p.title}
                className="group rounded-3xl overflow-hidden bg-white border border-border hover:shadow-card hover:-translate-y-1 transition-all flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="self-start px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {p.category}
                  </span>
                  <h3 className="font-display font-extrabold text-lg mt-3 group-hover:text-primary transition-colors leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.excerpt}</p>
                  <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{p.date}</span>
                    <button
                      onClick={() => setActive(p)}
                      className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Read <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {active && <ArticleModal post={active} onClose={() => setActive(null)} />}
    </>
  );
}

function ArticleModal({ post, onClose }: { post: Post; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-up"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close article"
          className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white shadow-card"
        >
          <X size={18} />
        </button>

        <div className="aspect-[16/9] overflow-hidden shrink-0">
          <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
        </div>

        <div className="p-6 lg:p-8 overflow-y-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
            {post.category}
          </span>
          <h2 className="font-display text-2xl lg:text-3xl font-extrabold mt-3 leading-tight">
            {post.title}
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b border-border pb-4">
            <span className="flex items-center gap-1.5">
              <User size={14} /> {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {post.readTime}
            </span>
          </div>

          <div className="mt-6 space-y-4 text-foreground/80 leading-relaxed">
            {post.content.map((para, idx) => (
              <p key={idx} className={idx === 0 ? "text-lg font-medium text-foreground" : ""}>
                {para}
              </p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              Published by ₹OI Bazaar Editorial
            </span>
            <button
              onClick={onClose}
              className="rounded-full bg-gradient-primary text-white font-bold px-6 py-2.5 text-sm shadow-glow hover:scale-105 transition"
            >
              Close Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

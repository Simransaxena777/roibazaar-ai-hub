import { ArrowRight } from "lucide-react";

const posts = [
  { title: "How to Improve Your Credit Score by 100 Points", category: "Credit Score", date: "Apr 22, 2026", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80" },
  { title: "Best Mutual Funds for SIP Investment in 2026", category: "Investments", date: "Apr 18, 2026", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80" },
  { title: "Personal Loan vs Credit Card: Which is Better?", category: "Loans", date: "Apr 15, 2026", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80" },
];

export function Blog() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
          <div>
            <p className="text-sm font-bold text-primary uppercase tracking-wider">Latest Insights</p>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold mt-2">
              From Our <span className="text-gradient-primary">Blog</span>
            </h2>
          </div>
          <a href="#" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
            View all posts <ArrowRight size={16} />
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(p => (
            <article key={p.title} className="group rounded-3xl overflow-hidden bg-white border border-border hover:shadow-card hover:-translate-y-1 transition-all">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">{p.category}</span>
                <h3 className="font-display font-extrabold text-lg mt-3 group-hover:text-primary transition-colors leading-snug">{p.title}</h3>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{p.date}</span>
                  <span className="text-primary text-sm font-bold flex items-center gap-1">Read <ArrowRight size={12} /></span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

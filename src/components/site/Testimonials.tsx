import { Star } from "lucide-react";

const testimonials = [
  { name: "Priya Sharma", role: "Software Engineer, Bengaluru", text: "Got my home loan approved in just 5 minutes. The interest rate was 0.5% lower than my bank!", rating: 5, avatar: "https://i.pravatar.cc/100?img=47" },
  { name: "Rahul Verma", role: "Business Owner, Mumbai", text: "Compared 12 credit cards in seconds. The cashback I earn is unbelievable!", rating: 5, avatar: "https://i.pravatar.cc/100?img=12" },
  { name: "Anjali Mehta", role: "Doctor, Delhi", text: "The AI assistant Riya helped me pick the perfect mutual fund. Already up 22%!", rating: 5, avatar: "https://i.pravatar.cc/100?img=45" },
  { name: "Vikram Singh", role: "Architect, Pune", text: "Free credit score check from all 4 bureaus. Improved my CIBIL by 80 points!", rating: 5, avatar: "https://i.pravatar.cc/100?img=15" },
  { name: "Sneha Reddy", role: "Marketing Lead, Hyderabad", text: "Best fintech platform in India. Customer support is exceptional 24/7.", rating: 5, avatar: "https://i.pravatar.cc/100?img=44" },
  { name: "Arjun Kapoor", role: "CA, Chennai", text: "Insurance comparison saved me ₹8,000 on premium. Highly recommended!", rating: 5, avatar: "https://i.pravatar.cc/100?img=33" },
];

const leaders = [
  { name: "Aman Gupta", role: "Founder & CEO", avatar: "https://i.pravatar.cc/200?img=68" },
  { name: "Sneha Iyer", role: "Co-Founder & CTO", avatar: "https://i.pravatar.cc/200?img=49" },
  { name: "Karan Malhotra", role: "Chief Financial Officer", avatar: "https://i.pravatar.cc/200?img=13" },
  { name: "Divya Nair", role: "Head of Customer Success", avatar: "https://i.pravatar.cc/200?img=32" },
];

export function Testimonials() {
  const items = [...testimonials, ...testimonials];

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-primary uppercase tracking-wider">Trusted by Millions</p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold mt-2">
            What Our <span className="text-gradient-primary">Customers Say</span>
          </h2>
        </div>

        <div className="marquee-pause overflow-hidden mb-16">
          <div className="flex animate-marquee-slow gap-6">
            {items.map((t, i) => (
              <div key={i} className="shrink-0 w-80 rounded-3xl bg-gradient-to-br from-muted/30 to-white p-6 border border-border shadow-soft">
                <div className="flex gap-1 text-yellow-500">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                </div>
                <p className="mt-3 text-sm text-foreground/90 leading-relaxed">"{t.text}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} loading="lazy" className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-soft" />
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership */}
        <div className="text-center mb-10">
          <p className="text-sm font-bold text-primary uppercase tracking-wider">Leadership Team</p>
          <h3 className="font-display text-3xl lg:text-4xl font-extrabold mt-2">
            Meet the <span className="text-gradient-purple">Visionaries</span>
          </h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.map(l => (
            <div key={l.name} className="text-center group">
              <div className="relative mx-auto h-32 w-32 rounded-full overflow-hidden ring-4 ring-white shadow-card group-hover:scale-105 transition-transform">
                <div className="absolute inset-0 bg-gradient-primary opacity-20" />
                <img src={l.avatar} alt={l.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <p className="font-display font-extrabold mt-4">{l.name}</p>
              <p className="text-sm text-muted-foreground">{l.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const partners = [
  "HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak Mahindra", "Yes Bank",
  "IDFC FIRST", "Bajaj Finserv", "Tata Capital", "HDFC Life", "LIC", "Max Bupa",
  "Star Health", "Reliance General", "Aditya Birla", "Mahindra Finance"
];

export function Partners() {
  const items = [...partners, ...partners];
  return (
    <section className="py-12 bg-muted/30 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-6">
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Our Trusted Partners</p>
      </div>
      <div className="marquee-pause overflow-hidden">
        <div className="flex animate-marquee gap-12 items-center">
          {items.map((p, i) => (
            <div key={i} className="shrink-0 px-6 py-3 rounded-2xl bg-white border border-border font-display font-extrabold text-lg text-muted-foreground hover:text-primary transition-colors min-w-[180px] text-center shadow-soft">
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  const items = [
    { icon: "🛡️", title: "100% Secure", desc: "RBI compliant, bank-grade SSL encryption" },
    { icon: "⚡", title: "Instant Approval", desc: "Get loans approved in just 5 minutes" },
    { icon: "💎", title: "Best Rates", desc: "Compare 50+ partners for lowest rates" },
    { icon: "🤝", title: "Expert Support", desc: "24/7 human + AI customer support" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-primary uppercase tracking-wider">Why Choose Us</p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold mt-2">
            India's Most <span className="text-gradient-primary">Trusted Platform</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="text-center p-6 rounded-3xl bg-gradient-to-br from-muted/40 to-white border border-border hover:shadow-card hover:-translate-y-1 transition-all"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-5xl mb-3">{item.icon}</div>
              <h3 className="font-display font-extrabold text-xl">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

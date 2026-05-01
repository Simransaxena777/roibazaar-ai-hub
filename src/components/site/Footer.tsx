import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import logo from "@/assets/roi-bazaar-logo.jpg";
import alarLogo from "@/assets/alar-solutions-logo.jpg";

const cols = [
  { title: "Products", links: ["Personal Loans", "Home Loans", "Credit Cards", "Mutual Funds", "Insurance", "Fixed Deposits"] },
  { title: "Company", links: ["About Us", "Careers", "Press", "Investor Relations", "Partners", "Leadership"] },
  { title: "Resources", links: ["Blog", "EMI Calculator", "Credit Score", "Help Center", "FAQs", "Glossary"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Use", "Disclaimer", "Refund Policy", "Grievance", "Compliance"] },
];

export function CTASection({ onAction }: { onAction: () => void }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 lg:p-16 text-white text-center shadow-glow">
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-brand-pink/30 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-3xl lg:text-5xl font-extrabold">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="mt-3 text-white/80 text-lg max-w-2xl mx-auto">
              Join 50 lakh+ Indians who trust ₹OI Bazaar for smarter financial decisions.
            </p>
            <button
              onClick={onAction}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-primary font-extrabold px-8 py-4 shadow-glow-pink hover:scale-105 transition-transform animate-pulse-glow"
            >
              Get Started Free →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-gradient-dark text-white pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-white p-1.5 shadow-glow">
                <img src={logo} alt="ROI Bazaar" className="h-full w-full rounded-lg object-cover" />
              </div>
              <div>
                <p className="font-display font-extrabold text-xl">₹OI Bazaar</p>
                <p className="text-xs opacity-70 flex items-center gap-1">
                  Powered by <img src={alarLogo} alt="Alar Solutions" className="h-3 w-auto inline rounded-sm" />
                  <span className="font-bold text-brand-cyan">Alar Solutions</span>
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/70 max-w-sm">
              India's leading financial marketplace. Compare and choose the best financial products in seconds.
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/80">
              <p className="flex items-center gap-2"><Mail size={14} /><span>support@roibazaar.in</span></p>
              <p className="flex items-center gap-2"><Phone size={14} /> +91 1800-123-4567</p>
              <p className="flex items-center gap-2"><MapPin size={14} /> Mumbai, Bangalore, Delhi</p>
            </div>
            <div className="mt-6 flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" className="h-9 w-9 rounded-full bg-white/10 hover:bg-gradient-primary flex items-center justify-center transition-all hover:scale-110">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {cols.map(col => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="font-display font-bold text-white mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-sm text-white/70 hover:text-brand-cyan transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="rounded-3xl bg-white/5 backdrop-blur border border-white/10 p-6 lg:p-8 mb-8">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="font-display font-extrabold text-2xl">Stay Updated</h4>
              <p className="text-sm text-white/70 mt-1">Get the latest financial tips & exclusive offers in your inbox.</p>
            </div>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="your@email.com" className="flex-1 rounded-full bg-white/10 border border-white/20 px-5 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:border-brand-cyan" />
              <button className="rounded-full bg-gradient-primary px-6 py-3 font-bold text-sm shadow-glow hover:scale-105 transition-transform">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-wrap justify-between items-center gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} ₹OI Bazaar by Alar Solutions. All rights reserved. RBI Reg #NBFC-12345</p>
          <p>Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
}

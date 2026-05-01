import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Menu, X, QrCode, ChevronDown, User } from "lucide-react";
import logo from "@/assets/roi-bazaar-logo.jpg";
import alarLogo from "@/assets/alar-solutions-logo.jpg";

const navItems = [
  { label: "Loans", href: "#loans" },
  { label: "Cards", href: "#cards" },
  { label: "Credit Score", href: "#credit-score" },
  { label: "Investments", href: "#investments" },
  { label: "Calculators", href: "#calculator" },
  { label: "Insurance", href: "#insurance" },
  { label: "Recharge", href: "#recharge" },
];

export function Header({ onSignIn, onGetStarted, onQR, onSearch }: {
  onSignIn: () => void;
  onGetStarted: () => void;
  onQR: () => void;
  onSearch: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass shadow-soft" : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="relative h-11 w-11 rounded-xl bg-white p-1 shadow-soft ring-1 ring-border">
              <img src={logo} alt="ROI Bazaar" className="h-full w-full rounded-lg object-contain" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-extrabold text-base text-foreground">
                ₹OI <span className="text-gradient-primary">Bazaar</span>
              </span>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                Powered by
                <img src={alarLogo} alt="Alar Solutions" className="h-3 w-auto inline-block rounded-sm" />
                <span className="font-semibold text-primary">Alar Solutions</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav — single line, no wrap */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-nowrap">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative whitespace-nowrap px-3 py-2 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors group"
              >
                {item.label}
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onSearch}
              aria-label="Search"
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl text-foreground/70 hover:text-primary hover:bg-muted transition-colors"
            >
              <Search size={18} />
            </button>
            <button
              onClick={onQR}
              aria-label="QR"
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl text-foreground/70 hover:text-primary hover:bg-muted transition-colors"
            >
              <QrCode size={18} />
            </button>
            <button
              onClick={onSignIn}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-primary hover:text-primary/80"
            >
              <User size={16} /> Sign In
            </button>
            <button
              onClick={onGetStarted}
              className="inline-flex items-center rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-bold text-white shadow-glow hover:shadow-glow-pink transition-all hover:scale-105 animate-pulse-glow"
            >
              Get Started
            </button>
            <button
              className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl hover:bg-muted"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 animate-fade-up">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-semibold hover:bg-muted hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
              <button onClick={onSignIn} className="mt-2 mx-4 py-3 rounded-xl border border-primary text-primary font-semibold">
                Sign In
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

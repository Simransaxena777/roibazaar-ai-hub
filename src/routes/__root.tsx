import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { LayoutDashboard } from "lucide-react";

import appCss from "../styles.css?url";
import { SiteProvider, useSite } from "@/lib/site-context";
import { Header } from "@/components/site/Header";
import { MarketTicker } from "@/components/site/MarketTicker";
import { CTASection, Footer } from "@/components/site/Footer";
import { AIChatWidget } from "@/components/site/AIChatWidget";
import { LoginModal } from "@/components/site/LoginModal";
import { ActionModal } from "@/components/site/ActionModal";
import { PaymentModal } from "@/components/site/PaymentModal";
import { Dashboard } from "@/components/site/Dashboard";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "₹OI Bazaar.com — Compare & Choose the Best Financial Products" },
      { name: "description", content: "₹OI Bazaar.com by Alar Solutions: Compare loans, credit cards, insurance, mutual funds, FDs and check your credit score — all in one place." },
      { name: "author", content: "Alar Solutions" },
      { property: "og:title", content: "₹OI Bazaar.com — India's Financial Marketplace" },
      { property: "og:description", content: "Compare loans, credit cards, insurance, mutual funds, FDs and credit score." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <SiteProvider>
      <SiteShell />
    </SiteProvider>
  );
}

function SiteShell() {
  const {
    user, setUser,
    loginOpen, setLoginOpen,
    modal, setModal,
    payment, setPayment,
    dashOpen, setDashOpen,
    saveTxn,
  } = useSite();

  return (
    <div className="min-h-screen bg-background">
      <MarketTicker />
      <Header
        onSignIn={() => setLoginOpen(true)}
        onGetStarted={() => setLoginOpen(true)}
        onQR={() => setModal({ title: "Scan QR Code", message: "Open your camera and scan the QR code to download the ₹OI Bazaar.com app." })}
        onSearch={() => setModal({ title: "Global Search", message: "Search any product, calculator, or feature across ₹OI Bazaar.com." })}
      />

      <Outlet />

      <CTASection onAction={() => setLoginOpen(true)} />
      <Footer />

      <AIChatWidget />
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={(name) => {
          setUser(name);
          setModal({ title: `Welcome, ${name}! 👋`, message: "You're now logged in. Explore your personalized dashboard, portfolio, and exclusive offers." });
        }}
      />
      <ActionModal open={!!modal} title={modal?.title || ""} message={modal?.message || ""} onClose={() => setModal(null)} />
      <PaymentModal
        open={!!payment}
        request={payment}
        onClose={() => setPayment(null)}
        onComplete={(t) => saveTxn(t)}
      />
      <Dashboard open={dashOpen} user={user} onClose={() => setDashOpen(false)} />

      {user && (
        <button
          onClick={() => setDashOpen(true)}
          className="fixed bottom-24 right-4 z-40 lg:bottom-6 lg:right-24 inline-flex items-center gap-2 rounded-full bg-white border border-border shadow-card hover:shadow-glow px-4 py-3 text-sm font-bold transition hover:-translate-y-0.5"
        >
          <span className="h-7 w-7 rounded-full bg-gradient-primary text-white flex items-center justify-center font-extrabold text-xs">
            {user.slice(0, 1).toUpperCase()}
          </span>
          <LayoutDashboard size={16} className="text-primary" /> Dashboard
        </button>
      )}
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Products } from "@/components/site/Products";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/loans")({
  head: () => ({
    meta: [
      { title: "Loans — Personal, Home, Car & Business | ₹OI Bazaar.com" },
      { name: "description", content: "Compare and apply for personal, home, car, education and business loans with instant approval." },
      { property: "og:title", content: "Loans — ₹OI Bazaar.com" },
      { property: "og:description", content: "Compare and apply for the best loans in India." },
    ],
  }),
  component: LoansPage,
});

function LoansPage() {
  const { handleAction } = useSite();
  return (
    <main className="py-6">
      <Products onAction={(product, cta) => handleAction(cta, product)} />
    </main>
  );
}

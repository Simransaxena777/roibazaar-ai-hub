import { createFileRoute } from "@tanstack/react-router";
import { CreditCards } from "@/components/site/CreditCards";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/cards")({
  head: () => ({
    meta: [
      { title: "Credit Cards — Rewards, Cashback & Travel | ₹OI Bazaar.com" },
      { name: "description", content: "Compare top credit cards across rewards, cashback, travel and lifestyle categories." },
      { property: "og:title", content: "Credit Cards — ₹OI Bazaar.com" },
      { property: "og:description", content: "Find the perfect credit card matched to your spending." },
    ],
  }),
  component: CardsPage,
});

function CardsPage() {
  const { handleAction } = useSite();
  return (
    <main className="py-6">
      <CreditCards onAction={(label, item) => handleAction(label, item)} />
    </main>
  );
}

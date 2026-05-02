import { createFileRoute } from "@tanstack/react-router";
import { CreditScore } from "@/components/site/CreditScore";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/credit-score")({
  head: () => ({
    meta: [
      { title: "Free Credit Score Check | ₹OI Bazaar.com" },
      { name: "description", content: "Check your credit score for free and get personalised tips to improve it." },
      { property: "og:title", content: "Free Credit Score — ₹OI Bazaar.com" },
      { property: "og:description", content: "Check your credit score for free, instantly." },
    ],
  }),
  component: CreditScorePage,
});

function CreditScorePage() {
  const { handleAction } = useSite();
  return (
    <main className="py-6">
      <CreditScore onAction={(label) => handleAction(label)} />
    </main>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { FAQ } from "@/components/site/FAQ";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Frequently Asked Questions | ₹OI Bazaar" },
      { name: "description", content: "Answers to common questions about loans, cards, credit scores and Riya AI." },
      { property: "og:title", content: "FAQ — ₹OI Bazaar" },
      { property: "og:description", content: "Frequently asked questions about ₹OI Bazaar services." },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  return (
    <main className="py-6">
      <FAQ />
    </main>
  );
}

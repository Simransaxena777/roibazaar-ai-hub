import { createFileRoute } from "@tanstack/react-router";
import { EmiCalculator } from "@/components/site/EmiCalculator";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "EMI Calculator | ₹OI Bazaar.com" },
      { name: "description", content: "Calculate EMIs for home, car and personal loans instantly." },
      { property: "og:title", content: "EMI Calculator — ₹OI Bazaar.com" },
      { property: "og:description", content: "Plan your loan with our easy EMI calculator." },
    ],
  }),
  component: CalculatorPage,
});

function CalculatorPage() {
  return (
    <main className="py-6">
      <EmiCalculator />
    </main>
  );
}

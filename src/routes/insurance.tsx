import { createFileRoute } from "@tanstack/react-router";
import { Insurance } from "@/components/site/Insurance";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/insurance")({
  head: () => ({
    meta: [
      { title: "Insurance — Health, Life, Vehicle & Travel | ₹OI Bazaar" },
      { name: "description", content: "Protect what matters with the right health, life, vehicle and travel insurance." },
      { property: "og:title", content: "Insurance — ₹OI Bazaar" },
      { property: "og:description", content: "Compare insurance plans tailored for you." },
    ],
  }),
  component: InsurancePage,
});

function InsurancePage() {
  const { handleAction } = useSite();
  return (
    <main className="py-6">
      <Insurance onAction={(label, item) => handleAction(label, item)} />
    </main>
  );
}

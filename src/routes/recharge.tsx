import { createFileRoute } from "@tanstack/react-router";
import { Recharge } from "@/components/site/Recharge";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/recharge")({
  head: () => ({
    meta: [
      { title: "Recharge & Bill Payments | ₹OI Bazaar.com" },
      { name: "description", content: "Mobile recharge, DTH, electricity, gas, water and broadband bills — all in one place." },
      { property: "og:title", content: "Recharge — ₹OI Bazaar.com" },
      { property: "og:description", content: "Recharge and pay bills with cashback rewards." },
    ],
  }),
  component: RechargePage,
});

function RechargePage() {
  const { handleAction } = useSite();
  return (
    <main className="py-6">
      <Recharge onAction={(label) => handleAction(label)} />
    </main>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Investments } from "@/components/site/Investments";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/investments")({
  head: () => ({
    meta: [
      { title: "Investments — Mutual Funds, SIP & FDs | ₹OI Bazaar.com" },
      { name: "description", content: "Start investing in mutual funds, SIPs, fixed deposits and bonds with expert guidance." },
      { property: "og:title", content: "Investments — ₹OI Bazaar.com" },
      { property: "og:description", content: "Grow your wealth with curated investment options." },
    ],
  }),
  component: InvestmentsPage,
});

function InvestmentsPage() {
  const { handleAction } = useSite();
  return (
    <main className="py-6">
      <Investments onAction={(label, item) => handleAction(label, item)} />
    </main>
  );
}

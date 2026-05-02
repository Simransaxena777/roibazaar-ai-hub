import { createFileRoute } from "@tanstack/react-router";
import { Blog } from "@/components/site/Blog";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & Insights | ₹OI Bazaar.com" },
      { name: "description", content: "Expert articles on credit score, mutual funds, loans and personal finance." },
      { property: "og:title", content: "Blog — ₹OI Bazaar.com" },
      { property: "og:description", content: "Personal finance insights and expert articles." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <main className="py-6">
      <Blog />
    </main>
  );
}

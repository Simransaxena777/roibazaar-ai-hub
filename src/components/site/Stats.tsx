import { useEffect, useRef, useState } from "react";
import { Users, Building2, Package, Award } from "lucide-react";

const stats = [
  { icon: Users, value: 5000000, suffix: "+", label: "Users Served", format: "indian" },
  { icon: Building2, value: 250000, suffix: "+", label: "Loans Approved", format: "indian" },
  { icon: Package, value: 1000000, suffix: "+", label: "Credit Cards Issued", format: "indian" },
  { icon: Award, value: 12, suffix: "+", label: "Years of Trust" },
];

function formatIndian(n: number) {
  return n.toLocaleString("en-IN");
}

function CountUp({ end, suffix = "", format }: { end: number; suffix?: string; format?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1800;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(Math.floor(end * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {format === "indian" ? formatIndian(val) : val}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-white to-muted/40 border border-border hover:border-primary/30 hover:shadow-card transition-all hover:-translate-y-1"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-white shadow-glow mb-4">
                <s.icon size={26} />
              </div>
              <p className="text-3xl lg:text-4xl font-display font-extrabold text-gradient-primary">
                <CountUp end={s.value} suffix={s.suffix} format={s.format} />
              </p>
              <p className="text-sm text-muted-foreground font-semibold mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

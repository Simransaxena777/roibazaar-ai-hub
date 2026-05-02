import { useEffect, useMemo, useState } from "react";
import { X, Wallet, TrendingUp, FileText, Download, CheckCircle2, Clock, CreditCard, Receipt, Activity } from "lucide-react";
import type { TxnRecord } from "./PaymentModal";

type HistoryItem = { label: string; item?: string; time: string };

export function Dashboard({ open, user, onClose }: {
  open: boolean; user: string | null; onClose: () => void;
}) {
  const [tab, setTab] = useState<"overview" | "transactions" | "activity">("overview");
  const [txns, setTxns] = useState<TxnRecord[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (!open) return;
    setTxns(JSON.parse(localStorage.getItem("roi_txns") || "[]"));
    setHistory(JSON.parse(localStorage.getItem("roi_history") || "[]"));
  }, [open]);

  const totals = useMemo(() => {
    const spent = txns.reduce((s, t) => s + (t.status === "Success" ? t.amount : 0), 0);
    return { spent, count: txns.length, actions: history.length };
  }, [txns, history]);

  if (!open) return null;

  const downloadOne = (t: TxnRecord) => {
    const html = receiptHtml(t);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `Receipt-${t.id}.html`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[65] flex items-stretch sm:items-center justify-center sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-up">
      <div className="relative w-full sm:max-w-5xl bg-white sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-screen sm:max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-primary text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center font-display font-extrabold text-lg">
              {(user || "U").slice(0, 1).toUpperCase()}
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider opacity-80">Welcome back</p>
              <p className="font-display font-extrabold text-lg">{user || "Guest User"}</p>
            </div>
          </div>
          <button onClick={onClose} className="h-9 w-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center">
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 pt-3 border-b sticky top-0 bg-white z-10 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "transactions", label: "Transactions", icon: Receipt },
            { id: "activity", label: "Activity", icon: Clock },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as typeof tab)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition ${tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === "overview" && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                <StatCard icon={Wallet} label="Total Spent" value={`₹${totals.spent.toLocaleString("en-IN")}`} gradient="from-blue-500 to-cyan-500" />
                <StatCard icon={Receipt} label="Transactions" value={String(totals.count)} gradient="from-purple-500 to-pink-500" />
                <StatCard icon={TrendingUp} label="Activities" value={String(totals.actions)} gradient="from-emerald-500 to-teal-500" />
              </div>

              <div>
                <h3 className="font-display font-extrabold text-lg mb-3">Recent Transactions</h3>
                {txns.length === 0 ? (
                  <EmptyState text="No transactions yet. Apply for a loan, invest or recharge to get started." />
                ) : (
                  <div className="space-y-2">
                    {txns.slice(0, 5).map(t => <TxnRow key={t.id} txn={t} onDownload={() => downloadOne(t)} />)}
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === "transactions" && (
            <div className="space-y-2">
              <h3 className="font-display font-extrabold text-lg mb-3">All Transactions</h3>
              {txns.length === 0
                ? <EmptyState text="No transactions yet." />
                : txns.map(t => <TxnRow key={t.id} txn={t} onDownload={() => downloadOne(t)} />)}
            </div>
          )}

          {tab === "activity" && (
            <div>
              <h3 className="font-display font-extrabold text-lg mb-3">Activity Track History</h3>
              {history.length === 0 ? (
                <EmptyState text="No activity yet." />
              ) : (
                <ol className="relative border-l-2 border-dashed border-primary/30 ml-3 space-y-4">
                  {history.map((h, i) => (
                    <li key={i} className="ml-5 relative">
                      <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-gradient-primary border-2 border-white shadow-glow" />
                      <div className="rounded-2xl border border-border p-4 bg-white hover:shadow-card transition">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <p className="font-bold text-sm">{h.label}{h.item ? ` — ${h.item}` : ""}</p>
                          <span className="text-[11px] text-muted-foreground">{new Date(h.time).toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, gradient }: { icon: React.ElementType; label: string; value: string; gradient: string }) {
  return (
    <div className={`rounded-2xl p-5 bg-gradient-to-br ${gradient} text-white shadow-card`}>
      <Icon size={22} className="opacity-90" />
      <p className="text-[11px] uppercase tracking-wider opacity-90 mt-3">{label}</p>
      <p className="font-display text-2xl font-extrabold mt-1">{value}</p>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="text-center py-10 rounded-2xl border-2 border-dashed border-border">
      <FileText className="mx-auto text-muted-foreground" size={32} />
      <p className="text-sm text-muted-foreground mt-2">{text}</p>
    </div>
  );
}

function TxnRow({ txn, onDownload }: { txn: TxnRecord; onDownload: () => void }) {
  const ml = txn.method === "card" ? `Card •••• ${txn.last4}`
    : txn.method === "upi" ? `UPI ${txn.upi}`
    : txn.method === "netbanking" ? `NetBank ${txn.bank}`
    : `Wallet ${txn.wallet}`;
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border p-3 hover:border-primary/40 hover:shadow-soft transition">
      <div className="h-11 w-11 rounded-xl bg-gradient-primary text-white flex items-center justify-center shrink-0">
        <CreditCard size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm truncate">{txn.title}{txn.item ? ` — ${txn.item}` : ""}</p>
        <p className="text-[11px] text-muted-foreground truncate">{ml} · {new Date(txn.date).toLocaleString("en-IN")}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="font-display font-extrabold">₹{txn.amount.toLocaleString("en-IN")}</p>
        <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 justify-end">
          <CheckCircle2 size={10} /> {txn.status}
        </p>
      </div>
      <button onClick={onDownload} aria-label="Download receipt" className="h-9 w-9 rounded-full hover:bg-muted flex items-center justify-center text-primary">
        <Download size={16} />
      </button>
    </div>
  );
}

function methodLabel(t: TxnRecord) {
  if (t.method === "card") return `Card •••• ${t.last4}`;
  if (t.method === "upi") return `UPI (${t.upi})`;
  if (t.method === "netbanking") return `Net Banking (${t.bank})`;
  return `Wallet (${t.wallet})`;
}

function receiptHtml(t: TxnRecord) {
  return `<!doctype html><html><head><meta charset="utf-8"><title>Receipt ${t.id}</title>
<style>body{font-family:system-ui,sans-serif;background:#f5f7fb;padding:40px;color:#0f172a}
.card{max-width:560px;margin:auto;background:#fff;border-radius:24px;box-shadow:0 20px 50px -20px rgba(79,70,229,.25);overflow:hidden}
.head{background:linear-gradient(135deg,#4F46E5,#06B6D4);color:#fff;padding:28px}.head h1{margin:0;font-size:22px}
.body{padding:28px}.row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px dashed #e2e8f0;font-size:14px}
.row span:first-child{color:#64748b}.row span:last-child{font-weight:700}
.total{display:flex;justify-content:space-between;margin-top:16px;padding-top:16px;border-top:2px solid #0f172a;font-size:20px;font-weight:800}
.badge{display:inline-block;background:#dcfce7;color:#16a34a;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:800}
</style></head><body><div class="card">
<div class="head"><span class="badge">PAID</span><h1>₹OI Bazaar.com — Payment Receipt</h1><p style="margin:4px 0 0;opacity:.9;font-size:12px">Powered by Alar Solutions</p></div>
<div class="body">
<div class="row"><span>Transaction ID</span><span>${t.id}</span></div>
<div class="row"><span>Date</span><span>${new Date(t.date).toLocaleString("en-IN")}</span></div>
<div class="row"><span>Service</span><span>${t.title}</span></div>
${t.item ? `<div class="row"><span>Item</span><span>${t.item}</span></div>` : ""}
<div class="row"><span>Method</span><span>${methodLabel(t)}</span></div>
<div class="row"><span>Status</span><span>${t.status}</span></div>
<div class="total"><span>Total Paid</span><span>₹${t.amount.toLocaleString("en-IN")}</span></div>
</div></div></body></html>`;
}

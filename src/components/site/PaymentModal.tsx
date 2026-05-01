import { useState } from "react";
import { X, CreditCard, Smartphone, Building2, Wallet, ShieldCheck, Check, Download, Lock, ArrowLeft } from "lucide-react";
import roiLogo from "@/assets/roi-bazaar-logo.jpg";

type Step = "method" | "details" | "otp" | "processing" | "receipt";
type Method = "card" | "upi" | "netbanking" | "wallet";

const cardBrands = [
  { id: "visa", name: "Visa", color: "from-blue-600 to-indigo-700" },
  { id: "mastercard", name: "Mastercard", color: "from-red-500 to-orange-500" },
  { id: "rupay", name: "RuPay", color: "from-emerald-600 to-teal-700" },
  { id: "amex", name: "Amex", color: "from-slate-700 to-slate-900" },
];

const banks = ["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak Mahindra", "Yes Bank"];
const wallets = ["Paytm", "PhonePe", "Amazon Pay", "Mobikwik"];
const upiApps = ["Google Pay", "PhonePe", "Paytm UPI", "BHIM"];

export type PaymentRequest = {
  title: string;
  amount: number;
  item?: string;
};

export function PaymentModal({
  open, request, onClose, onComplete,
}: {
  open: boolean;
  request: PaymentRequest | null;
  onClose: () => void;
  onComplete: (txn: TxnRecord) => void;
}) {
  const [step, setStep] = useState<Step>("method");
  const [method, setMethod] = useState<Method>("card");
  const [cardBrand, setCardBrand] = useState("visa");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [bank, setBank] = useState(banks[0]);
  const [wallet, setWallet] = useState(wallets[0]);
  const [otp, setOtp] = useState("");
  const [txn, setTxn] = useState<TxnRecord | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!open || !request) return null;

  const reset = () => {
    setStep("method"); setMethod("card"); setCardNumber(""); setCardName("");
    setExpiry(""); setCvv(""); setUpiId(""); setOtp(""); setTxn(null); setErrors({});
  };
  const close = () => { reset(); onClose(); };

  const validateExpiry = (v: string) => {
    if (!/^\d{2}\/\d{2}$/.test(v)) return "Use MM/YY format";
    const [mm, yy] = v.split("/").map(Number);
    if (mm < 1 || mm > 12) return "Invalid month";
    const now = new Date();
    const curYY = now.getFullYear() % 100;
    const curMM = now.getMonth() + 1;
    if (yy < curYY || (yy === curYY && mm < curMM)) return "Card has expired";
    return "";
  };

  const proceedToOtp = () => {
    const e: Record<string, string> = {};
    if (method === "card") {
      const num = cardNumber.replace(/\s/g, "");
      if (!num) e.cardNumber = "Card number is required";
      else if (num.length < 13 || num.length > 16) e.cardNumber = "Enter a valid 13–16 digit card number";
      if (!cardName.trim()) e.cardName = "Cardholder name is required";
      else if (cardName.trim().length < 3) e.cardName = "Name must be at least 3 characters";
      else if (!/^[A-Za-z\s]+$/.test(cardName.trim())) e.cardName = "Name can only contain letters";
      const expErr = validateExpiry(expiry);
      if (expErr) e.expiry = expErr;
      if (!cvv) e.cvv = "CVV is required";
      else if (cvv.length < 3) e.cvv = "CVV must be 3–4 digits";
    }
    if (method === "upi") {
      if (!upiId) e.upiId = "UPI ID is required";
      else if (!/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(upiId)) e.upiId = "Enter a valid UPI ID (e.g. name@okhdfcbank)";
    }
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setStep("otp");
  };

  const verifyAndPay = () => {
    if (otp.length !== 6) {
      setErrors({ otp: "Enter the full 6-digit OTP" });
      return;
    }
    setErrors({});
    setStep("processing");
    setTimeout(() => {
      const t: TxnRecord = {
        id: "TXN" + Date.now().toString().slice(-10),
        date: new Date().toISOString(),
        title: request.title,
        item: request.item,
        amount: request.amount,
        method,
        last4: method === "card" ? cardNumber.replace(/\s/g, "").slice(-4) : undefined,
        bank: method === "netbanking" ? bank : undefined,
        wallet: method === "wallet" ? wallet : undefined,
        upi: method === "upi" ? upiId : undefined,
        status: "Success",
      };
      setTxn(t);
      onComplete(t);
      setStep("receipt");
    }, 1400);
  };

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");

  const downloadReceipt = () => {
    if (!txn) return;
    const html = receiptHtml(txn);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `ROI-Bazaar-Receipt-${txn.id}.html`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-up">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-primary text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step !== "method" && step !== "receipt" && step !== "processing" && (
              <button onClick={() => setStep(step === "otp" ? "details" : "method")} className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center">
                <ArrowLeft size={16} />
              </button>
            )}
            <img src={roiLogo} alt="" className="h-8 w-8 rounded-lg" />
            <div>
              <p className="font-bold text-sm leading-tight">Secure Payment</p>
              <p className="text-[11px] opacity-90 flex items-center gap-1"><Lock size={10} /> 256-bit SSL encrypted</p>
            </div>
          </div>
          <button onClick={close} className="h-9 w-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center">
            <X size={18} />
          </button>
        </div>

        {/* Amount summary */}
        <div className="px-6 pt-5 pb-3 border-b">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{request.title}</p>
          <div className="flex items-end justify-between mt-1">
            <p className="text-sm text-foreground">{request.item || "Service Payment"}</p>
            <p className="font-display text-3xl font-extrabold text-gradient-primary">₹{request.amount.toLocaleString("en-IN")}</p>
          </div>
        </div>

        {/* Stepper */}
        {step !== "receipt" && (
          <div className="px-6 py-3 flex items-center gap-2 border-b bg-muted/30">
            {["Method", "Details", "Verify", "Done"].map((s, i) => {
              const idx = step === "method" ? 0 : step === "details" ? 1 : step === "otp" ? 2 : 3;
              const active = i <= idx;
              return (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-extrabold ${active ? "bg-gradient-primary text-white" : "bg-muted text-muted-foreground"}`}>
                    {i < idx ? <Check size={14} /> : i + 1}
                  </div>
                  <span className={`text-xs font-bold ${active ? "text-foreground" : "text-muted-foreground"} hidden sm:inline`}>{s}</span>
                  {i < 3 && <div className={`flex-1 h-0.5 ${i < idx ? "bg-gradient-primary" : "bg-muted"}`} />}
                </div>
              );
            })}
          </div>
        )}

        {/* Body */}
        <div className="p-6">
          {step === "method" && (
            <div className="space-y-3">
              <p className="font-bold mb-2">Choose payment method</p>
              {[
                { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay, Amex", icon: CreditCard },
                { id: "upi", label: "UPI", desc: "GPay, PhonePe, Paytm, BHIM", icon: Smartphone },
                { id: "netbanking", label: "Net Banking", desc: "All major Indian banks", icon: Building2 },
                { id: "wallet", label: "Wallets", desc: "Paytm, PhonePe, Amazon Pay", icon: Wallet },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id as Method)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${method === m.id ? "border-primary bg-primary/5 shadow-glow" : "border-border hover:border-primary/40"}`}
                >
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${method === m.id ? "bg-gradient-primary text-white" : "bg-muted text-foreground"}`}>
                    <m.icon size={22} />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-bold text-sm">{m.label}</p>
                    <p className="text-xs text-muted-foreground">{m.desc}</p>
                  </div>
                  <div className={`h-5 w-5 rounded-full border-2 ${method === m.id ? "border-primary bg-primary" : "border-muted"}`}>
                    {method === m.id && <Check size={14} className="text-white m-auto" />}
                  </div>
                </button>
              ))}
              <button onClick={() => setStep("details")} className="w-full mt-4 rounded-full bg-gradient-primary text-white font-bold py-3.5 shadow-glow hover:scale-[1.02] transition">
                Continue →
              </button>
            </div>
          )}

          {step === "details" && method === "card" && (
            <div className="space-y-4">
              {/* Card preview */}
              <div className={`relative h-48 rounded-2xl bg-gradient-to-br ${cardBrands.find(b => b.id === cardBrand)?.color} p-5 text-white shadow-card overflow-hidden`}>
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10" />
                <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/10" />
                <div className="relative flex justify-between items-start">
                  <div className="h-9 w-12 rounded bg-yellow-400/90" />
                  <span className="font-display font-extrabold uppercase text-sm">{cardBrands.find(b => b.id === cardBrand)?.name}</span>
                </div>
                <p className="relative mt-8 font-mono text-lg tracking-widest">{cardNumber || "•••• •••• •••• ••••"}</p>
                <div className="relative mt-4 flex justify-between text-[11px] opacity-90">
                  <div><p className="opacity-70">CARD HOLDER</p><p className="font-bold uppercase">{cardName || "YOUR NAME"}</p></div>
                  <div><p className="opacity-70">EXPIRES</p><p className="font-bold">{expiry || "MM/YY"}</p></div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {cardBrands.map(b => (
                  <button key={b.id} onClick={() => setCardBrand(b.id)} className={`py-2 rounded-xl text-xs font-bold border-2 ${cardBrand === b.id ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>
                    {b.name}
                  </button>
                ))}
              </div>

              <Field label="Card Number" error={errors.cardNumber}>
                <input value={cardNumber} onChange={(e) => { setCardNumber(formatCard(e.target.value)); if (errors.cardNumber) setErrors({ ...errors, cardNumber: "" }); }} placeholder="1234 5678 9012 3456" className="w-full bg-transparent outline-none font-mono" />
              </Field>
              <Field label="Cardholder Name" error={errors.cardName}>
                <input value={cardName} onChange={(e) => { setCardName(e.target.value.toUpperCase()); if (errors.cardName) setErrors({ ...errors, cardName: "" }); }} placeholder="NAME ON CARD" className="w-full bg-transparent outline-none uppercase" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Expiry (MM/YY)" error={errors.expiry}>
                  <input value={expiry} onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                    setExpiry(v.length > 2 ? v.slice(0, 2) + "/" + v.slice(2) : v);
                    if (errors.expiry) setErrors({ ...errors, expiry: "" });
                  }} placeholder="12/28" className="w-full bg-transparent outline-none" />
                </Field>
                <Field label="CVV" error={errors.cvv}>
                  <input type="password" maxLength={4} value={cvv} onChange={(e) => { setCvv(e.target.value.replace(/\D/g, "")); if (errors.cvv) setErrors({ ...errors, cvv: "" }); }} placeholder="•••" className="w-full bg-transparent outline-none" />
                </Field>
              </div>
              <PayBtn onClick={proceedToOtp} amount={request.amount} />
            </div>
          )}

          {step === "details" && method === "upi" && (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-2">
                {upiApps.map(a => (
                  <div key={a} className="rounded-2xl border-2 border-border p-3 text-center text-xs font-bold hover:border-primary/40 cursor-pointer">{a}</div>
                ))}
              </div>
              <Field label="Enter UPI ID" error={errors.upiId}>
                <input value={upiId} onChange={(e) => { setUpiId(e.target.value); if (errors.upiId) setErrors({ ...errors, upiId: "" }); }} placeholder="yourname@okhdfcbank" className="w-full bg-transparent outline-none" />
              </Field>
              <p className="text-xs text-muted-foreground">A collect request will be sent to your UPI app.</p>
              <PayBtn onClick={proceedToOtp} amount={request.amount} />
            </div>
          )}

          {step === "details" && method === "netbanking" && (
            <div className="space-y-4">
              <Field label="Select Bank">
                <select value={bank} onChange={(e) => setBank(e.target.value)} className="w-full bg-transparent outline-none">
                  {banks.map(b => <option key={b}>{b}</option>)}
                </select>
              </Field>
              <p className="text-xs text-muted-foreground">You'll be redirected to {bank}'s secure login.</p>
              <PayBtn onClick={proceedToOtp} amount={request.amount} />
            </div>
          )}

          {step === "details" && method === "wallet" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {wallets.map(w => (
                  <button key={w} onClick={() => setWallet(w)} className={`p-3 rounded-2xl border-2 font-bold text-sm ${wallet === w ? "border-primary bg-primary/5" : "border-border"}`}>{w}</button>
                ))}
              </div>
              <PayBtn onClick={proceedToOtp} amount={request.amount} />
            </div>
          )}

          {step === "otp" && (
            <div className="space-y-4 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center text-white shadow-glow">
                <ShieldCheck size={28} />
              </div>
              <p className="font-bold">Enter OTP to authorise</p>
              <p className="text-xs text-muted-foreground">A 6-digit code was sent to your registered mobile number.</p>
              <input
                value={otp}
                onChange={(e) => { setOtp(e.target.value.replace(/\D/g, "").slice(0, 6)); if (errors.otp) setErrors({ ...errors, otp: "" }); }}
                placeholder="••••••"
                className={`w-full text-center text-2xl tracking-[0.6em] font-bold py-3 rounded-2xl border-2 outline-none ${errors.otp ? "border-red-500" : "border-border focus:border-primary"}`}
              />
              {errors.otp && <p className="text-xs text-red-500 font-semibold">{errors.otp}</p>}
              <button onClick={verifyAndPay} className="w-full rounded-full bg-gradient-primary text-white font-bold py-3.5 shadow-glow hover:scale-[1.02] transition">
                Verify & Pay ₹{request.amount.toLocaleString("en-IN")}
              </button>
              <p className="text-[11px] text-muted-foreground">Use any 6-digit code for this demo.</p>
            </div>
          )}

          {step === "processing" && (
            <div className="py-10 text-center">
              <div className="mx-auto h-16 w-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
              <p className="mt-5 font-bold">Processing your payment…</p>
              <p className="text-xs text-muted-foreground">Please don't close this window.</p>
            </div>
          )}

          {step === "receipt" && txn && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white shadow-glow animate-fade-up">
                  <Check size={42} strokeWidth={3} />
                </div>
                <h3 className="font-display text-2xl font-extrabold mt-3">Payment Successful</h3>
                <p className="text-sm text-muted-foreground">Your transaction was completed</p>
              </div>

              <div className="rounded-2xl border-2 border-dashed border-border p-5 bg-muted/20">
                <div className="flex items-center justify-between pb-3 border-b border-dashed">
                  <div className="flex items-center gap-2">
                    <img src={roiLogo} alt="" className="h-8 w-8 rounded-lg" />
                    <div>
                      <p className="font-display font-extrabold text-sm">₹OI Bazaar</p>
                      <p className="text-[10px] text-muted-foreground">Powered by Alar Solutions</p>
                    </div>
                  </div>
                  <p className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">PAID</p>
                </div>
                <ReceiptRows txn={txn} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={downloadReceipt} className="rounded-full border-2 border-primary text-primary font-bold py-3 hover:bg-primary/5 flex items-center justify-center gap-2">
                  <Download size={16} /> Download
                </button>
                <button onClick={close} className="rounded-full bg-gradient-primary text-white font-bold py-3 shadow-glow">
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="mt-1 px-4 py-3 rounded-2xl border-2 border-border focus-within:border-primary transition">{children}</div>
    </label>
  );
}

function PayBtn({ onClick, amount }: { onClick: () => void; amount: number }) {
  return (
    <button onClick={onClick} className="w-full rounded-full bg-gradient-primary text-white font-bold py-3.5 shadow-glow hover:scale-[1.02] transition flex items-center justify-center gap-2">
      <Lock size={14} /> Pay ₹{amount.toLocaleString("en-IN")} Securely
    </button>
  );
}

function ReceiptRows({ txn }: { txn: TxnRecord }) {
  const rows: [string, string][] = [
    ["Transaction ID", txn.id],
    ["Date & Time", new Date(txn.date).toLocaleString("en-IN")],
    ["Service", txn.title],
    ...(txn.item ? [["Item", txn.item] as [string, string]] : []),
    ["Method", methodLabel(txn)],
    ["Status", txn.status],
  ];
  return (
    <div className="pt-3 space-y-2">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between text-sm">
          <span className="text-muted-foreground">{k}</span>
          <span className="font-bold text-right">{v}</span>
        </div>
      ))}
      <div className="flex justify-between pt-3 mt-2 border-t border-dashed">
        <span className="font-bold">Total Paid</span>
        <span className="font-display font-extrabold text-lg text-gradient-primary">₹{txn.amount.toLocaleString("en-IN")}</span>
      </div>
    </div>
  );
}

export type TxnRecord = {
  id: string;
  date: string;
  title: string;
  item?: string;
  amount: number;
  method: Method;
  last4?: string;
  bank?: string;
  wallet?: string;
  upi?: string;
  status: "Success" | "Failed" | "Pending";
};

function methodLabel(t: TxnRecord) {
  if (t.method === "card") return `Card •••• ${t.last4}`;
  if (t.method === "upi") return `UPI (${t.upi})`;
  if (t.method === "netbanking") return `Net Banking (${t.bank})`;
  return `Wallet (${t.wallet})`;
}

function receiptHtml(t: TxnRecord) {
  return `<!doctype html><html><head><meta charset="utf-8"><title>Receipt ${t.id}</title>
<style>
body{font-family:system-ui,-apple-system,Segoe UI,sans-serif;background:#f5f7fb;padding:40px;color:#0f172a}
.card{max-width:560px;margin:auto;background:#fff;border-radius:24px;box-shadow:0 20px 50px -20px rgba(79,70,229,.25);overflow:hidden}
.head{background:linear-gradient(135deg,#4F46E5,#06B6D4);color:#fff;padding:28px}
.head h1{margin:0;font-size:22px}
.head p{margin:4px 0 0;opacity:.9;font-size:12px}
.body{padding:28px}
.row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px dashed #e2e8f0;font-size:14px}
.row span:first-child{color:#64748b}
.row span:last-child{font-weight:700}
.total{display:flex;justify-content:space-between;margin-top:16px;padding-top:16px;border-top:2px solid #0f172a;font-size:20px;font-weight:800}
.total span:last-child{background:linear-gradient(135deg,#4F46E5,#06B6D4);-webkit-background-clip:text;background-clip:text;color:transparent}
.badge{display:inline-block;background:#dcfce7;color:#16a34a;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:800;letter-spacing:.05em}
.foot{padding:18px 28px;background:#f8fafc;font-size:11px;color:#64748b;text-align:center}
</style></head>
<body><div class="card">
<div class="head"><span class="badge">PAID</span><h1>₹OI Bazaar — Payment Receipt</h1><p>Powered by Alar Solutions</p></div>
<div class="body">
<div class="row"><span>Transaction ID</span><span>${t.id}</span></div>
<div class="row"><span>Date &amp; Time</span><span>${new Date(t.date).toLocaleString("en-IN")}</span></div>
<div class="row"><span>Service</span><span>${t.title}</span></div>
${t.item ? `<div class="row"><span>Item</span><span>${t.item}</span></div>` : ""}
<div class="row"><span>Method</span><span>${methodLabel(t)}</span></div>
<div class="row"><span>Status</span><span>${t.status}</span></div>
<div class="total"><span>Total Paid</span><span>₹${t.amount.toLocaleString("en-IN")}</span></div>
</div>
<div class="foot">This is a computer-generated receipt. For support: support@roibazaar.in</div>
</div></body></html>`;
}

import { useState } from "react";
import { X, Mail, Lock, Smartphone, CreditCard } from "lucide-react";

type Step = "method" | "otp" | "success";
type Method = "email" | "pan" | "google";

export function LoginModal({ open, onClose, onSuccess }: {
  open: boolean; onClose: () => void; onSuccess: (name: string) => void;
}) {
  const [step, setStep] = useState<Step>("method");
  const [method, setMethod] = useState<Method>("email");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");

  if (!open) return null;

  const sendOtp = () => {
    if (!identifier) return;
    setStep("otp");
  };

  const verifyOtp = () => {
    if (otp.length < 4) return;
    const displayName = name || (identifier.includes("@") ? identifier.split("@")[0] : "User");
    setStep("success");
    setTimeout(() => {
      onSuccess(displayName);
      reset();
      onClose();
    }, 1200);
  };

  const reset = () => {
    setStep("method"); setIdentifier(""); setOtp(""); setName("");
  };

  const close = () => { reset(); onClose(); };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-up">
      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden">
        <button onClick={close} className="absolute top-4 right-4 h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center z-10">
          <X size={18} />
        </button>

        <div className="bg-gradient-primary text-white p-6 text-center">
          <h3 className="font-display font-extrabold text-2xl">
            {step === "success" ? "Welcome! 🎉" : step === "otp" ? "Verify OTP" : "Sign In to ₹OI Bazaar"}
          </h3>
          <p className="text-sm opacity-80 mt-1">
            {step === "success" ? "You're successfully logged in" : step === "otp" ? "Enter the 6-digit code we sent you" : "Choose your preferred login method"}
          </p>
        </div>

        <div className="p-6">
          {step === "method" && (
            <>
              <input
                type="text"
                placeholder="Your full name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mb-3 rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary"
              />

              <div className="flex gap-2 mb-4">
                {[
                  { id: "email", label: "Email", icon: Mail },
                  { id: "pan", label: "PAN", icon: CreditCard },
                  { id: "google", label: "Google", icon: Smartphone },
                ].map(m => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id as Method)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition ${
                      method === m.id ? "bg-gradient-primary text-white" : "bg-muted text-foreground"
                    }`}
                  >
                    <m.icon size={14} /> {m.label}
                  </button>
                ))}
              </div>

              {method === "google" ? (
                <button
                  onClick={() => { setIdentifier("user@gmail.com"); setStep("otp"); }}
                  className="w-full rounded-xl border border-border py-3 font-bold text-sm flex items-center justify-center gap-3 hover:bg-muted transition"
                >
                  <span className="text-xl">G</span> Continue with Google
                </button>
              ) : (
                <>
                  <div className="relative mb-3">
                    {method === "email" ? <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /> : <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />}
                    <input
                      type="text"
                      placeholder={method === "email" ? "your@email.com" : "ABCDE1234F"}
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full rounded-xl border border-border pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <button
                    onClick={sendOtp}
                    disabled={!identifier}
                    className="w-full rounded-xl bg-gradient-primary text-white font-bold py-3 shadow-glow hover:scale-[1.02] transition disabled:opacity-50"
                  >
                    Send OTP
                  </button>
                </>
              )}

              <p className="text-[10px] text-center text-muted-foreground mt-4">
                By signing in, you agree to our Terms & Privacy Policy
              </p>
            </>
          )}

          {step === "otp" && (
            <>
              <div className="text-center mb-4">
                <Lock className="mx-auto text-primary mb-2" />
                <p className="text-sm text-muted-foreground">OTP sent to <span className="font-bold text-foreground">{identifier}</span></p>
              </div>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="• • • • • •"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full rounded-xl border border-border px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] focus:outline-none focus:border-primary"
              />
              <button
                onClick={verifyOtp}
                disabled={otp.length < 4}
                className="mt-4 w-full rounded-xl bg-gradient-primary text-white font-bold py-3 shadow-glow disabled:opacity-50"
              >
                Verify & Sign In
              </button>
              <button onClick={() => setStep("method")} className="mt-2 w-full text-sm text-muted-foreground hover:text-primary">
                ← Back
              </button>
            </>
          )}

          {step === "success" && (
            <div className="text-center py-6">
              <div className="mx-auto h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-4xl">✓</div>
              <p className="mt-4 font-display font-extrabold text-xl">Authentication Successful</p>
              <p className="text-sm text-muted-foreground mt-1">Redirecting to your dashboard...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

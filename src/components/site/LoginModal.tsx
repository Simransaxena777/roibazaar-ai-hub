import { useState } from "react";
import { X, Mail, Lock, Smartphone, CreditCard, User, Phone, Eye, EyeOff, ShieldCheck, CheckCircle2 } from "lucide-react";
import loginHero from "@/assets/login-hero.jpg";
import roiLogo from "@/assets/roi-bazaar-logo.jpg";

type Mode = "signin" | "signup";
type Step = "form" | "otp" | "success";
type Method = "email" | "phone" | "pan" | "google";

export function LoginModal({ open, onClose, onSuccess }: {
  open: boolean; onClose: () => void; onSuccess: (name: string) => void;
}) {
  const [mode, setMode] = useState<Mode>("signin");
  const [step, setStep] = useState<Step>("form");
  const [method, setMethod] = useState<Method>("email");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!open) return null;

  const reset = () => {
    setStep("form"); setIdentifier(""); setPassword(""); setOtp("");
    setName(""); setPhone(""); setAgree(false); setMethod("email"); setMode("signin"); setErrors({});
  };
  const close = () => { reset(); onClose(); };

  const validateIdentifier = (m: Method, v: string): string => {
    if (!v.trim()) return `${methodConfig[m].label} is required`;
    if (m === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Enter a valid email address";
    if (m === "phone") {
      const digits = v.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 13) return "Enter a valid 10-digit mobile number";
    }
    if (m === "pan" && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(v.toUpperCase())) return "Enter a valid PAN (e.g. ABCDE1234F)";
    return "";
  };

  const sendOtp = () => {
    const e: Record<string, string> = {};
    if (mode === "signup") {
      if (!name.trim()) e.name = "Full name is required";
      else if (name.trim().length < 3) e.name = "Name must be at least 3 characters";
      else if (!/^[A-Za-z\s]+$/.test(name.trim())) e.name = "Name can only contain letters";
      if (method !== "phone") {
        const digits = phone.replace(/\D/g, "");
        if (!phone) e.phone = "Mobile number is required";
        else if (digits.length < 10 || digits.length > 13) e.phone = "Enter a valid 10-digit mobile number";
      }
      if (!agree) e.agree = "You must accept the Terms & Privacy Policy";
    }
    if (method !== "google") {
      const idErr = validateIdentifier(method, identifier);
      if (idErr) e.identifier = idErr;
    }
    if (mode === "signin" && method === "email") {
      if (!password) e.password = "Password is required";
      else if (password.length < 6) e.password = "Password must be at least 6 characters";
    }
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setStep("otp");
  };

  const verifyOtp = () => {
    if (otp.length !== 6) {
      setErrors({ otp: "Enter the full 6-digit OTP" });
      return;
    }
    setErrors({});
    setStep("success");
    const displayName = name || (identifier.includes("@") ? identifier.split("@")[0] : "User");
    setTimeout(() => { onSuccess(displayName); reset(); onClose(); }, 1400);
  };

  const methodConfig: Record<Method, { icon: any; label: string; placeholder: string }> = {
    email: { icon: Mail, label: "Email", placeholder: "your@email.com" },
    phone: { icon: Phone, label: "Mobile", placeholder: "+91 98765 43210" },
    pan: { icon: CreditCard, label: "PAN", placeholder: "ABCDE1234F" },
    google: { icon: Smartphone, label: "Google", placeholder: "" },
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-fade-up">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl overflow-hidden grid md:grid-cols-2 max-h-[95vh]">
        <button onClick={close} className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow-soft flex items-center justify-center z-20">
          <X size={18} />
        </button>

        {/* LEFT — Hero panel */}
        <div className="relative hidden md:block bg-gradient-primary overflow-hidden">
          <img src={loginHero} alt="Secure login" className="absolute inset-0 h-full w-full object-cover opacity-40" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-brand-purple/70 to-brand-cyan/60" />
          <div className="relative h-full flex flex-col justify-between p-8 text-white">
            <div className="flex items-center gap-3">
              <img src={roiLogo} alt="₹OI Bazaar" className="h-11 w-11 rounded-xl bg-white/95 p-1 shadow-soft" />
              <div>
                <p className="font-display font-extrabold text-lg leading-none">₹OI Bazaar</p>
                <p className="text-[10px] opacity-80 mt-0.5">Powered by Alar Solutions</p>
              </div>
            </div>

            <div>
              <h2 className="font-display font-extrabold text-3xl leading-tight">
                Welcome to India's #1 Financial Marketplace
              </h2>
              <p className="text-sm opacity-90 mt-3">Unlock loans, credit cards, investments & insurance with one secure account.</p>

              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Bank-grade encryption & RBI compliance",
                  "Get matched with 100+ lenders instantly",
                  "Track applications, EMIs & portfolio",
                  "Exclusive cashback & welcome rewards",
                ].map(t => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-300 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 text-xs opacity-90">
              <ShieldCheck size={14} /> 256-bit SSL secured · ISO 27001 certified
            </div>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div className="overflow-y-auto p-6 sm:p-8 max-h-[95vh]">
          {step === "form" && (
            <>
              {/* Mode toggle */}
              <div className="flex gap-1 p-1 rounded-full bg-muted mb-6">
                {(["signin", "signup"] as Mode[]).map(m => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all ${
                      mode === m ? "bg-white shadow-soft text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {m === "signin" ? "Sign In" : "Sign Up"}
                  </button>
                ))}
              </div>

              <h3 className="font-display font-extrabold text-2xl text-foreground">
                {mode === "signin" ? "Welcome back 👋" : "Create your account"}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {mode === "signin" ? "Sign in to access your dashboard" : "Get started in under 60 seconds"}
              </p>

              {/* Google */}
              <button
                onClick={() => { setMethod("google"); setIdentifier("user@gmail.com"); setStep("otp"); }}
                className="mt-5 w-full rounded-xl border-2 border-border py-3 font-bold text-sm flex items-center justify-center gap-3 hover:border-primary hover:bg-muted/40 transition"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continue with Google
              </button>

              <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex-1 h-px bg-border" /> OR <div className="flex-1 h-px bg-border" />
              </div>

              {/* Method tabs */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {(["email", "phone", "pan"] as Method[]).map(m => {
                  const Icon = methodConfig[m].icon;
                  return (
                    <button
                      key={m}
                      onClick={() => setMethod(m)}
                      className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                        method === m ? "bg-gradient-primary text-white shadow-glow" : "bg-muted text-foreground hover:bg-muted/70"
                      }`}
                    >
                      <Icon size={13} /> {methodConfig[m].label}
                    </button>
                  );
                })}
              </div>

              {/* Sign-up extra fields */}
              {mode === "signup" && (
                <>
                  <Field icon={User} placeholder="Full name" value={name} onChange={(v) => { setName(v); if (errors.name) setErrors({ ...errors, name: "" }); }} error={errors.name} />
                  {method !== "phone" && <Field icon={Phone} placeholder="+91 mobile number" value={phone} onChange={(v) => { setPhone(v); if (errors.phone) setErrors({ ...errors, phone: "" }); }} error={errors.phone} />}
                </>
              )}

              {/* Identifier */}
              <Field
                icon={methodConfig[method].icon}
                placeholder={methodConfig[method].placeholder}
                value={identifier}
                onChange={(v) => { setIdentifier(v); if (errors.identifier) setErrors({ ...errors, identifier: "" }); }}
                error={errors.identifier}
              />

              {/* Password (sign-in email only) */}
              {mode === "signin" && method === "email" && (
                <div className="mb-3">
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type={showPwd ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors({ ...errors, password: "" }); }}
                      className={`w-full rounded-xl border pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-border focus:border-primary focus:ring-primary/20"}`}
                    />
                    <button onClick={() => setShowPwd(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
                      {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-red-500 font-semibold">⚠ {errors.password}</p>}
                </div>
              )}

              {/* T&C for signup */}
              {mode === "signup" && (
                <>
                  <label className="flex items-start gap-2 text-xs text-muted-foreground my-3 cursor-pointer">
                    <input type="checkbox" checked={agree} onChange={(e) => { setAgree(e.target.checked); if (errors.agree) setErrors({ ...errors, agree: "" }); }} className="mt-0.5 accent-primary" />
                    <span>I agree to the <span className="text-primary font-semibold">Terms</span> & <span className="text-primary font-semibold">Privacy Policy</span></span>
                  </label>
                  {errors.agree && <p className="-mt-2 mb-2 text-xs text-red-500 font-semibold">⚠ {errors.agree}</p>}
                </>
              )}

              {mode === "signin" && (
                <div className="flex justify-end mb-3">
                  <button className="text-xs font-semibold text-primary hover:underline">Forgot password?</button>
                </div>
              )}

              <button
                onClick={sendOtp}
                className="w-full rounded-xl bg-gradient-primary text-white font-bold py-3.5 shadow-glow hover:scale-[1.02] transition"
              >
                {mode === "signin" ? "Sign In" : "Create Account"} →
              </button>

              <p className="text-center text-xs text-muted-foreground mt-5">
                {mode === "signin" ? "New to ₹OI Bazaar?" : "Already have an account?"}{" "}
                <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-primary font-bold hover:underline">
                  {mode === "signin" ? "Create account" : "Sign in"}
                </button>
              </p>
            </>
          )}

          {step === "otp" && (
            <div className="py-4">
              <div className="text-center mb-6">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-white shadow-glow mb-4">
                  <Lock size={28} />
                </div>
                <h3 className="font-display font-extrabold text-2xl">Verify OTP</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  6-digit code sent to <span className="font-bold text-foreground">{identifier}</span>
                </p>
              </div>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="• • • • • •"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full rounded-xl border-2 border-border px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] focus:outline-none focus:border-primary"
                autoFocus
              />
              <button
                onClick={verifyOtp}
                disabled={otp.length < 4}
                className="mt-4 w-full rounded-xl bg-gradient-primary text-white font-bold py-3.5 shadow-glow disabled:opacity-50"
              >
                Verify & Continue
              </button>
              <div className="flex justify-between mt-3 text-sm">
                <button onClick={() => setStep("form")} className="text-muted-foreground hover:text-primary">← Back</button>
                <button className="text-primary font-semibold hover:underline">Resend OTP</button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-12">
              <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-5xl shadow-glow animate-pulse-glow">✓</div>
              <p className="mt-6 font-display font-extrabold text-2xl">You're all set! 🎉</p>
              <p className="text-sm text-muted-foreground mt-2">Redirecting to your dashboard...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, placeholder, value, onChange }: {
  icon: any; placeholder: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="relative mb-3">
      <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

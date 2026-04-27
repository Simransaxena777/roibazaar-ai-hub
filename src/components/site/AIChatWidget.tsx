import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Mic, MicOff, Volume2, VolumeX, Globe } from "lucide-react";
import aiAvatar from "@/assets/ai-avatar.jpg";

type Lang = "en" | "hi" | "hinglish";
type Message = { role: "user" | "ai"; text: string; time: string };

const greetings: Record<Lang, string> = {
  en: "Hi! I'm Riya, your AI financial advisor. How can I help you today? 💼",
  hi: "नमस्ते! मैं रिया हूँ, आपकी AI वित्तीय सलाहकार। मैं आपकी कैसे मदद कर सकती हूँ? 💼",
  hinglish: "Hello! Main Riya hoon, aapki AI financial advisor. Aaj main aapki kaise help kar sakti hoon? 💼",
};

const responses: Record<Lang, Record<string, string>> = {
  en: {
    loan: "I can help you with personal, home, car, and business loans. Personal loans start at 10.5% p.a. with instant approval. Want to apply?",
    credit: "Your credit score is shown in the Credit Score section. We offer free reports from CIBIL, Experian, Equifax & CRIF Highmark!",
    invest: "We have top-rated mutual funds with up to 28% returns. You can start a SIP from just ₹500/month. Want me to suggest funds?",
    insurance: "We offer Health (₹250/mo), Life (₹500/mo), Vehicle, and Travel insurance. Tax savings included!",
    card: "Premium credit cards with up to 5% cashback and ₹10,000 welcome bonus. Lifetime free options available!",
    default: "I can help with loans, credit cards, investments, insurance, credit score & more. What would you like to know?",
  },
  hi: {
    loan: "मैं पर्सनल, होम, कार और बिजनेस लोन में आपकी मदद कर सकती हूँ। पर्सनल लोन 10.5% से शुरू, तुरंत मंज़ूरी।",
    credit: "आपका क्रेडिट स्कोर Credit Score सेक्शन में देखें। CIBIL, Experian, Equifax और Highmark से मुफ्त रिपोर्ट!",
    invest: "टॉप म्यूचुअल फंड्स में 28% तक रिटर्न। सिर्फ ₹500/महीने से SIP शुरू करें!",
    insurance: "हेल्थ (₹250/माह), लाइफ (₹500/माह), व्हीकल और ट्रैवल इंश्योरेंस उपलब्ध हैं।",
    card: "प्रीमियम क्रेडिट कार्ड्स 5% तक कैशबैक और ₹10,000 वेलकम बोनस के साथ!",
    default: "मैं लोन, क्रेडिट कार्ड, निवेश, इंश्योरेंस में मदद कर सकती हूँ। क्या जानना चाहेंगे?",
  },
  hinglish: {
    loan: "Main personal, home, car aur business loans mein help kar sakti hoon. Personal loan 10.5% se start, instant approval!",
    credit: "Aapka credit score Credit Score section mein dekho. CIBIL, Experian, Equifax aur Highmark se free report milti hai!",
    invest: "Top mutual funds mein 28% tak returns. Sirf ₹500/month se SIP start kar sakte ho!",
    insurance: "Health (₹250/mo), Life (₹500/mo), Vehicle aur Travel insurance available hai!",
    card: "Premium credit cards 5% cashback aur ₹10,000 welcome bonus ke saath!",
    default: "Main loans, credit cards, investments, insurance sab mein help kar sakti hoon. Kya jaanna chahte ho?",
  },
};

function getReply(text: string, lang: Lang): string {
  const t = text.toLowerCase();
  const r = responses[lang];
  if (/loan|लोन|karz/i.test(t)) return r.loan;
  if (/credit score|cibil|स्कोर/i.test(t)) return r.credit;
  if (/invest|sip|fund|निवेश/i.test(t)) return r.invest;
  if (/insurance|बीमा|policy/i.test(t)) return r.insurance;
  if (/card|कार्ड/i.test(t)) return r.card;
  return r.default;
}

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [listening, setListening] = useState(false);
  const [muted, setMuted] = useState(false);
  const recRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const time = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "ai", text: greetings[lang], time: time() }]);
    }
  }, [open, lang, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Stop voice when closed
  useEffect(() => {
    if (!open) {
      window.speechSynthesis?.cancel();
      try { recRef.current?.stop?.(); } catch {}
      setListening(false);
    }
  }, [open]);

  const speak = (text: string) => {
    if (muted || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "hi" ? "hi-IN" : lang === "hinglish" ? "hi-IN" : "en-IN";
    u.rate = 1; u.pitch = 1.05;
    synthRef.current = u;
    window.speechSynthesis.speak(u);
  };

  const send = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setMessages(m => [...m, { role: "user", text: msg, time: time() }]);
    setInput("");
    setTimeout(() => {
      const reply = getReply(msg, lang);
      setMessages(m => [...m, { role: "ai", text: reply, time: time() }]);
      speak(reply);
    }, 600);
  };

  const toggleMic = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { alert("Voice input not supported in this browser"); return; }
    if (listening) {
      recRef.current?.stop();
      setListening(false);
      return;
    }
    const rec = new SR();
    rec.lang = lang === "hi" ? "hi-IN" : lang === "hinglish" ? "hi-IN" : "en-IN";
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (e: any) => {
      const t = e.results[0][0].transcript;
      setListening(false);
      send(t);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recRef.current = rec;
    rec.start();
    setListening(true);
  };

  const quickActions = lang === "hi"
    ? ["लोन", "क्रेडिट स्कोर", "निवेश", "बीमा"]
    : lang === "hinglish"
    ? ["Loan apply", "Credit score", "SIP start", "Insurance"]
    : ["Apply Loan", "Credit Score", "Start SIP", "Insurance"];

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-40 group ${open ? "hidden" : "flex"} items-center gap-3 rounded-full bg-gradient-primary text-white pl-2 pr-5 py-2 shadow-glow animate-pulse-glow hover:scale-105 transition-transform`}
      >
        <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-white">
          <img src={aiAvatar} alt="Riya AI" className="h-full w-full object-cover" />
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 border-2 border-white" />
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-xs opacity-90">Need help?</p>
          <p className="font-bold text-sm">Chat with Riya</p>
        </div>
        <MessageCircle size={18} className="sm:hidden" />
      </button>

      {/* Window */}
      {open && (
        <div className="fixed inset-x-4 bottom-4 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[400px] z-50 rounded-3xl bg-white shadow-2xl border border-border overflow-hidden flex flex-col max-h-[85vh] sm:h-[600px] animate-fade-up">
          {/* Header */}
          <div className="bg-gradient-primary text-white p-4 flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-white shrink-0">
              <img src={aiAvatar} alt="Riya" className="h-full w-full object-cover" />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 border-2 border-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold">Riya — AI Advisor</p>
              <p className="text-xs opacity-80">Online • {lang === "hi" ? "हिंदी" : lang === "hinglish" ? "Hinglish" : "English"}</p>
            </div>
            <button onClick={() => setMuted(m => !m)} aria-label="mute" className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center">
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <button onClick={() => setOpen(false)} aria-label="close" className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center">
              <X size={16} />
            </button>
          </div>

          {/* Lang selector */}
          <div className="flex gap-1 px-3 py-2 border-b bg-muted/30">
            <Globe size={14} className="text-muted-foreground self-center mr-1" />
            {(["en", "hi", "hinglish"] as Lang[]).map(l => (
              <button
                key={l}
                onClick={() => { setLang(l); setMessages([{ role: "ai", text: greetings[l], time: time() }]); }}
                className={`text-xs font-bold px-3 py-1 rounded-full transition ${lang === l ? "bg-gradient-primary text-white" : "bg-white text-foreground border border-border"}`}
              >
                {l === "en" ? "English" : l === "hi" ? "हिंदी" : "Hinglish"}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.role === "user" ? "bg-gradient-primary text-white" : "bg-white border border-border text-foreground"
                }`}>
                  <p>{m.text}</p>
                  <p className={`text-[10px] mt-1 ${m.role === "user" ? "text-white/70" : "text-muted-foreground"}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="px-3 py-2 flex gap-2 overflow-x-auto border-t bg-white">
            {quickActions.map(q => (
              <button key={q} onClick={() => send(q)} className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full bg-muted hover:bg-primary hover:text-white transition">
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t bg-white flex items-center gap-2">
            <button onClick={toggleMic} aria-label="mic" className={`h-10 w-10 rounded-full flex items-center justify-center transition ${listening ? "bg-red-500 text-white animate-pulse" : "bg-muted text-foreground"}`}>
              {listening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={lang === "hi" ? "अपना सवाल लिखें..." : lang === "hinglish" ? "Apna sawaal likho..." : "Type your message..."}
              className="flex-1 rounded-full bg-muted px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button onClick={() => send()} className="h-10 w-10 rounded-full bg-gradient-primary text-white flex items-center justify-center shadow-glow">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

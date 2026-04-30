import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Mic, MicOff, Volume2, VolumeX, Globe } from "lucide-react";
import aiAvatar from "@/assets/ai-riya.jpg";

type Lang = "en" | "hi" | "hinglish" | "ta" | "te" | "bn" | "mr" | "gu" | "kn" | "ml" | "pa";
type Message = { role: "user" | "ai"; text: string; time: string };

const LANG_META: Record<Lang, { name: string; native: string; locale: string; flag: string }> = {
  en:       { name: "English",  native: "English",   locale: "en-IN", flag: "🇮🇳" },
  hi:       { name: "Hindi",    native: "हिंदी",      locale: "hi-IN", flag: "🇮🇳" },
  hinglish: { name: "Hinglish", native: "Hinglish",  locale: "hi-IN", flag: "🇮🇳" },
  ta:       { name: "Tamil",    native: "தமிழ்",      locale: "ta-IN", flag: "🇮🇳" },
  te:       { name: "Telugu",   native: "తెలుగు",     locale: "te-IN", flag: "🇮🇳" },
  bn:       { name: "Bengali",  native: "বাংলা",      locale: "bn-IN", flag: "🇮🇳" },
  mr:       { name: "Marathi",  native: "मराठी",      locale: "mr-IN", flag: "🇮🇳" },
  gu:       { name: "Gujarati", native: "ગુજરાતી",     locale: "gu-IN", flag: "🇮🇳" },
  kn:       { name: "Kannada",  native: "ಕನ್ನಡ",       locale: "kn-IN", flag: "🇮🇳" },
  ml:       { name: "Malayalam",native: "മലയാളം",   locale: "ml-IN", flag: "🇮🇳" },
  pa:       { name: "Punjabi",  native: "ਪੰਜਾਬੀ",     locale: "pa-IN", flag: "🇮🇳" },
};

const greetings: Record<Lang, string> = {
  en: "Hi! I'm Riya, your AI financial advisor. How can I help you today? 💼",
  hi: "नमस्ते! मैं रिया हूँ, आपकी AI वित्तीय सलाहकार। मैं आपकी कैसे मदद कर सकती हूँ? 💼",
  hinglish: "Hello! Main Riya hoon, aapki AI financial advisor. Aaj main aapki kaise help kar sakti hoon? 💼",
  ta: "வணக்கம்! நான் ரியா, உங்கள் AI நிதி ஆலோசகர். நான் எப்படி உதவ முடியும்? 💼",
  te: "నమస్కారం! నేను రియా, మీ AI ఆర్థిక సలహాదారు. ఈరోజు ఎలా సహాయపడగలను? 💼",
  bn: "নমস্কার! আমি রিয়া, আপনার AI আর্থিক উপদেষ্টা। আজ কীভাবে সাহায্য করতে পারি? 💼",
  mr: "नमस्कार! मी रिया, तुमची AI आर्थिक सल्लागार. मी तुम्हाला कशी मदत करू शकते? 💼",
  gu: "નમસ્તે! હું રિયા છું, તમારી AI નાણાકીય સલાહકાર. હું તમારી કેવી રીતે મદદ કરી શકું? 💼",
  kn: "ನಮಸ್ಕಾರ! ನಾನು ರಿಯಾ, ನಿಮ್ಮ AI ಹಣಕಾಸು ಸಲಹೆಗಾರ. ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು? 💼",
  ml: "നമസ്കാരം! ഞാൻ റിയ, നിങ്ങളുടെ AI സാമ്പത്തിക ഉപദേശക. എങ്ങനെ സഹായിക്കാം? 💼",
  pa: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਰੀਆ ਹਾਂ, ਤੁਹਾਡੀ AI ਵਿੱਤੀ ਸਲਾਹਕਾਰ। ਮੈਂ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੀ ਹਾਂ? 💼",
};

const responses: Record<Lang, Record<string, string>> = {
  en: {
    loan: "I can help with personal, home, car & business loans. Personal loans start at 10.5% p.a. with instant approval. Want to apply?",
    credit: "Free credit reports from CIBIL, Experian, Equifax & CRIF Highmark — see the Credit Score section!",
    invest: "Top mutual funds with up to 28% returns. Start a SIP from just ₹500/month. Want fund suggestions?",
    insurance: "Health (₹250/mo), Life (₹500/mo), Vehicle & Travel insurance — tax savings included!",
    card: "Premium credit cards with up to 5% cashback and ₹10,000 welcome bonus. Lifetime free options!",
    default: "I can help with loans, credit cards, investments, insurance, credit score & more. What do you want to know?",
  },
  hi: {
    loan: "मैं पर्सनल, होम, कार और बिजनेस लोन में मदद कर सकती हूँ। पर्सनल लोन 10.5% से शुरू, तुरंत मंज़ूरी।",
    credit: "CIBIL, Experian, Equifax और Highmark से मुफ्त रिपोर्ट — Credit Score सेक्शन देखें!",
    invest: "टॉप म्यूचुअल फंड्स में 28% तक रिटर्न। सिर्फ ₹500/महीने से SIP शुरू करें!",
    insurance: "हेल्थ (₹250/माह), लाइफ (₹500/माह), व्हीकल और ट्रैवल इंश्योरेंस उपलब्ध हैं।",
    card: "प्रीमियम क्रेडिट कार्ड्स 5% तक कैशबैक और ₹10,000 वेलकम बोनस के साथ!",
    default: "मैं लोन, क्रेडिट कार्ड, निवेश, इंश्योरेंस में मदद कर सकती हूँ। क्या जानना चाहेंगे?",
  },
  hinglish: {
    loan: "Main personal, home, car aur business loans mein help kar sakti hoon. Personal loan 10.5% se start, instant approval!",
    credit: "Aapka credit score Credit Score section mein dekho. CIBIL, Experian se free report milti hai!",
    invest: "Top mutual funds mein 28% tak returns. Sirf ₹500/month se SIP start kar sakte ho!",
    insurance: "Health (₹250/mo), Life (₹500/mo), Vehicle aur Travel insurance available hai!",
    card: "Premium credit cards 5% cashback aur ₹10,000 welcome bonus ke saath!",
    default: "Main loans, cards, investments, insurance sab mein help kar sakti hoon. Kya jaanna chahte ho?",
  },
  ta: {
    loan: "தனிநபர், வீடு, கார் & வணிக கடன்கள் — 10.5% முதல், உடனடி ஒப்புதல்!",
    credit: "CIBIL, Experian — இலவச கடன் அறிக்கை. Credit Score பகுதியைப் பார்க்கவும்.",
    invest: "சிறந்த மியூச்சுவல் ஃபண்ட்கள் — 28% வரை வருமானம். ₹500/மாதம் முதல் SIP!",
    insurance: "ஆரோக்கிய (₹250/மாதம்), வாழ்க்கை, வாகனம் & பயண காப்பீடு கிடைக்கும்.",
    card: "பிரீமியம் கார்டுகள் — 5% கேஷ்பேக் & ₹10,000 வரவேற்பு போனஸ்!",
    default: "கடன், கார்டு, முதலீடு, காப்பீடு — எதைப் பற்றி அறிய விரும்புகிறீர்கள்?",
  },
  te: {
    loan: "వ్యక్తిగత, గృహ, కారు & వ్యాపార రుణాలు — 10.5% నుండి, తక్షణ ఆమోదం!",
    credit: "CIBIL, Experian — ఉచిత క్రెడిట్ రిపోర్ట్. Credit Score విభాగంలో చూడండి.",
    invest: "టాప్ మ్యూచువల్ ఫండ్స్ — 28% వరకు రాబడి. ₹500/నెలతో SIP ప్రారంభించండి!",
    insurance: "ఆరోగ్య (₹250/నెల), జీవిత, వాహన & ప్రయాణ బీమా అందుబాటులో ఉన్నాయి.",
    card: "ప్రీమియం క్రెడిట్ కార్డులు — 5% క్యాష్‌బ్యాక్ & ₹10,000 వెల్‌కమ్ బోనస్!",
    default: "రుణాలు, కార్డులు, పెట్టుబడులు, బీమా — ఏది తెలుసుకోవాలనుకుంటున్నారు?",
  },
  bn: {
    loan: "ব্যক্তিগত, হোম, কার ও ব্যবসায়িক লোন — 10.5% থেকে, তাৎক্ষণিক অনুমোদন!",
    credit: "CIBIL, Experian — বিনামূল্যে ক্রেডিট রিপোর্ট। Credit Score সেকশন দেখুন।",
    invest: "সেরা মিউচুয়াল ফান্ড — 28% পর্যন্ত রিটার্ন। ₹500/মাস থেকে SIP!",
    insurance: "স্বাস্থ্য (₹250/মাস), জীবন, যানবাহন ও ভ্রমণ বীমা উপলব্ধ।",
    card: "প্রিমিয়াম ক্রেডিট কার্ড — 5% ক্যাশব্যাক ও ₹10,000 স্বাগত বোনাস!",
    default: "লোন, কার্ড, বিনিয়োগ, বীমা — কোনটি সম্পর্কে জানতে চান?",
  },
  mr: {
    loan: "वैयक्तिक, गृह, कार आणि व्यवसाय कर्ज — 10.5% पासून, त्वरित मंजुरी!",
    credit: "CIBIL, Experian — मोफत क्रेडिट रिपोर्ट. Credit Score विभाग पहा.",
    invest: "टॉप म्युच्युअल फंड्स — 28% पर्यंत परतावा. ₹500/महिन्यापासून SIP!",
    insurance: "आरोग्य (₹250/महिना), जीवन, वाहन आणि प्रवास विमा उपलब्ध.",
    card: "प्रीमियम क्रेडिट कार्ड — 5% कॅशबॅक आणि ₹10,000 स्वागत बोनस!",
    default: "कर्ज, कार्ड, गुंतवणूक, विमा — काय जाणून घ्यायचे आहे?",
  },
  gu: {
    loan: "પર્સનલ, હોમ, કાર અને બિઝનેસ લોન — 10.5% થી, તાત્કાલિક મંજૂરી!",
    credit: "CIBIL, Experian — મફત ક્રેડિટ રિપોર્ટ. Credit Score વિભાગ જુઓ.",
    invest: "ટોચના મ્યુચ્યુઅલ ફંડ — 28% સુધી રિટર્ન. ₹500/મહિનાથી SIP!",
    insurance: "આરોગ્ય (₹250/મહિનો), જીવન, વાહન અને પ્રવાસ વીમો ઉપલબ્ધ.",
    card: "પ્રીમિયમ ક્રેડિટ કાર્ડ — 5% કેશબેક અને ₹10,000 સ્વાગત બોનસ!",
    default: "લોન, કાર્ડ, રોકાણ, વીમો — શું જાણવા માંગો છો?",
  },
  kn: {
    loan: "ವೈಯಕ್ತಿಕ, ಮನೆ, ಕಾರು & ವ್ಯಾಪಾರ ಸಾಲಗಳು — 10.5% ರಿಂದ, ತಕ್ಷಣದ ಅನುಮೋದನೆ!",
    credit: "CIBIL, Experian — ಉಚಿತ ಕ್ರೆಡಿಟ್ ವರದಿ. Credit Score ವಿಭಾಗ ನೋಡಿ.",
    invest: "ಅತ್ಯುತ್ತಮ ಮ್ಯೂಚುವಲ್ ಫಂಡ್‌ಗಳು — 28% ವರೆಗೆ ರಿಟರ್ನ್. ₹500/ತಿಂಗಳಿಂದ SIP!",
    insurance: "ಆರೋಗ್ಯ (₹250/ತಿಂಗಳು), ಜೀವನ, ವಾಹನ & ಪ್ರಯಾಣ ವಿಮೆ ಲಭ್ಯ.",
    card: "ಪ್ರೀಮಿಯಂ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್‌ಗಳು — 5% ಕ್ಯಾಶ್‌ಬ್ಯಾಕ್ & ₹10,000 ಬೋನಸ್!",
    default: "ಸಾಲ, ಕಾರ್ಡ್, ಹೂಡಿಕೆ, ವಿಮೆ — ಏನು ತಿಳಿಯಬೇಕು?",
  },
  ml: {
    loan: "വ്യക്തിഗത, ഭവന, കാർ & ബിസിനസ് വായ്പകൾ — 10.5% മുതൽ, തൽക്ഷണ അംഗീകാരം!",
    credit: "CIBIL, Experian — സൗജന്യ ക്രെഡിറ്റ് റിപ്പോർട്ട്. Credit Score വിഭാഗം കാണുക.",
    invest: "മികച്ച മ്യൂച്വൽ ഫണ്ടുകൾ — 28% വരെ റിട്ടേൺ. ₹500/മാസം മുതൽ SIP!",
    insurance: "ആരോഗ്യം (₹250/മാസം), ജീവൻ, വാഹനം & യാത്രാ ഇൻഷുറൻസ് ലഭ്യം.",
    card: "പ്രീമിയം ക്രെഡിറ്റ് കാർഡുകൾ — 5% ക്യാഷ്ബാക്ക് & ₹10,000 ബോണസ്!",
    default: "വായ്പ, കാർഡ്, നിക്ഷേപം, ഇൻഷുറൻസ് — എന്താണ് അറിയേണ്ടത്?",
  },
  pa: {
    loan: "ਨਿੱਜੀ, ਘਰ, ਕਾਰ ਅਤੇ ਕਾਰੋਬਾਰੀ ਲੋਨ — 10.5% ਤੋਂ, ਤੁਰੰਤ ਮਨਜ਼ੂਰੀ!",
    credit: "CIBIL, Experian — ਮੁਫ਼ਤ ਕ੍ਰੈਡਿਟ ਰਿਪੋਰਟ। Credit Score ਭਾਗ ਵੇਖੋ।",
    invest: "ਟੌਪ ਮਿਊਚੁਅਲ ਫੰਡ — 28% ਤੱਕ ਰਿਟਰਨ। ₹500/ਮਹੀਨੇ ਤੋਂ SIP!",
    insurance: "ਸਿਹਤ (₹250/ਮਹੀਨਾ), ਜੀਵਨ, ਵਾਹਨ ਅਤੇ ਯਾਤਰਾ ਬੀਮਾ ਉਪਲਬਧ।",
    card: "ਪ੍ਰੀਮੀਅਮ ਕਾਰਡ — 5% ਕੈਸ਼ਬੈਕ ਅਤੇ ₹10,000 ਸੁਆਗਤ ਬੋਨਸ!",
    default: "ਲੋਨ, ਕਾਰਡ, ਨਿਵੇਸ਼, ਬੀਮਾ — ਕੀ ਜਾਣਨਾ ਚਾਹੁੰਦੇ ਹੋ?",
  },
};

const QUICK: Record<Lang, string[]> = {
  en: ["Apply Loan", "Credit Score", "Start SIP", "Insurance"],
  hi: ["लोन", "क्रेडिट स्कोर", "निवेश", "बीमा"],
  hinglish: ["Loan apply", "Credit score", "SIP start", "Insurance"],
  ta: ["கடன்", "கிரெடிட் ஸ்கோர்", "SIP", "காப்பீடு"],
  te: ["రుణం", "క్రెడిట్ స్కోర్", "SIP", "బీమా"],
  bn: ["লোন", "ক্রেডিট স্কোর", "SIP", "বীমা"],
  mr: ["कर्ज", "क्रेडिट स्कोर", "SIP", "विमा"],
  gu: ["લોન", "ક્રેડિટ સ્કોર", "SIP", "વીમો"],
  kn: ["ಸಾಲ", "ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್", "SIP", "ವಿಮೆ"],
  ml: ["വായ്പ", "ക്രെഡിറ്റ്", "SIP", "ഇൻഷുറൻസ്"],
  pa: ["ਲੋਨ", "ਕ੍ਰੈਡਿਟ", "SIP", "ਬੀਮਾ"],
};

const PLACEHOLDERS: Record<Lang, string> = {
  en: "Type your message...",
  hi: "अपना सवाल लिखें...",
  hinglish: "Apna sawaal likho...",
  ta: "உங்கள் செய்தியை தட்டச்சு செய்யவும்...",
  te: "మీ సందేశాన్ని టైప్ చేయండి...",
  bn: "আপনার বার্তা টাইপ করুন...",
  mr: "तुमचा संदेश लिहा...",
  gu: "તમારો સંદેશ લખો...",
  kn: "ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ...",
  ml: "നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക...",
  pa: "ਆਪਣਾ ਸੁਨੇਹਾ ਲਿਖੋ...",
};

function getReply(text: string, lang: Lang): string {
  const t = text.toLowerCase();
  const r = responses[lang];
  if (/loan|लोन|karz|கடன்|రుణ|লোন|कर्ज|લોન|ಸಾಲ|വായ്പ|ਲੋਨ/i.test(t)) return r.loan;
  if (/credit|cibil|स्कोर|ਕ੍ਰੈਡਿਟ|క్రెడిట్|ক্রেডিট|ક્રેડિટ|ಕ್ರೆಡಿಟ್|ക്രെഡിറ്റ്/i.test(t)) return r.credit;
  if (/invest|sip|fund|निवेश|பணிக்|పెట్టు|বিনি|गुंत|રોકાણ|ಹೂಡಿ|നിക്ഷ|ਨਿਵੇਸ਼/i.test(t)) return r.invest;
  if (/insurance|बीमा|policy|காப்பீடு|బీమా|বীমা|विमा|વીમો|ವಿಮೆ|ഇൻഷ|ਬੀਮਾ/i.test(t)) return r.insurance;
  if (/card|कार्ड|கார்டு|కార్డు|কার্ড|कार्ड|કાર્ડ|ಕಾರ್ಡ್|കാർഡ്|ਕਾਰਡ/i.test(t)) return r.card;
  return r.default;
}

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [listening, setListening] = useState(false);
  const [muted, setMuted] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const recRef = useRef<any>(null);
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

  // Stop voice when widget closes
  useEffect(() => {
    if (!open) {
      window.speechSynthesis?.cancel();
      try { recRef.current?.stop?.(); } catch {}
      setListening(false);
      setSpeaking(false);
    }
    return () => {
      window.speechSynthesis?.cancel();
      try { recRef.current?.stop?.(); } catch {}
    };
  }, [open]);

  const speak = (text: string) => {
    if (muted || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = LANG_META[lang].locale;
    u.rate = 1; u.pitch = 1.05;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
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
    if (listening) { recRef.current?.stop(); setListening(false); return; }
    const rec = new SR();
    rec.lang = LANG_META[lang].locale;
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (e: any) => { setListening(false); send(e.results[0][0].transcript); };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recRef.current = rec;
    rec.start();
    setListening(true);
  };

  const changeLang = (l: Lang) => {
    setLang(l);
    setShowLangMenu(false);
    window.speechSynthesis?.cancel();
    setMessages([{ role: "ai", text: greetings[l], time: time() }]);
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-40 ${open ? "hidden" : "flex"} items-center gap-3 rounded-full bg-gradient-primary text-white pl-2 pr-5 py-2 shadow-glow animate-pulse-glow hover:scale-105 transition-transform`}
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
        <div className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[420px] z-50 rounded-3xl bg-white shadow-2xl border border-border overflow-hidden flex flex-col max-h-[88vh] sm:h-[640px] animate-fade-up">
          {/* Header */}
          <div className="bg-gradient-primary text-white p-4 flex items-center gap-3 relative">
            <div className={`relative h-14 w-14 rounded-full overflow-hidden ring-2 ring-white shrink-0 ${speaking ? "animate-pulse-glow" : ""}`}>
              <img src={aiAvatar} alt="Riya" className="h-full w-full object-cover" />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 border-2 border-white" />
              {speaking && <span className="absolute inset-0 rounded-full ring-4 ring-emerald-300/60 animate-ping" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold">Riya — AI Advisor</p>
              <p className="text-xs opacity-80 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                {speaking ? "Speaking..." : listening ? "Listening..." : `Online · ${LANG_META[lang].native}`}
              </p>
            </div>
            <button onClick={() => setMuted(m => { if (!m) window.speechSynthesis?.cancel(); return !m; })} aria-label="mute" className="h-9 w-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center">
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <button onClick={() => setOpen(false)} aria-label="close" className="h-9 w-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center">
              <X size={16} />
            </button>
          </div>

          {/* Language bar */}
          <div className="px-3 py-2 border-b bg-muted/30 relative">
            <button
              onClick={() => setShowLangMenu(s => !s)}
              className="w-full flex items-center justify-between gap-2 rounded-full bg-white border border-border px-3 py-2 text-xs font-bold hover:border-primary transition"
            >
              <span className="flex items-center gap-2">
                <Globe size={14} className="text-primary" />
                {LANG_META[lang].flag} {LANG_META[lang].native} <span className="text-muted-foreground font-normal">({LANG_META[lang].name})</span>
              </span>
              <span className="text-muted-foreground">{showLangMenu ? "▲" : "▼"}</span>
            </button>
            {showLangMenu && (
              <div className="absolute left-3 right-3 top-[52px] z-10 max-h-64 overflow-y-auto rounded-2xl bg-white shadow-2xl border border-border p-2 grid grid-cols-2 gap-1">
                {(Object.keys(LANG_META) as Lang[]).map(l => (
                  <button
                    key={l}
                    onClick={() => changeLang(l)}
                    className={`text-xs font-semibold px-3 py-2 rounded-xl text-left transition ${
                      lang === l ? "bg-gradient-primary text-white" : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{LANG_META[l].flag}</span>
                      <span className="font-bold truncate">{LANG_META[l].native}</span>
                    </div>
                    <p className={`text-[10px] mt-0.5 ${lang === l ? "opacity-80" : "text-muted-foreground"}`}>{LANG_META[l].name}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                {m.role === "ai" && (
                  <img src={aiAvatar} alt="" className="h-7 w-7 rounded-full object-cover shrink-0 self-end" />
                )}
                <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.role === "user" ? "bg-gradient-primary text-white rounded-br-sm" : "bg-white border border-border text-foreground rounded-bl-sm"
                }`}>
                  <p className="leading-relaxed">{m.text}</p>
                  <p className={`text-[10px] mt-1 ${m.role === "user" ? "text-white/70" : "text-muted-foreground"}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="px-3 py-2 flex gap-2 overflow-x-auto border-t bg-white">
            {QUICK[lang].map(q => (
              <button key={q} onClick={() => send(q)} className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full bg-muted hover:bg-primary hover:text-white transition">
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t bg-white flex items-center gap-2">
            <button onClick={toggleMic} aria-label="mic" className={`h-11 w-11 rounded-full flex items-center justify-center transition shrink-0 ${listening ? "bg-red-500 text-white animate-pulse" : "bg-muted text-foreground hover:bg-primary hover:text-white"}`}>
              {listening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={PLACEHOLDERS[lang]}
              className="flex-1 rounded-full bg-muted px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button onClick={() => send()} className="h-11 w-11 rounded-full bg-gradient-primary text-white flex items-center justify-center shadow-glow shrink-0 hover:scale-105 transition">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "What is ₹OI Bazaar.com and how does it work?",
    a: "₹OI Bazaar.com is India's leading financial marketplace powered by Alar Solutions. We help you compare and apply for loans, credit cards, insurance, mutual funds, and fixed deposits from 100+ partner banks and NBFCs — all in one place, with instant approvals and zero paperwork.",
  },
  {
    q: "Is ₹OI Bazaar.com free to use?",
    a: "Yes, comparing products, checking your credit score, and using our calculators is 100% free. We earn a commission from our partner banks when you successfully avail a product — there are no hidden charges to you.",
  },
  {
    q: "How fast can I get a personal loan approved?",
    a: "Most personal loan applications are approved within 5 minutes. Disbursal typically happens within 24 hours directly to your bank account, subject to document verification and partner bank policies.",
  },
  {
    q: "Is my data safe with ₹OI Bazaar.com?",
    a: "Absolutely. We use bank-grade 256-bit SSL encryption, are RBI compliant, and follow strict data privacy standards. Your information is never shared without your consent and is stored on secure servers in India.",
  },
  {
    q: "How is my credit score calculated?",
    a: "Your credit score (300–900) is calculated by credit bureaus like CIBIL, Experian, and Equifax based on your repayment history (35%), credit utilization (30%), credit age (15%), credit mix (10%), and new credit inquiries (10%).",
  },
  {
    q: "Can I get a loan with a low credit score?",
    a: "Yes, we work with multiple lenders that offer loans for credit scores starting from 600. However, lower scores may attract higher interest rates. Use our credit score booster tools to improve your score before applying.",
  },
  {
    q: "What languages does Riya, the AI assistant, support?",
    a: "Riya speaks 11 Indian languages including English, Hindi, Hinglish, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, and Punjabi — with both voice and text support.",
  },
  {
    q: "How do I track my applications and transactions?",
    a: "Once you sign in, click the Dashboard button at the bottom right. You'll find a complete history of your transactions, applications, downloadable receipts, and activity timeline in one place.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold">
            <HelpCircle size={16} /> Frequently Asked Questions
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold mt-4">
            Got <span className="text-gradient-primary">Questions?</span> We've got answers
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            Everything you need to know about ₹OI Bazaar.com and our services.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`rounded-2xl border bg-white transition-all ${
                  isOpen ? "border-primary shadow-card" : "border-border hover:border-primary/40"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-base lg:text-lg text-foreground">
                    {f.q}
                  </span>
                  <span
                    className={`shrink-0 h-9 w-9 rounded-full flex items-center justify-center transition-all ${
                      isOpen ? "bg-gradient-primary text-white rotate-180" : "bg-muted text-foreground"
                    }`}
                  >
                    <ChevronDown size={18} />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center rounded-2xl bg-gradient-to-br from-primary/5 to-brand-cyan/10 p-6 border border-primary/10">
          <p className="text-sm text-muted-foreground">Still have questions?</p>
          <p className="font-display font-bold text-lg mt-1">
            Talk to our experts at <span className="text-primary">+91 1800-123-4567</span> or chat with Riya, our AI assistant 💬
          </p>
        </div>
      </div>
    </section>
  );
}

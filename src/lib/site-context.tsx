import { createContext, useContext, useState, type ReactNode } from "react";
import type { PaymentRequest, TxnRecord } from "@/components/site/PaymentModal";

type ModalState = { title: string; message: string } | null;

type SiteContextValue = {
  user: string | null;
  setUser: (u: string | null) => void;
  loginOpen: boolean;
  setLoginOpen: (b: boolean) => void;
  modal: ModalState;
  setModal: (m: ModalState) => void;
  payment: PaymentRequest | null;
  setPayment: (p: PaymentRequest | null) => void;
  dashOpen: boolean;
  setDashOpen: (b: boolean) => void;
  handleAction: (label: string, item?: string) => void;
  saveTxn: (t: TxnRecord) => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

const PAID_ACTIONS = ["apply", "invest", "sip", "recharge", "bill", "get card", "buy", "pay"];

function inferAmount(label: string, item?: string): number {
  const l = label.toLowerCase();
  const i = (item || "").toLowerCase();
  if (l.includes("sip") || l.includes("invest")) return 5000;
  if (l.includes("loan") || l.includes("apply")) return 999;
  if (l.includes("insur")) return 1499;
  if (l.includes("card") || l.includes("get card")) return 499;
  if (l.includes("recharge") || l.includes("bill") || i.includes("recharge") || i.includes("bill")) return 299;
  if (l.includes("compare") || l.includes("talk")) return 0;
  return 199;
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [modal, setModal] = useState<ModalState>(null);
  const [payment, setPayment] = useState<PaymentRequest | null>(null);
  const [dashOpen, setDashOpen] = useState(false);

  const trackAction = (label: string, item?: string) => {
    if (typeof window === "undefined") return;
    const history = JSON.parse(localStorage.getItem("roi_history") || "[]");
    history.unshift({ label, item, time: new Date().toISOString() });
    localStorage.setItem("roi_history", JSON.stringify(history.slice(0, 50)));
  };

  const saveTxn = (t: TxnRecord) => {
    if (typeof window === "undefined") return;
    const list = JSON.parse(localStorage.getItem("roi_txns") || "[]");
    list.unshift(t);
    localStorage.setItem("roi_txns", JSON.stringify(list.slice(0, 100)));
  };

  const handleAction = (label: string, item?: string) => {
    trackAction(label, item);
    if (!user) {
      setLoginOpen(true);
      return;
    }
    const isPaid = PAID_ACTIONS.some(
      (k) => label.toLowerCase().includes(k) || (item || "").toLowerCase().includes(k),
    );
    const amount = inferAmount(label, item);
    if (isPaid && amount > 0) {
      setPayment({ title: label, item, amount });
    } else {
      setModal({
        title: `${label} Initiated! 🎉`,
        message: item
          ? `Your request for "${item}" has been received. Our team will contact you within 5 minutes.`
          : `Your "${label}" request has been received. We'll process it shortly.`,
      });
    }
  };

  return (
    <SiteContext.Provider
      value={{
        user, setUser,
        loginOpen, setLoginOpen,
        modal, setModal,
        payment, setPayment,
        dashOpen, setDashOpen,
        handleAction,
        saveTxn,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}

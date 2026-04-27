import { X } from "lucide-react";

export function ActionModal({ open, title, message, onClose }: {
  open: boolean; title: string; message: string; onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-up">
      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center">
          <X size={18} />
        </button>
        <div className="p-8 text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center text-white text-3xl shadow-glow">
            ✓
          </div>
          <h3 className="font-display font-extrabold text-xl mt-4">{title}</h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{message}</p>
          <button onClick={onClose} className="mt-6 rounded-full bg-gradient-primary text-white font-bold px-6 py-3 shadow-glow hover:scale-105 transition">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

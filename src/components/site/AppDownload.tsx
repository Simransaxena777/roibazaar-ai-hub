import { QrCode, Smartphone } from "lucide-react";
import phone from "@/assets/phone-mockup.png";

export function AppDownload() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-dark text-white relative overflow-hidden">
      <div className="absolute -top-20 left-1/4 h-96 w-96 rounded-full bg-brand-purple/30 blur-3xl" />
      <div className="absolute -bottom-20 right-1/4 h-96 w-96 rounded-full bg-brand-cyan/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-bold text-brand-cyan uppercase tracking-wider">Mobile App</p>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold mt-2">
              Get the ₹OI Bazaar.com <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-pink">App on Mobile</span>
            </h2>
            <p className="mt-4 text-white/70 text-lg max-w-xl">
              Manage your finances on the go. Apply for loans, check credit score, invest in mutual funds — all from your phone.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="flex items-center gap-3 rounded-2xl bg-white text-black px-6 py-3 hover:scale-105 transition-transform">
                <Smartphone size={28} />
                <div className="text-left">
                  <p className="text-[10px] opacity-70">GET IT ON</p>
                  <p className="font-bold">Google Play</p>
                </div>
              </button>
              <button className="flex items-center gap-3 rounded-2xl bg-white text-black px-6 py-3 hover:scale-105 transition-transform">
                <Smartphone size={28} />
                <div className="text-left">
                  <p className="text-[10px] opacity-70">DOWNLOAD ON</p>
                  <p className="font-bold">App Store</p>
                </div>
              </button>
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur border border-white/20 px-4 py-3">
                <div className="h-14 w-14 rounded-lg bg-white p-1.5 flex items-center justify-center">
                  <QrCode size={40} className="text-black" />
                </div>
                <div>
                  <p className="text-xs opacity-70">Scan to download</p>
                  <p className="font-bold">QR Code</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-96 lg:h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-primary opacity-30 blur-3xl rounded-full" />
            <img src={phone} alt="App Mockup" loading="lazy" className="relative h-full w-auto object-contain animate-float" />
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, lazy, Suspense } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ScrollToTop from "./components/ui/ScrollToTop";
import GlassCard from "./components/ui/GlassCard";
import SectionHeader from "./components/ui/SectionHeader";
import Badge from "./components/ui/Badge";
import { SectionSkeleton } from "./components/ui/Skeleton";

import { 
  Megaphone, 
  ArrowRight, 
  ShieldCheck, 
  Scale, 
  HelpCircle, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileText,
  MapPin,
  Phone,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Code splitting / Lazy loading sections for high Lighthouse performance
const Profile = lazy(() => import("./components/Profile"));
const VisionMission = lazy(() => import("./components/VisionMission"));
const MapSection = lazy(() => import("./components/MapSection"));
const BudgetSection = lazy(() => import("./components/BudgetSection"));
const PPIDPortal = lazy(() => import("./components/PPIDPortal"));
const ContactSection = lazy(() => import("./components/ContactSection"));

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("beranda");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Apakah layanan PPID online ini memungut biaya?",
      a: "Sama sekali tidak dipungut biaya (Gratis). Layanan PPID Desa Tonjong berkomitmen menyediakan dokumen publik secara terbuka dan cuma-cuma kepada seluruh warga negara demi transparansi tata kelola."
    },
    {
      q: "Berapa lama proses persetujuan berkas permohonan informasi?",
      a: "Berdasarkan undang-undang keterbukaan informasi, respon tanggapan akan kami kirimkan paling lambat 10 (sepuluh) hari kerja sejak formulir diterima secara lengkap oleh Sekretariat Desa Tonjong."
    },
    {
      q: "Bagaimana cara melakukan pelacakan status tiket permohonan?",
      a: "Anda dapat memilih tab 'Lacak Tiket' pada Portal PPID, kemudian memasukkan Nomor Tiket unik (contoh: PPID-2026-0892) yang didapatkan saat pengajuan formulir selesai."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col justify-between font-sans selection:bg-[#10B981] selection:text-white" id="main-app-container">
      
      {/* Apple Floating Glass Navbar */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeTab === "beranda" && (
          <div className="space-y-16 pb-20 animate-fadeIn" id="beranda-container">
            {/* Hero banner */}
            <Hero setActiveTab={setActiveTab} />

            {/* Official Announcements Bar */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="announcements-bar">
              <GlassCard className="p-5 sm:p-6 border-emerald-500/20 bg-gradient-to-r from-emerald-50/80 via-white/80 to-emerald-50/80">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-2xl bg-[#0F766E] p-3 text-white flex-shrink-0 shadow-md animate-pulse">
                      <Megaphone size={18} />
                    </div>
                    <div className="space-y-1">
                      <Badge variant="teal" icon={<SparklesIcon size={10} />}>
                        WARTA &amp; PENGUMUMAN RESMI
                      </Badge>
                      <h4 className="font-sans text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                        Penyaluran Bantuan Langsung Tunai (BLT) Dana Desa Tahap II Selesai Didistribusikan Tepat Sasaran
                      </h4>
                      <p className="text-xs text-slate-500 font-sans">
                        Diposting pada: 18 Juli 2026 • Oleh: Sekretariat Desa Tonjong
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setActiveTab("ppid")}
                    className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#0D645E] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md flex-shrink-0 cursor-pointer group"
                    id="read-announcement-btn"
                  >
                    <span>Lihat Laporan BLT</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </GlassCard>
            </div>

            {/* Quick Portal Core Features Grid */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10" id="quick-features-section">
              <SectionHeader
                eyebrow="AKSES CEPAT LAYANAN"
                title="Kemudahan Akses Informasi Bagi Warga"
                description="Pilih salah satu layanan informasi publik utama Pemerintah Desa Tonjong di bawah ini."
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Feature 1: Profil Desa */}
                <GlassCard 
                  onClick={() => setActiveTab("profil")}
                  className="p-6 cursor-pointer space-y-4 group"
                >
                  <div className="rounded-2xl bg-emerald-50 p-3.5 text-[#0F766E] w-fit group-hover:bg-[#0F766E] group-hover:text-white transition-colors duration-300 shadow-xs">
                    <ShieldCheck size={24} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-sans text-base sm:text-lg font-bold text-slate-900 flex items-center justify-between">
                      <span>Profil &amp; Kelembagaan</span>
                      <ChevronRight size={16} className="text-slate-400 group-hover:text-[#0F766E] group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-sans leading-relaxed">
                      Mengenal sejarah berdirinya, potensi kependudukan, demografi mata pencaharian, dan jajaran aparatur struktural Pemerintah Desa Tonjong.
                    </p>
                  </div>
                </GlassCard>

                {/* Feature 2: Transparansi APBDDes */}
                <GlassCard 
                  onClick={() => setActiveTab("anggaran")}
                  className="p-6 cursor-pointer space-y-4 group"
                >
                  <div className="rounded-2xl bg-emerald-50 p-3.5 text-[#0F766E] w-fit group-hover:bg-[#0F766E] group-hover:text-white transition-colors duration-300 shadow-xs">
                    <TrendingUp size={24} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-sans text-base sm:text-lg font-bold text-slate-900 flex items-center justify-between">
                      <span>APBDes Transparan</span>
                      <ChevronRight size={16} className="text-slate-400 group-hover:text-[#0F766E] group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-sans leading-relaxed">
                      Penayangan terbuka seluruh anggaran pendapatan (Dana Desa, Alokasi Dana Desa) dan pos belanja daerah desa demi pengawasan warga.
                    </p>
                  </div>
                </GlassCard>

                {/* Feature 3: PPID & Unduh Berkas */}
                <GlassCard 
                  onClick={() => setActiveTab("ppid")}
                  className="p-6 cursor-pointer space-y-4 group"
                >
                  <div className="rounded-2xl bg-emerald-50 p-3.5 text-[#0F766E] w-fit group-hover:bg-[#0F766E] group-hover:text-white transition-colors duration-300 shadow-xs">
                    <FileText size={24} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-sans text-base sm:text-lg font-bold text-slate-900 flex items-center justify-between">
                      <span>Layanan PPID Resmi</span>
                      <ChevronRight size={16} className="text-slate-400 group-hover:text-[#0F766E] group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-sans leading-relaxed">
                      Layanan keterbukaan informasi publik. Unduh berkas resmi berkala atau ajukan formulir permohonan informasi bergaransi payung hukum.
                    </p>
                  </div>
                </GlassCard>

              </div>
            </div>

            {/* Sinergi Keterbukaan Informasi Banner */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="kip-banner">
              <GlassCard dark hoverEffect={false} className="p-8 sm:p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  <div className="lg:col-span-8 space-y-5 text-left">
                    <Badge variant="dark" icon={<Scale size={14} />}>
                      AMBIL BAGIAN DALAM PEMBANGUNAN
                    </Badge>
                    <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-white">
                      Sinergi Bersama Kawal Pembangunan Desa Melalui Keterbukaan Data
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans max-w-2xl">
                      Keterbukaan informasi publik bukan hanya sekadar kepatuhan terhadap UU Nomor 14 Tahun 2008, namun juga pilar utama dalam membangun kepercayaan (trust) antara Pemerintah Desa dan segenap warga Desa Tonjong. Mari bersinergi untuk masa depan yang lebih akuntabel.
                    </p>
                  </div>

                  <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
                    <div className="bg-[#064e4b]/70 border border-emerald-500/30 rounded-2xl p-5 text-center flex-1 backdrop-blur-md">
                      <p className="text-3xl font-extrabold text-[#10B981] font-sans tracking-tight">Rp 2.02M</p>
                      <p className="text-[10px] text-emerald-200/90 uppercase font-bold tracking-widest font-mono mt-1">Transparansi Anggaran</p>
                    </div>
                    <div className="bg-[#064e4b]/70 border border-emerald-500/30 rounded-2xl p-5 text-center flex-1 backdrop-blur-md">
                      <p className="text-3xl font-extrabold text-[#10B981] font-sans tracking-tight">10 Hari</p>
                      <p className="text-[10px] text-emerald-200/90 uppercase font-bold tracking-widest font-mono mt-1">Respon Maksimal PPID</p>
                    </div>
                  </div>

                </div>
              </GlassCard>
            </div>

            {/* Quick Help Desk FAQ Snippet */}
            <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-8" id="faq-snippet">
              <SectionHeader
                eyebrow="TANYA JAWAB"
                title="Pertanyaan Umum (FAQ)"
                description="Jawaban atas pertanyaan yang paling sering diajukan mengenai pelayanan publik Desa Tonjong."
                icon={<HelpCircle size={14} />}
              />

              <div className="space-y-4 font-sans text-xs sm:text-sm">
                {faqs.map((faq, idx) => (
                  <GlassCard 
                    key={idx}
                    hoverEffect={false}
                    className="p-5 overflow-hidden transition-all duration-300 border-slate-200/80"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between text-left font-bold text-slate-900 cursor-pointer space-x-4"
                    >
                      <span className="flex items-center space-x-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#10B981] flex-shrink-0" />
                        <span className="text-sm sm:text-base">{faq.q}</span>
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                          activeFaq === idx ? "rotate-180 text-[#0F766E]" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeFaq === idx && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-slate-600 leading-relaxed pt-3 pl-5 border-t border-slate-100 mt-3 text-xs sm:text-sm">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlassCard>
                ))}
              </div>
            </div>

          </div>
        )}

        <Suspense fallback={<SectionSkeleton />}>
          {activeTab === "profil" && <Profile />}
          {activeTab === "visimisi" && <VisionMission />}
          {activeTab === "peta" && <MapSection />}
          {activeTab === "anggaran" && <BudgetSection />}
          {activeTab === "ppid" && <PPIDPortal />}
          {activeTab === "kontak" && <ContactSection />}
        </Suspense>
      </main>

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />

      {/* Consistent Apple Dark Footer */}
      <footer className="bg-[#042F2E] text-slate-300 border-t border-emerald-900/50 py-16 font-sans text-xs sm:text-sm relative z-20" id="main-footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo Brand Footer */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white p-1 shadow-sm">
                <img 
                  src="/assets/logo.png" 
                  alt="Logo Desa Tonjong" 
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1599305445671-ac291c95aba9?auto=format&fit=crop&q=80&w=128";
                  }}
                />
              </div>
              <div>
                <h4 className="font-extrabold text-white tracking-wider uppercase text-sm">PEMDES TONJONG</h4>
                <p className="text-[9px] text-emerald-400 font-mono font-bold uppercase tracking-widest mt-0.5">Kec. Pasaleman, Kab. Cirebon</p>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Portal informasi administrasi resmi dan keterbukaan publik (PPID) Desa Tonjong sebagai wujud transparansi anggaran dan pelayanan berkualitas.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest font-mono text-emerald-400">Navigasi Utama</h4>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              {[
                { id: "beranda", label: "Beranda" },
                { id: "profil", label: "Profil Desa" },
                { id: "visimisi", label: "Visi & Misi" },
                { id: "peta", label: "Peta Wilayah" },
                { id: "anggaran", label: "APBDDes" },
                { id: "ppid", label: "Portal PPID" },
                { id: "kontak", label: "Kontak" }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-left text-slate-400 hover:text-emerald-300 transition-colors py-1 font-semibold text-xs cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact snippets */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest font-mono text-emerald-400">Hubungi Sekretariat</h4>
            <div className="space-y-3 text-slate-400 text-xs">
              <p className="flex items-start space-x-2.5">
                <MapPin size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">Jl. Raya Tonjong No. 01, Dusun I, Desa Tonjong, Kab. Cirebon, Jawa Barat, 45187.</span>
              </p>
              <p className="flex items-center space-x-2.5">
                <Phone size={16} className="text-emerald-400 flex-shrink-0" />
                <span>+62 813-1260-1535</span>
              </p>
            </div>
          </div>

          {/* Government portals */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest font-mono text-emerald-400">Portal Eksternal</h4>
            <div className="space-y-2.5 text-xs">
              <a 
                href="https://cirebonkab.go.id" 
                target="_blank" 
                rel="noreferrer noopener"
                className="flex items-center space-x-2 text-slate-400 hover:text-emerald-300 transition-colors font-semibold"
              >
                <span>Website Pemkab Cirebon</span>
                <ExternalLink size={12} />
              </a>
              <a 
                href="https://jabarprov.go.id" 
                target="_blank" 
                rel="noreferrer noopener"
                className="flex items-center space-x-2 text-slate-400 hover:text-emerald-300 transition-colors font-semibold"
              >
                <span>Website Pemprov Jabar</span>
                <ExternalLink size={12} />
              </a>
              <a 
                href="https://kemendesa.go.id" 
                target="_blank" 
                rel="noreferrer noopener"
                className="flex items-center space-x-2 text-slate-400 hover:text-emerald-300 transition-colors font-semibold"
              >
                <span>Kementerian Desa RI</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

        </div>

        {/* Legal copy line */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-emerald-900/40 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-400 uppercase tracking-widest font-bold gap-4 font-mono">
          <div>© 2026 Pemerintah Desa Tonjong. All Rights Reserved.</div>
          <div className="flex space-x-6">
            <span>Informasi Publik</span>
            <span className="text-emerald-400">Transparansi Desa</span>
            <span>Kontak Darurat: 112</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

function SparklesIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
    </svg>
  );
}

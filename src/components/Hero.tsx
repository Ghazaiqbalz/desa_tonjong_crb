import { FileText, Map, ShieldCheck, ArrowRight, Sparkles, Users, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import AppleButton from "./ui/AppleButton";
import Badge from "./ui/Badge";

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export default function Hero({ setActiveTab }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#F8FAFC]">
      {/* Sugarcane Background Image — full bleed, proportional, premium */}
      <div className="absolute inset-0 z-0">
        {/* Base image: richly visible, crisp */}
        <img
          src="/assets/tebu.jpg"
          alt="Perkebunan Tebu Desa Tonjong"
          className="w-full h-full object-cover object-center select-none pointer-events-none"
          style={{ opacity: 0.45 }}
        />
        {/* Layer 1: Emerald-tinted brand color wash — blends image into brand palette */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(15,118,110,0.18) 0%, rgba(16,185,129,0.08) 50%, transparent 100%)" }} />
        {/* Layer 2: Bottom-up page color fade — seamless transition into page content */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/20 via-[#F8FAFC]/65 to-[#F8FAFC]" />
        {/* Layer 3: Left vignette — text readability enhancement on the left column */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC]/70 via-transparent to-transparent" />
      </div>

      {/* Radial glow orbs — depth and energy above the background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#10B981]/12 to-[#0F766E]/6 rounded-full blur-3xl pointer-events-none animate-pulseGlow z-[1]" />
      <div className="absolute -top-24 right-0 w-[350px] h-[350px] bg-emerald-200/18 rounded-full blur-3xl pointer-events-none z-[1]" />
      <div className="absolute bottom-8 left-0 w-[300px] h-[300px] bg-teal-200/15 rounded-full blur-3xl pointer-events-none z-[1]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">

          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">

            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex justify-center lg:justify-start"
            >
              <Badge variant="emerald" icon={<ShieldCheck size={14} className="text-[#0F766E]" />}>
                Portal Administrasi &amp; Transparansi PPID Resmi
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-sans text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]"
            >
              Mewujudkan Pelayanan{" "}
              <span className="bg-gradient-to-r from-[#0F766E] via-[#10B981] to-[#042F2E] bg-clip-text text-transparent">
                Transparan
              </span>{" "}
              &amp; Mandiri
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Selamat datang di portal administrasi digital <strong>Desa Tonjong</strong>, Kecamatan Pasaleman, Kabupaten Cirebon. Kami berkomitmen memberikan kemudahan informasi publik, transparansi keuangan APBDDes, dan keterbukaan dokumentasi secara akuntabel.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <AppleButton
                onClick={() => setActiveTab("ppid")}
                variant="primary"
                size="lg"
                icon={<FileText size={18} />}
                id="hero-ppid-btn"
                className="w-full sm:w-auto"
              >
                Permohonan Informasi (PPID)
              </AppleButton>

              <AppleButton
                onClick={() => setActiveTab("peta")}
                variant="outline"
                size="lg"
                icon={<Map size={18} />}
                iconPosition="left"
                id="hero-map-btn"
                className="w-full sm:w-auto"
              >
                Jelajahi Peta Wilayah
                <ArrowRight size={14} className="ml-1 opacity-70" />
              </AppleButton>
            </motion.div>

            {/* Micro Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 pt-4 text-xs font-medium text-slate-500 font-sans"
            >
              <div className="flex items-center space-x-2">
                <Sparkles size={14} className="text-[#10B981]" />
                <span>Respon PPID Maks. 10 Hari Kerja</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck size={14} className="text-[#0F766E]" />
                <span>Terbuka &amp; Bebas Biaya</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users size={14} className="text-[#0F766E]" />
                <span>8.432+ Warga Terlayani</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Interactive Glass Card */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/80 shadow-2xl p-6 overflow-hidden"
            >
              {/* Image Banner */}
              <div className="relative h-56 sm:h-72 lg:h-64 xl:h-72 w-full overflow-hidden rounded-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800"
                  alt="Pesona Alam Sawah Desa Tonjong"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-left space-y-1">
                  <span className="text-[10px] font-bold text-emerald-300 tracking-widest font-mono uppercase">
                    PANORAMA WILAYAH
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                    Keasrian Alam &amp; Sawah Agrowisata Desa Tonjong
                  </h3>
                </div>
              </div>

              {/* Statistics Grid Cards */}
              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 pt-5 text-center">
                <div className="rounded-xl bg-slate-50/80 p-3 border border-slate-200/60 backdrop-blur-md">
                  <p className="text-xl sm:text-2xl font-extrabold text-[#0F766E] font-sans">8.4K+</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-0.5 font-mono">Penduduk</p>
                </div>
                <div className="rounded-xl bg-slate-50/80 p-3 border border-slate-200/60 backdrop-blur-md">
                  <p className="text-xl sm:text-2xl font-extrabold text-[#0F766E] font-sans">2.65K</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-0.5 font-mono">KK Terdaftar</p>
                </div>
                <div className="rounded-xl bg-slate-50/80 p-3 border border-slate-200/60 backdrop-blur-md">
                  <div className="flex items-center justify-center gap-1">
                    <TrendingUp size={14} className="text-[#10B981]" />
                    <p className="text-xl sm:text-2xl font-extrabold text-[#10B981] font-sans">100%</p>
                  </div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-0.5 font-mono">Transparan</p>
                </div>
              </div>

              {/* Budget teaser */}
              <button
                onClick={() => setActiveTab("anggaran")}
                className="mt-4 w-full flex items-center justify-between bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl px-4 py-3 hover:border-emerald-300 transition-all group cursor-pointer"
              >
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">APBDes Resmi</p>
                  <p className="text-sm font-extrabold text-slate-900 mt-0.5">Rp 2.024.680.399,-</p>
                </div>
                <div className="rounded-xl bg-[#0F766E] text-white p-2 group-hover:scale-105 transition-transform">
                  <ArrowRight size={14} />
                </div>
              </button>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

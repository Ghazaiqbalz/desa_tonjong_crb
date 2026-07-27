import { demographicStats, livelihoodStats, ageGroupStats, villageOfficials, kuwuHistory, agriculturalCommodities, socialInfrastructure } from "../data/demographics";
import { Users, Home, Map, User, ShieldCheck, GraduationCap, MapPin, ExternalLink, School, CheckCircle2, Award, Shield, FileText, Briefcase, Sprout, Building2, Crown, CalendarDays } from "lucide-react";
import balaiDesaImg from "../assets/images/tonjong.jpeg";
import GlassCard from "./ui/GlassCard";
import SectionHeader from "./ui/SectionHeader";
import Badge from "./ui/Badge";
import AppleButton from "./ui/AppleButton";
import { motion } from "motion/react";

// Animation helper
const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }
});

export default function Profile() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Users": return <Users className="h-6 w-6 text-[#0F766E]" />;
      case "Home":  return <Home  className="h-6 w-6 text-[#0F766E]" />;
      case "Map":   return <Map   className="h-6 w-6 text-[#0F766E]" />;
      default:      return <User  className="h-6 w-6 text-[#0F766E]" />;
    }
  };

  return (
    <div className="pt-[calc(var(--navbar-height)+3rem)] pb-16 bg-[#F8FAFC] space-y-20" id="profile-container">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">

        {/* ── SECTION HEADER ── */}
        <SectionHeader
          eyebrow="PROFIL RESMI DESA"
          title="Profil Umum Desa Tonjong"
          description="Mengenal lebih dekat sejarah, potensi demografis, kepemimpinan, dan infrastruktur Desa Tonjong, Kecamatan Pasaleman, Kabupaten Cirebon."
          icon={<ShieldCheck size={14} />}
        />

        {/* ── SEJARAH DESA ── */}
        <motion.div {...fadeInUp(0)}>
          <GlassCard className="p-6 sm:p-10 border-slate-200/80">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              <div className="lg:col-span-5 space-y-5 text-left">
                <Badge variant="teal" icon={<ShieldCheck size={12} />}>
                  SILSILAH &amp; WARISAN LUHUR
                </Badge>
                <h3 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Sejarah Singkat Desa
                </h3>
                <p className="text-slate-600 font-sans leading-relaxed text-sm">
                  Nama <strong>Desa Tonjong</strong> berakar dari sejarah lokal yang kuat, di mana kata <em>Tonjong</em> merujuk pada jenis tanaman air sejenis teratai besar yang dahulu banyak tumbuh subur di telaga purba kawasan ini.
                </p>
                <p className="text-slate-600 font-sans leading-relaxed text-sm">
                  Berdiri sejak era kolonial sebagai perlintasan perdagangan utama di wilayah timur Cirebon dan perbatasan Jawa Barat, Desa Tonjong berkembang menjadi pusat pemukiman agraris yang mandiri, rukun, dan berdaya saing tinggi hingga saat ini.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3 text-center">
                    <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Kecamatan</p>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5">Pasaleman</p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3 text-center">
                    <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Kabupaten</p>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5">Cirebon</p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3 text-center">
                    <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Kode Pos</p>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5 font-mono">45187</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 h-72 sm:h-96 w-full rounded-2xl overflow-hidden relative shadow-lg group">
                <img
                  src={balaiDesaImg}
                  alt="Kantor Balai Desa Tonjong"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-mono">
                      Kantor Balai Desa Tonjong, Kec. Pasaleman, Kab. Cirebon
                    </p>
                    <a
                      href="https://maps.google.com/maps/place//data=!4m2!3m1!1s0x2e6f097128bf0669:0x376b04b213b0547c?entry=s&sa=X&ved=2ahUKEwjNhpTqu-aVAxUhyDgGHbB6EocQ4kB6BAgEEAA&hl=id"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#0F766E] hover:bg-[#0D645E] text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors shadow-md"
                    >
                      <MapPin size={12} />
                      <span>Titik Lokasi Maps</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </GlassCard>
        </motion.div>

        {/* ── STATISTIK KEPENDUDUKAN ── */}
        <div className="space-y-8">
          <motion.div {...fadeInUp(0)} className="border-l-4 border-[#0F766E] pl-4 space-y-1">
            <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-slate-900">
              Statistik Kependudukan &amp; Demografis
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm font-sans">
              Data sensus kependudukan terperinci Desa Tonjong, Kecamatan Pasaleman, Kabupaten Cirebon.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demographicStats.map((stat, idx) => (
              <motion.div key={idx} {...fadeInUp(idx * 0.07)}>
                <GlassCard className="p-6 flex flex-col justify-between h-full">
                  <div className="flex items-start justify-between">
                    <div className="rounded-2xl bg-emerald-50 p-3.5 shadow-xs">
                      {getIcon(stat.icon)}
                    </div>
                    <span className="font-sans text-3xl font-extrabold text-slate-900">
                      {stat.value.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="mt-5 space-y-1.5">
                    <h4 className="font-sans text-sm font-bold text-slate-800">
                      {stat.category} <span className="font-mono text-xs text-[#0F766E]">({stat.unit})</span>
                    </h4>
                    <p className="text-xs text-slate-500 leading-normal">{stat.details}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Livelihoods & Age distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Livelihood Distribution */}
            <motion.div {...fadeInUp(0.1)}>
              <GlassCard className="p-6 sm:p-8 space-y-6 h-full">
                <h4 className="font-sans text-base sm:text-lg font-bold text-slate-900">
                  Distribusi Mata Pencaharian Penduduk
                </h4>
                <div className="space-y-4">
                  {livelihoodStats.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-700">{item.label}</span>
                        <span className="text-[#0F766E] font-bold font-mono">~{item.value}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: idx * 0.1, ease: "easeOut" }}
                          className={`h-full ${item.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Age Group Distribution */}
            <motion.div {...fadeInUp(0.15)}>
              <GlassCard className="p-6 sm:p-8 space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-6">
                  <h4 className="font-sans text-base sm:text-lg font-bold text-slate-900">
                    Struktur Kelompok Usia Penduduk
                  </h4>
                  <div className="space-y-5">
                    {ageGroupStats.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-4">
                        <div className="h-12 w-12 flex-shrink-0 rounded-2xl bg-emerald-50 text-[#0F766E] flex items-center justify-center font-bold text-sm font-mono border border-emerald-100">
                          {item.percentage}%
                        </div>
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <p className="text-xs font-bold text-slate-800">{item.label}</p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            ≈ {item.value.toLocaleString("id-ID")} Jiwa
                          </p>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.percentage}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.9, delay: idx * 0.1, ease: "easeOut" }}
                              className="h-full bg-[#10B981] rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80 text-[11px] text-slate-600 font-sans leading-relaxed mt-4">
                  <strong>Catatan Demografi:</strong> Lebih dari 68% warga berada pada usia produktif kerja, menjadikannya potensi tenaga kerja lokal yang kuat bagi sektor pertanian modern, industri rumah tangga, dan UMKM desa.
                </div>
              </GlassCard>
            </motion.div>

          </div>
        </div>

        {/* ── INFRASTRUKTUR SOSIAL ── */}
        <div className="space-y-8">
          <motion.div {...fadeInUp(0)} className="border-l-4 border-[#0F766E] pl-4 space-y-1">
            <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-slate-900">
              Infrastruktur Sosial &amp; Fasilitas Publik
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm font-sans">
              Sarana ibadah, pendidikan, dan layanan kemasyarakatan yang tersedia di Desa Tonjong.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {socialInfrastructure.map((item, idx) => (
              <motion.div key={idx} {...fadeInUp(idx * 0.06)}>
                <GlassCard className="p-4 text-center space-y-2 h-full">
                  <p className="text-2xl font-extrabold text-[#0F766E] font-sans">{item.count}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">{item.unit}</p>
                  <p className="text-xs font-bold text-slate-800 leading-snug">{item.category}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── KOMODITAS PERTANIAN UNGGULAN ── */}
        <div className="space-y-8">
          <motion.div {...fadeInUp(0)} className="border-l-4 border-[#0F766E] pl-4 space-y-1">
            <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-slate-900">
              Komoditas Pertanian &amp; Perkebunan Unggulan
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm font-sans">
              Potensi hasil bumi utama Desa Tonjong sebagai desa berbasis ekonomi agraris.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {agriculturalCommodities.map((item, idx) => (
              <motion.div key={idx} {...fadeInUp(idx * 0.07)}>
                <GlassCard className="p-5 flex items-start space-x-4 h-full">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-[#0F766E] flex-shrink-0 mt-0.5">
                    <Sprout size={18} />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <Badge variant="emerald">{item.type}</Badge>
                    <h4 className="font-sans text-sm font-bold text-slate-900">{item.name}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── SILSILAH KEPEMIMPINAN (KUWU) ── */}
        <div className="space-y-8">
          <motion.div {...fadeInUp(0)}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div className="border-l-4 border-[#0F766E] pl-4 space-y-1">
                <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-slate-900">
                  Silsilah Kepemimpinan (Kuwu) Desa
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm font-sans">
                  Riwayat para pemimpin Desa Tonjong sejak pertama berdiri hingga era modern.
                </p>
              </div>
              <Badge variant="teal" icon={<Crown size={12} />}>
                SEJARAH KEPEMIMPINAN
              </Badge>
            </div>
          </motion.div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0F766E] via-emerald-300 to-slate-200 hidden sm:block" />
            <div className="space-y-4 sm:pl-16">
              {kuwuHistory.map((kuwu, idx) => {
                const isCurrentLeader = idx === kuwuHistory.length - 1;
                return (
                  <motion.div key={idx} {...fadeInUp(idx * 0.06)}>
                    <div className={`relative flex items-center gap-4 sm:gap-0`}>
                      {/* Timeline dot */}
                      <div className={`hidden sm:flex absolute -left-10 h-5 w-5 rounded-full border-2 items-center justify-center flex-shrink-0 ${
                        isCurrentLeader
                          ? "bg-[#0F766E] border-[#0F766E] shadow-md shadow-emerald-500/30"
                          : "bg-white border-slate-300"
                      }`}>
                        {isCurrentLeader && <span className="h-2 w-2 rounded-full bg-white" />}
                      </div>
                      {/* Number badge on mobile */}
                      <div className={`sm:hidden flex h-8 w-8 rounded-xl items-center justify-center flex-shrink-0 text-xs font-bold font-mono ${
                        isCurrentLeader ? "bg-[#0F766E] text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                        {idx + 1}
                      </div>
                      <GlassCard className={`flex-1 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ${
                        isCurrentLeader ? "border-emerald-300 ring-2 ring-emerald-100" : ""
                      }`}>
                        <div className="flex items-center gap-3">
                          <span className="hidden sm:flex h-7 w-7 rounded-xl bg-slate-100 items-center justify-center text-[10px] font-bold font-mono text-slate-500 flex-shrink-0">
                            {idx + 1}
                          </span>
                          <div>
                            <h4 className={`font-sans font-bold text-sm sm:text-base ${isCurrentLeader ? "text-[#0F766E]" : "text-slate-900"}`}>
                              {kuwu.name}
                            </h4>
                            {isCurrentLeader && (
                              <Badge variant="emerald" icon={<CheckCircle2 size={10} />}>
                                Kuwu Aktif Saat Ini
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono font-bold flex-shrink-0">
                          <CalendarDays size={14} className="text-[#0F766E]" />
                          <span>{kuwu.period}</span>
                        </div>
                      </GlassCard>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── FASILITAS PENDIDIKAN ── */}
        <div className="space-y-8">
          <motion.div {...fadeInUp(0)} className="border-l-4 border-[#0F766E] pl-4 space-y-1">
            <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-slate-900">
              Fasilitas Pendidikan Utama Desa
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm font-sans">
              Instansi sekolah dasar negeri resmi di bawah binaan Dinas Pendidikan Kabupaten Cirebon.
            </p>
          </motion.div>

          <motion.div {...fadeInUp(0.1)}>
            <GlassCard className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6">
                <div className="space-y-2">
                  <Badge variant="emerald" icon={<GraduationCap size={12} />}>
                    SEKOLAH DASAR NEGERI
                  </Badge>
                  <h4 className="font-sans text-2xl sm:text-3xl font-extrabold text-slate-900">
                    SD Negeri 1 Tonjong
                  </h4>
                  <p className="text-slate-500 font-sans text-xs sm:text-sm">
                    Lembaga Pendidikan Dasar Resmi Pemerintah — Desa Tonjong, Kec. Pasaleman, Kab. Cirebon
                  </p>
                </div>
                <a
                  href="https://maps.google.com/maps/place//data=!4m2!3m1!1s0x2e6f09712420a035:0xcf53911edc9ba5ba?entry=s&sa=X&ved=2ahUKEwjz5qycvOaVAxV01jgGHXB_DDUQ4kB6BAgEEAA&hl=id"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AppleButton variant="primary" size="sm" icon={<MapPin size={14} />}>
                    Buka Google Maps
                    <ExternalLink size={12} className="ml-1 opacity-80" />
                  </AppleButton>
                </a>
              </div>

              {/* Metadata grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">NPSN Resmi</p>
                  <p className="text-base font-extrabold text-slate-800 font-mono mt-1">20214988</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Status Sekolah</p>
                  <p className="text-sm font-bold text-[#0F766E] mt-1 flex items-center gap-1.5">
                    <CheckCircle2 size={15} /> Negeri
                  </p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Jenjang</p>
                  <p className="text-sm font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                    <School size={15} className="text-[#0F766E]" /> SD (Kelas 1 – 6)
                  </p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Koordinat</p>
                  <p className="text-xs font-bold text-slate-700 font-mono mt-1">-6.9118, 108.7542</p>
                </div>
              </div>

              <div className="space-y-4 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                <div className="flex items-start space-x-3 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
                  <MapPin className="h-5 w-5 text-[#0F766E] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Alamat Lengkap Unit:</strong> Dusun I, RT 01/RW 01, Desa Tonjong, Kecamatan Pasaleman, Kabupaten Cirebon, Jawa Barat 45187.
                  </div>
                </div>
                <p>
                  SD Negeri 1 Tonjong merupakan instansi pendidikan dasar negeri utama di Desa Tonjong yang berdedikasi memberikan layanan pembelajaran berkualitas bagi anak-anak usia sekolah dasar. Berada di bawah naungan Dinas Pendidikan Kabupaten Cirebon, sekolah ini ditunjang oleh tenaga pendidik profesional, ruang kelas kondusif, sarana olahraga, perpustakaan, serta kegiatan ekstrakurikuler yang mendukung tumbuh kembang karakter dan intelektual generasi muda desa.
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* ── STRUKTUR PEMERINTAHAN ── */}
        <div className="space-y-8">
          <motion.div {...fadeInUp(0)}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div className="border-l-4 border-[#0F766E] pl-4 space-y-1">
                <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-slate-900">
                  Struktur Organisasi Pemerintah Desa
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm font-sans">
                  Bagan Tata Kelola Pemerintahan Desa Tonjong, Kec. Pasaleman, Kab. Cirebon
                </p>
              </div>
              <Badge variant="teal" icon={<ShieldCheck size={12} />}>
                TATA KELOLA RESMI 2026
              </Badge>
            </div>
          </motion.div>

          {/* Level 1: Kepala Desa & BPD */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F766E]" />
              Pimpinan &amp; Pengawasan Desa
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {villageOfficials.filter(o => o.category === "Kepala Desa" || o.category === "BPD").map((official, idx) => (
                <motion.div key={idx} {...fadeInUp(idx * 0.1)}>
                  <GlassCard className={`p-6 flex items-start space-x-5 h-full ${
                    official.category === "Kepala Desa" ? "border-emerald-400 ring-2 ring-emerald-100" : ""
                  }`}>
                    <div className={`p-4 rounded-2xl flex-shrink-0 shadow-md ${
                      official.category === "Kepala Desa" ? "bg-[#0F766E] text-white" : "bg-blue-600 text-white"
                    }`}>
                      {official.category === "Kepala Desa" ? <Award className="h-7 w-7" /> : <Shield className="h-7 w-7" />}
                    </div>
                    <div className="space-y-2 text-left">
                      <Badge variant={official.category === "Kepala Desa" ? "emerald" : "blue"}>
                        {official.category}
                      </Badge>
                      <h4 className="font-sans text-lg font-bold text-slate-900">{official.title}</h4>
                      {official.description && (
                        <p className="text-xs text-slate-600 font-sans leading-relaxed">{official.description}</p>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Level 2: Sekretaris Desa */}
          <div className="space-y-4 pt-2">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
              Sekretariat Desa
            </div>
            {villageOfficials.filter(o => o.category === "Sekretaris Desa").map((official, idx) => (
              <motion.div key={idx} {...fadeInUp(0.05)}>
                <GlassCard className="p-6 flex items-start space-x-5 border-teal-200/80 bg-gradient-to-r from-teal-50/40 via-white to-white">
                  <div className="p-4 rounded-2xl bg-teal-700 text-white flex-shrink-0 shadow-md">
                    <FileText className="h-7 w-7" />
                  </div>
                  <div className="space-y-2 text-left">
                    <Badge variant="teal">{official.category}</Badge>
                    <h4 className="font-sans text-lg font-bold text-slate-900">{official.title}</h4>
                    {official.description && (
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">{official.description}</p>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Level 3: Perangkat Desa */}
          <div className="space-y-4 pt-2">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
              Perangkat Desa (Para Kaur &amp; Kasi)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {villageOfficials.filter(o => o.category === "Perangkat Desa / Kaur & Kasi").map((official, idx) => (
                <motion.div key={idx} {...fadeInUp(idx * 0.08)}>
                  <GlassCard className="p-5 space-y-3 flex flex-col justify-between text-left h-full">
                    <div className="flex items-start space-x-3">
                      <div className="p-3 rounded-xl bg-slate-100 text-slate-700 shrink-0">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          Perangkat Desa
                        </span>
                        <h4 className="font-sans text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                          {official.title}
                        </h4>
                      </div>
                    </div>
                    {official.description && (
                      <div className="pt-3 border-t border-slate-100">
                        <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                          {official.description}
                        </p>
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

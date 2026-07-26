import { Mail, Phone, MapPin, Clock, ExternalLink } from "lucide-react";
import balaiDesaImg from "../assets/images/balai_desa_tonjong_1784730799388.jpg";
import GlassCard from "./ui/GlassCard";
import SectionHeader from "./ui/SectionHeader";
import Badge from "./ui/Badge";
import { motion } from "motion/react";

const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }
});

export default function ContactSection() {
  return (
    <div className="pt-[calc(var(--navbar-height)+3rem)] pb-16 bg-[#F8FAFC] space-y-12" id="contact-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header */}
        <SectionHeader
          eyebrow="INFORMASI KONTAK"
          title="Hubungi Pemerintah Desa"
          description="Kami siap melayani kebutuhan informasi dan administrasi kependudukan Anda. Kunjungi kantor kami atau hubungi melalui nomor di bawah ini."
          icon={<Mail size={14} />}
        />

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: Photo & address */}
          <motion.div {...fadeInUp(0.05)} className="lg:col-span-5 flex flex-col gap-6">

            {/* Balai Desa photo card */}
            <GlassCard className="overflow-hidden p-0 border-slate-200/80">
              <div className="relative h-56 sm:h-64 w-full group overflow-hidden">
                <img
                  src={balaiDesaImg}
                  alt="Gedung Kantor Balai Desa Tonjong"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest font-mono">
                    GEDUNG BALAI DESA
                  </p>
                  <p className="text-sm font-bold text-white leading-snug">
                    Kantor Kepala Desa Tonjong, Kec. Pasaleman
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Address card */}
            <GlassCard className="p-6 border-slate-200/80">
              <div className="flex items-start space-x-4">
                <div className="rounded-2xl bg-emerald-50 p-3 text-[#0F766E] flex-shrink-0 mt-0.5 shadow-xs">
                  <MapPin size={18} />
                </div>
                <div className="space-y-2">
                  <Badge variant="teal">ALAMAT RESMI</Badge>
                  <h4 className="font-bold text-slate-900 text-sm">Alamat Balai Desa</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Jl. Raya Tonjong No. 01, Dusun I, Desa Tonjong,<br />
                    Kecamatan Pasaleman, Kabupaten Cirebon,<br />
                    Jawa Barat 45187.
                  </p>
                  <a
                    href="https://maps.google.com/maps/place//data=!4m2!3m1!1s0x2e6f097128bf0669:0x376b04b213b0547c?entry=s&sa=X&ved=2ahUKEwjNhpTqu-aVAxUhyDgGHbB6EocQ4kB6BAgEEAA&hl=id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-[10px] font-bold text-[#0F766E] hover:text-emerald-800 uppercase tracking-wider bg-emerald-50 hover:bg-emerald-100/80 px-3 py-1.5 rounded-xl transition-colors border border-emerald-200"
                  >
                    <MapPin size={12} />
                    <span>Lihat di Google Maps</span>
                    <ExternalLink size={10} className="ml-1 opacity-70" />
                  </a>
                </div>
              </div>
            </GlassCard>

          </motion.div>

          {/* Right: Phone, hours, notes */}
          <motion.div {...fadeInUp(0.1)} className="lg:col-span-7 flex flex-col gap-6">

            {/* Phone */}
            <GlassCard className="p-6 border-slate-200/80">
              <div className="flex items-start space-x-4">
                <div className="rounded-2xl bg-emerald-50 p-3 text-[#0F766E] flex-shrink-0 shadow-xs">
                  <Phone size={18} />
                </div>
                <div className="space-y-1.5">
                  <Badge variant="teal">TELEPON / WHATSAPP</Badge>
                  <h4 className="font-bold text-slate-900 text-sm">Nomor Kontak Layanan</h4>
                  <p className="text-slate-800 font-mono font-extrabold text-lg tracking-wide">
                    +62 813-1260-1535
                  </p>
                  <p className="text-slate-500 text-xs">
                    Dapat dihubungi melalui telepon atau WhatsApp pada jam operasional.
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Jam operasional */}
            <GlassCard className="p-6 border-slate-200/80">
              <div className="flex items-start space-x-4">
                <div className="rounded-2xl bg-emerald-50 p-3 text-[#0F766E] flex-shrink-0 shadow-xs">
                  <Clock size={18} />
                </div>
                <div className="space-y-3 flex-1">
                  <div>
                    <Badge variant="teal">JAM OPERASIONAL</Badge>
                    <h4 className="font-bold text-slate-900 text-sm mt-1.5">Jam Pelayanan Kantor</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Senin – Kamis</p>
                      <p className="text-sm font-extrabold text-slate-800 mt-1">08.00 – 15.30</p>
                      <p className="text-[10px] text-slate-400 font-mono">WIB</p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Jumat</p>
                      <p className="text-sm font-extrabold text-slate-800 mt-1">08.00 – 14.30</p>
                      <p className="text-[10px] text-slate-400 font-mono">WIB</p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-3.5 border border-rose-100 text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Sabtu & Minggu</p>
                      <p className="text-sm font-extrabold text-rose-600 mt-1">Tutup</p>
                      <p className="text-[10px] text-slate-400 font-mono">Hari Libur</p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Catatan pengaduan */}
            <GlassCard className="p-5 border-amber-200/80 bg-amber-50/40">
              <div className="flex items-start space-x-3">
                <div className="rounded-xl bg-amber-100 p-2.5 text-amber-700 flex-shrink-0">
                  <Mail size={16} />
                </div>
                <div className="space-y-1 text-xs font-sans">
                  <p className="font-bold text-slate-800 text-sm">Catatan Pelayanan Pengaduan</p>
                  <p className="text-slate-600 leading-relaxed">
                    Untuk berkas legalitas hukum formal (pengaduan pungutan liar, asusila, atau korupsi), mohon sertakan salinan tanda bukti tertulis dan laporan resmi kepada petugas kantor desa secara langsung.
                  </p>
                </div>
              </div>
            </GlassCard>

          </motion.div>

        </div>
      </div>
    </div>
  );
}

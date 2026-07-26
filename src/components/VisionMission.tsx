import { Award, Compass, HeartHandshake, Eye, ClipboardCheck } from "lucide-react";
import GlassCard from "./ui/GlassCard";
import SectionHeader from "./ui/SectionHeader";
import Badge from "./ui/Badge";
import { motion } from "motion/react";

const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }
});

export default function VisionMission() {
  const missionPoints = [
    {
      number: "1",
      title: "Tata Kelola Pemerintahan Bersih & Transparan",
      desc: "Menyelenggarakan sistem birokrasi pemerintahan desa yang terbuka, jujur, cepat, dan bebas korupsi melalui pemanfaatan teknologi digital dan digitalisasi layanan publik.",
      icon: ClipboardCheck
    },
    {
      number: "2",
      title: "Penguatan Ekonomi Berbasis Potensi Lokal",
      desc: "Meningkatkan kesejahteraan petani, UMKM, dan perajin desa melalui akses modal BUMDes, pembinaan keterampilan, pengembangan agrowisata, dan pemasaran digital terintegrasi.",
      icon: Award
    },
    {
      number: "3",
      title: "Peningkatan Kualitas Sumber Daya Manusia",
      desc: "Menjamin ketersediaan akses pelayanan kesehatan (pencegahan stunting, Posyandu) yang merata, serta mendukung fasilitas pendidikan dasar dan madrasah bermutu bagi generasi muda.",
      icon: Compass
    },
    {
      number: "4",
      title: "Pembangunan Sarana & Infrastruktur Berkualitas",
      desc: "Membangun jalan usaha tani, sistem irigasi, serta sarana permukiman sehat yang kokoh dan berkelanjutan guna mempermudah logistik perdagangan dan konektivitas antar-dusun.",
      icon: HeartHandshake
    }
  ];

  return (
    <div className="pt-[calc(var(--navbar-height)+3rem)] pb-16 bg-[#F8FAFC] space-y-16" id="visimisi-container">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Section Header */}
        <SectionHeader
          eyebrow="PEDOMAN STRATEGIS"
          title="Visi & Misi Pemerintah Desa"
          description="Komitmen terarah Pemerintah Desa Tonjong dalam memajukan daerah dan melayani seluruh lapisan masyarakat demi terwujudnya desa yang mandiri dan berkarakter."
          icon={<Compass size={14} />}
        />

        {/* Vision Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <GlassCard
            dark
            hoverEffect={false}
            className="p-8 sm:p-14 max-w-5xl mx-auto relative overflow-hidden text-center"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
            <div className="relative z-10 space-y-6 flex flex-col items-center">

              <div className="rounded-full bg-emerald-900/80 p-5 border border-emerald-500/40 shadow-xl">
                <Eye className="h-10 w-10 text-[#10B981]" />
              </div>

              <Badge variant="dark">
                VISI UTAMA PEMERINTAH DESA (2022 – 2028)
              </Badge>

              <h3 className="font-serif italic text-xl sm:text-3xl lg:text-4xl font-normal leading-relaxed text-emerald-50 max-w-3xl">
                "Terwujudnya Desa Tonjong yang Mandiri, Sejahtera, Berkarakter Religius, dan Transparan dalam Tata Kelola Pembangunan."
              </h3>

            </div>
          </GlassCard>
        </motion.div>

        {/* Mission List */}
        <div className="space-y-10 max-w-5xl mx-auto text-center">
          <motion.div {...fadeInUp(0)} className="space-y-2">
            <Badge variant="emerald">MISI STRATEGIS</Badge>
            <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-slate-900">
              4 Pilar Langkah Nyata Kami
            </h3>
            <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">
              Empat program strategis yang menjadi landasan arah kebijakan Pemerintah Desa Tonjong untuk periode 2022–2028.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missionPoints.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  <GlassCard className="p-6 sm:p-8 flex items-start space-x-5 text-left h-full">
                    <div className="rounded-2xl bg-emerald-50 p-4 text-[#0F766E] flex-shrink-0 shadow-xs">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="space-y-2">
                      <span className="font-mono text-[10px] uppercase font-bold text-[#10B981] tracking-widest block">
                        MISI KE-{item.number}
                      </span>
                      <h4 className="font-sans text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

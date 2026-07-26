import { useState } from "react";
import { budgetSummary, revenueDetails, expenditureCategories } from "../data/budget";
import { TrendingUp, ArrowDownRight, Wallet, Activity, ChevronDown, ShieldCheck, Scale, PieChart } from "lucide-react";
import GlassCard from "./ui/GlassCard";
import SectionHeader from "./ui/SectionHeader";
import Badge from "./ui/Badge";
import { motion, AnimatePresence } from "motion/react";

const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }
});

export default function BudgetSection() {
  const [expandedSection, setExpandedSection] = useState<string | null>("gov");
  const [activeTab, setActiveTab] = useState<"pendapatan" | "belanja" | "ringkasan">("ringkasan");

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(num);
  };

  const toggleExpenditure = (id: string) => {
    if (expandedSection === id) {
      setExpandedSection(null);
    } else {
      setExpandedSection(id);
    }
  };

  return (
    <div className="pt-[calc(var(--navbar-height)+3rem)] pb-16 bg-[#F8FAFC] space-y-12" id="budget-section-container">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="TRANSPARANSI KEUANGAN"
          title="Transparansi APBDesa Tonjong"
          description="Laporan Anggaran Pendapatan dan Belanja Desa (APBDes) Tonjong Tahun Anggaran Berjalan. Komitmen transparansi penuh untuk warga."
          icon={<PieChart size={14} />}
        />

        {/* Visual Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="budget-totals-grid">
          
          {/* Revenue */}
          <motion.div {...fadeInUp(0.05)}>
            <GlassCard className="p-6 flex flex-col justify-between h-full border-emerald-200/80">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#0F766E] uppercase tracking-widest font-mono">Total Pendapatan</span>
                <div className="rounded-2xl bg-emerald-50 p-2.5 text-[#0F766E]">
                  <TrendingUp size={20} />
                </div>
              </div>
              <div className="mt-5 space-y-1.5">
                <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  {formatRupiah(budgetSummary.totalRevenue)}
                </h3>
                <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                  Sumber: Dana Desa, ADD, PADes &amp; Bantuan Provinsi.
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Expenditure */}
          <motion.div {...fadeInUp(0.1)}>
            <GlassCard className="p-6 flex flex-col justify-between h-full border-rose-200/80">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest font-mono">Total Belanja</span>
                <div className="rounded-2xl bg-rose-50 p-2.5 text-rose-600">
                  <ArrowDownRight size={20} />
                </div>
              </div>
              <div className="mt-5 space-y-1.5">
                <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  {formatRupiah(budgetSummary.totalExpenditure)}
                </h3>
                <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                  Penyelenggaraan pemda, pembangunan, &amp; pemberdayaan.
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Surplus/Deficit */}
          <motion.div {...fadeInUp(0.15)}>
            <GlassCard className="p-6 flex flex-col justify-between h-full border-amber-200/80">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest font-mono">Surplus Anggaran</span>
                <div className="rounded-2xl bg-amber-50 p-2.5 text-amber-700">
                  <Wallet size={20} />
                </div>
              </div>
              <div className="mt-5 space-y-1.5">
                <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  {formatRupiah(budgetSummary.surplusDeficit)}
                </h3>
                <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                  Selisih lebih pendapatan dibanding total belanja.
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Financing */}
          <motion.div {...fadeInUp(0.2)}>
            <GlassCard className="p-6 flex flex-col justify-between h-full border-indigo-200/80">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest font-mono">Pengeluaran Pembiayaan</span>
                <div className="rounded-2xl bg-indigo-50 p-2.5 text-indigo-700">
                  <Activity size={20} />
                </div>
              </div>
              <div className="mt-5 space-y-1.5">
                <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  {formatRupiah(budgetSummary.financingExpenditure)}
                </h3>
                <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                  Dialokasikan untuk pembiayaan Silpa &amp; penyertaan modal.
                </p>
              </div>
            </GlassCard>
          </motion.div>

        </div>

        {/* Section Navigation Tabs */}
        <motion.div 
          {...fadeInUp(0.25)}
          className="flex justify-center border-b border-slate-200/80"
        >
          <div className="flex space-x-2 sm:space-x-6">
            {(["ringkasan", "pendapatan", "belanja"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-3 sm:px-5 text-xs font-extrabold border-b-2 transition-all uppercase tracking-wider cursor-pointer ${
                  activeTab === tab
                    ? "border-[#0F766E] text-[#0F766E]"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab === "ringkasan" ? "Kalkulasi Ringkasan" : tab === "pendapatan" ? "Pendapatan Desa" : "Rincian Belanja Desa"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Contents */}
        <GlassCard className="p-6 sm:p-10 border-slate-200/80" id="budget-tab-content">
          
          {/* TAB 1: RINGKASAN REKAPITULASI */}
          {activeTab === "ringkasan" && (
            <div className="space-y-8">
              <div className="flex items-center space-x-3 text-slate-900">
                <Scale className="text-[#0F766E] h-6 w-6" />
                <h3 className="font-sans text-lg sm:text-xl font-bold">Ringkasan Rekapitulasi Realisasi</h3>
              </div>
              
              <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
                <table className="w-full text-left border-collapse font-sans text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 uppercase tracking-widest text-[10px] font-mono font-bold">
                      <th className="py-4 px-5">Uraian Keterangan Anggaran</th>
                      <th className="py-4 px-5 text-right">Jumlah Nominal (Rp)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-5 font-bold text-slate-800">Total Pendapatan Desa</td>
                      <td className="py-4 px-5 text-right font-black text-[#0F766E]">{formatRupiah(budgetSummary.totalRevenue)}</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-5 font-bold text-slate-800">Total Belanja Desa</td>
                      <td className="py-4 px-5 text-right font-black text-rose-700">{formatRupiah(budgetSummary.totalExpenditure)}</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 transition-colors bg-amber-50/30">
                      <td className="py-4 px-5 font-bold text-slate-800">Surplus / (Defisit) Anggaran</td>
                      <td className="py-4 px-5 text-right font-black text-amber-800">{formatRupiah(budgetSummary.surplusDeficit)}</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-5 font-bold text-slate-800">Pengeluaran Pembiayaan (Silpa/Penyertaan Modal)</td>
                      <td className="py-4 px-5 text-right font-black text-indigo-700">{formatRupiah(budgetSummary.financingExpenditure)}</td>
                    </tr>
                    <tr className="border-t-2 border-slate-200 bg-emerald-50/80 font-bold">
                      <td className="py-4 px-5 text-slate-900 text-xs sm:text-sm font-extrabold">SISA LEBIH PEMBIAYAAN ANGGARAN (SILPA BERSIH)</td>
                      <td className="py-4 px-5 text-right font-black text-[#0F766E] text-xs sm:text-sm">Rp 0,- (Balanced)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="rounded-2xl bg-emerald-50/60 p-5 border border-emerald-100 flex items-start space-x-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <ShieldCheck className="text-[#0F766E] h-6 w-6 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Keterangan Neraca:</strong> Keuangan Desa Tonjong dinyatakan sehat dan seimbang (Balanced Budget). Surplus anggaran sebesar <strong>{formatRupiah(budgetSummary.surplusDeficit)}</strong> sepenuhnya dialokasikan kembali pada <strong>Pengeluaran Pembiayaan</strong> untuk dana cadangan desa dan penyertaan modal BUMDes demi kemandirian ekonomi daerah.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: PENDAPATAN DESA */}
          {activeTab === "pendapatan" && (
            <div className="space-y-8">
              <div className="flex items-center space-x-3 text-slate-900">
                <TrendingUp className="text-[#0F766E] h-6 w-6" />
                <h3 className="font-sans text-lg sm:text-xl font-bold">Sumber Rincian Pendapatan Desa</h3>
              </div>

              <div className="space-y-6">
                {revenueDetails.map((rev, idx) => {
                  const ratio = (rev.amount / budgetSummary.totalRevenue) * 100;
                  return (
                    <div key={idx} className="space-y-2 border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <div>
                          <h4 className="font-sans text-sm sm:text-base font-bold text-slate-900">{rev.name}</h4>
                          <p className="text-xs text-slate-500 max-w-xl leading-relaxed">{rev.desc}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-sans text-sm sm:text-base font-bold text-slate-900">{formatRupiah(rev.amount)}</p>
                          <p className="text-[10px] text-[#0F766E] font-bold font-mono">{ratio.toFixed(2)}% dari Pendapatan</p>
                        </div>
                      </div>
                      
                      {/* Visual Bar */}
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${ratio}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                          className="h-full bg-[#0F766E] rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: BELANJA DESA */}
          {activeTab === "belanja" && (
            <div className="space-y-8">
              <div className="flex items-center space-x-3 text-slate-900">
                <ArrowDownRight className="text-rose-600 h-6 w-6" />
                <h3 className="font-sans text-lg sm:text-xl font-bold">Pengeluaran Belanja Berdasarkan Bidang</h3>
              </div>

              <div className="space-y-4">
                {expenditureCategories.map((category) => {
                  const isExpanded = expandedSection === category.id;
                  const ratioOfTotal = (category.total / budgetSummary.totalExpenditure) * 100;
                  
                  return (
                    <div 
                      key={category.id}
                      className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs"
                    >
                      {/* Collapsible Header */}
                      <button
                        onClick={() => toggleExpenditure(category.id)}
                        className="w-full flex items-center justify-between p-5 bg-slate-50/80 hover:bg-slate-100/70 text-left transition-colors font-sans cursor-pointer"
                      >
                        <div className="space-y-1.5 flex-1 min-w-0 pr-4">
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                            {category.title}
                          </h4>
                          <div className="flex items-center space-x-4">
                            <span className="text-xs sm:text-sm font-bold text-rose-700">{formatRupiah(category.total)}</span>
                            <Badge variant="rose">Porsi: {ratioOfTotal.toFixed(1)}%</Badge>
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-slate-400">
                          <ChevronDown size={20} className={`transition-transform duration-300 ${isExpanded ? "rotate-180 text-[#0F766E]" : ""}`} />
                        </div>
                      </button>

                      {/* Details Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-6 space-y-4 bg-white border-t border-slate-100 divide-y divide-slate-100"
                          >
                            {category.details.map((item, idx) => (
                              <div key={idx} className="pt-4 first:pt-0 space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs sm:text-sm">
                                  <span className="font-sans font-bold text-slate-800 max-w-lg leading-relaxed">{item.name}</span>
                                  <div className="text-right flex-shrink-0">
                                    <span className="font-sans font-bold text-slate-900">{formatRupiah(item.amount)}</span>
                                    <span className="block text-[10px] text-slate-400 font-bold font-mono">SUB-PORSI: {item.percentage}%</span>
                                  </div>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-rose-500 rounded-full transition-all duration-500"
                                    style={{ width: `${item.percentage}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </GlassCard>

      </div>
    </div>
  );
}

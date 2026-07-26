import React, { useState, useEffect } from "react";
import { ppidDocuments } from "../data/ppid";
import { PPIDRequest, PPIDDocument } from "../types";
import { 
  FileText, 
  Download, 
  Search, 
  Send, 
  ClipboardCheck, 
  History, 
  SearchCode, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Paperclip,
  UploadCloud
} from "lucide-react";
import GlassCard from "./ui/GlassCard";
import SectionHeader from "./ui/SectionHeader";
import Badge from "./ui/Badge";
import AppleButton from "./ui/AppleButton";
import { motion, AnimatePresence } from "motion/react";

const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }
});

export default function PPIDPortal() {
  // Document states
  const [docCategory, setDocCategory] = useState<"Semua" | "Berkala" | "Serta-Merta" | "Setiap Saat">("Semua");
  const [docSearchQuery, setDocSearchQuery] = useState("");
  const [downloadingDocId, setDownloadingDocId] = useState<string | null>(null);

  // Form input states
  const [fullName, setFullName] = useState("");
  const [nik, setNik] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [infoRequired, setInfoRequired] = useState("");
  const [purpose, setPurpose] = useState("");
  const [userCategory, setUserCategory] = useState("Perorangan");
  const [ktpUploaded, setKtpUploaded] = useState(false);
  const [ktpFileName, setKtpFileName] = useState("");

  // Submit response states
  const [newRequestTicket, setNewRequestTicket] = useState<string | null>(null);
  const [activeFormTab, setActiveFormTab] = useState<"ajukan" | "lacak">("ajukan");

  // Local submissions from LocalStorage
  const [submissions, setSubmissions] = useState<PPIDRequest[]>([]);
  const [ticketSearch, setTicketSearch] = useState("");
  const [trackedRequest, setTrackedRequest] = useState<PPIDRequest | null>(null);
  const [trackError, setTrackError] = useState("");

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("desa_tonjong_ppid_submissions");
    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      const initialRequest: PPIDRequest = {
        id: "req-1",
        ticketNumber: "PPID-2026-0892",
        fullName: "Ahmad Hendrawan",
        nik: "3308110204920005",
        email: "ahmad.h@gmail.com",
        phone: "081234567890",
        address: "Dusun II, RT 03/RW 04, Desa Tonjong",
        infoRequired: "Rincian Anggaran Belanja PUPR Sub-Bidang Irigasi Sawah 2025",
        purpose: "Penelitian skripsi mengenai efektivitas irigasi desa",
        category: "Perorangan",
        status: "Disetujui",
        dateSubmitted: "2026-07-15"
      };
      setSubmissions([initialRequest]);
      localStorage.setItem("desa_tonjong_ppid_submissions", JSON.stringify([initialRequest]));
    }
  }, []);

  // Filter documents
  const filteredDocs = ppidDocuments.filter((doc) => {
    const matchesCategory = docCategory === "Semua" || doc.category === docCategory;
    const matchesSearch = doc.title.toLowerCase().includes(docSearchQuery.toLowerCase()) || 
                          doc.year.includes(docSearchQuery);
    return matchesCategory && matchesSearch;
  });

  // Mock download trigger
  const handleDownloadClick = (doc: PPIDDocument) => {
    setDownloadingDocId(doc.id);
    setTimeout(() => {
      setDownloadingDocId(null);
      
      const mockText = `DESA TONJONG - PPID DOKUMEN\nNama Dokumen: ${doc.title}\nKategori: ${doc.category}\nTahun: ${doc.year}\nFile Size: ${doc.fileSize}\nStatus: Dokumen Resmi Terbuka Terverifikasi PPID Desa Tonjong, Kabupaten Cirebon.`;
      const blob = new Blob([mockText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${doc.title.replace(/\s+/g, "_")}_${doc.year}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1200);
  };

  // KTP upload mockup
  const handleKtpUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setKtpUploaded(true);
      setKtpFileName(e.target.files[0].name);
    }
  };

  // Submit information request
  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !nik || !email || !phone || !address || !infoRequired || !purpose) {
      alert("Mohon lengkapi semua isian formulir.");
      return;
    }

    if (nik.length !== 16) {
      alert("NIK harus berjumlah 16 digit angka.");
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ticket = `PPID-2026-${randomNum}`;

    const newRequest: PPIDRequest = {
      id: `req-${Date.now()}`,
      ticketNumber: ticket,
      fullName,
      nik,
      email,
      phone,
      address,
      infoRequired,
      purpose,
      category: userCategory,
      status: "Diproses",
      dateSubmitted: new Date().toISOString().split("T")[0]
    };

    const updated = [newRequest, ...submissions];
    setSubmissions(updated);
    localStorage.setItem("desa_tonjong_ppid_submissions", JSON.stringify(updated));

    setNewRequestTicket(ticket);
    
    setFullName("");
    setNik("");
    setEmail("");
    setPhone("");
    setAddress("");
    setInfoRequired("");
    setPurpose("");
    setKtpUploaded(false);
    setKtpFileName("");
  };

  // Search a submitted ticket
  const handleTrackTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackError("");
    setTrackedRequest(null);

    if (!ticketSearch.trim()) {
      setTrackError("Masukkan Nomor Tiket terlebih dahulu.");
      return;
    }

    const found = submissions.find(
      (sub) => sub.ticketNumber.toLowerCase() === ticketSearch.trim().toLowerCase()
    );

    if (found) {
      setTrackedRequest(found);
    } else {
      setTrackError("Nomor Tiket tidak ditemukan. Periksa kembali pengetikan Anda.");
    }
  };

  // Status badges mapping
  const getStatusBadge = (status: "Diproses" | "Disetujui" | "Ditolak") => {
    switch (status) {
      case "Disetujui":
        return <Badge variant="emerald" icon={<CheckCircle2 size={13} />}>Disetujui</Badge>;
      case "Ditolak":
        return <Badge variant="rose" icon={<AlertCircle size={13} />}>Ditolak</Badge>;
      default:
        return <Badge variant="amber" icon={<Clock size={13} />} className="animate-pulse">Diproses</Badge>;
    }
  };

  return (
    <div className="py-16 bg-[#F8FAFC] space-y-16" id="ppid-portal-container">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="KETERBUKAAN INFORMASI PUBLIK"
          title="Layanan Portal PPID Desa"
          description="Pejabat Pengelola Informasi dan Dokumentasi (PPID) Desa Tonjong. Transparansi data, akuntabilitas, dan pelayanan akses informasi masyarakat terjamin hukum."
          icon={<FileText size={14} />}
        />

        {/* SECTION 1: DOCUMENT DOWNLOAD CENTER */}
        <motion.div {...fadeInUp(0.05)}>
          <GlassCard className="p-6 sm:p-10 space-y-8 border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <Badge variant="teal">ARSIP INFORMASI PUBLIK</Badge>
              <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-slate-900">Download Dokumen Resmi Desa Center</h3>
            </div>
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={docSearchQuery}
                onChange={(e) => setDocSearchQuery(e.target.value)}
                placeholder="Cari dokumen..."
                className="w-full rounded-2xl border border-slate-200/80 bg-white/80 py-2.5 pl-10 pr-4 text-xs font-sans focus:border-[#0F766E] focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all shadow-xs"
              />
              <Search className="absolute left-3.5 top-3 text-slate-400 h-4 w-4" />
            </div>
          </div>

          {/* Categories Tab bar */}
          <div className="flex flex-wrap items-center gap-2.5 border-b border-slate-100 pb-4">
            {(["Semua", "Berkala", "Serta-Merta", "Setiap Saat"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setDocCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-wider cursor-pointer ${
                  docCategory === cat
                    ? "bg-[#0F766E] text-white shadow-md shadow-teal-900/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                }`}
              >
                {cat === "Semua" ? "Semua" : `Informasi ${cat}`}
              </button>
            ))}
          </div>

          {/* Document list grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="documents-grid">
            {filteredDocs.length > 0 ? (
              filteredDocs.map((doc) => (
                <GlassCard
                  key={doc.id}
                  hoverEffect={false}
                  className="p-5 flex items-start justify-between gap-4 border-slate-200/80 hover:border-[#0F766E]/40"
                >
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <Badge variant={
                        doc.category === "Berkala" ? "emerald" :
                        doc.category === "Serta-Merta" ? "rose" : "blue"
                      }>
                        {doc.category}
                      </Badge>
                      <span className="font-mono text-[10px] text-slate-400 font-bold">{doc.year}</span>
                    </div>
                    <h4 className="font-sans text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                      {doc.title}
                    </h4>
                    <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-bold font-mono">
                      <span>FORMAT: {doc.fileType}</span>
                      <span>UKURAN: {doc.fileSize}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownloadClick(doc)}
                    disabled={downloadingDocId !== null}
                    className={`inline-flex items-center justify-center p-3 rounded-xl border transition-all cursor-pointer ${
                      downloadingDocId === doc.id
                        ? "bg-emerald-50 text-[#0F766E] border-emerald-300 shadow-inner"
                        : "bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-[#0F766E] border-slate-200 hover:border-emerald-200"
                    }`}
                    title="Download Dokumen"
                  >
                    {downloadingDocId === doc.id ? (
                      <div className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-[#0F766E] border-t-transparent" />
                    ) : (
                      <Download size={18} />
                    )}
                  </button>
                </GlassCard>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 text-center py-12 text-slate-500">
                <FileText className="mx-auto h-12 w-12 text-slate-300 mb-2" />
                <p className="font-sans text-sm font-bold">Dokumen tidak ditemukan</p>
                <p className="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci atau pilih kategori lain.</p>
              </div>
            )}
          </div>
        </GlassCard>
        </motion.div>

        {/* SECTION 2: REQUEST FORM & TRACKER TABS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Info/Guideline */}
          <motion.div {...fadeInUp(0.1)} className="lg:col-span-4 space-y-6">
            <GlassCard dark hoverEffect={false} className="p-6 sm:p-8 space-y-6">
              
              <div className="space-y-1">
                <Badge variant="dark">ALUR LAYANAN</Badge>
                <h3 className="font-sans text-lg sm:text-xl font-bold text-white">Panduan Permohonan Informasi</h3>
              </div>

              <div className="space-y-5 font-sans text-xs sm:text-sm">
                <div className="flex items-start space-x-3.5">
                  <div className="h-7 w-7 rounded-xl bg-emerald-900 text-emerald-300 flex items-center justify-center font-bold text-xs font-mono flex-shrink-0 border border-emerald-500/30">1</div>
                  <div>
                    <h4 className="font-bold text-white leading-normal">Isi Form Online</h4>
                    <p className="text-xs text-emerald-200/80 leading-relaxed mt-0.5">Lengkapi identitas KTP/NIK, rincian dokumen, dan tujuan peruntukan informasi secara jelas.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="h-7 w-7 rounded-xl bg-emerald-900 text-emerald-300 flex items-center justify-center font-bold text-xs font-mono flex-shrink-0 border border-emerald-500/30">2</div>
                  <div>
                    <h4 className="font-bold text-white leading-normal">Dapatkan No. Tiket</h4>
                    <p className="text-xs text-emerald-200/80 leading-relaxed mt-0.5">Setelah dikirim, simpan Nomor Tiket Pelacakan unik yang muncul otomatis untuk pemantauan.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="h-7 w-7 rounded-xl bg-emerald-900 text-emerald-300 flex items-center justify-center font-bold text-xs font-mono flex-shrink-0 border border-emerald-500/30">3</div>
                  <div>
                    <h4 className="font-bold text-white leading-normal">Proses Validasi (Maks 10 Hari)</h4>
                    <p className="text-xs text-emerald-200/80 leading-relaxed mt-0.5">Petugas PPID memverifikasi kebutuhan Anda. Dokumen yang disetujui akan dikirim via Email.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-900/80 text-[11px] text-emerald-300/80 leading-relaxed font-sans">
                <strong>Ketentuan Hukum:</strong> Sesuai dengan UU Keterbukaan Informasi Publik (KIP) No. 14 Tahun 2008, warga negara berhak memperoleh informasi publik yang tidak dikecualikan oleh undang-undang.
              </div>
            </GlassCard>
          </motion.div>

          {/* Right panel: Tabbed Form & Tracker */}
          <motion.div {...fadeInUp(0.15)} className="lg:col-span-8 space-y-6">
            
            {/* Tabs control */}
            <div className="flex bg-slate-100/90 rounded-2xl p-1.5 gap-2 border border-slate-200/60">
              <button
                onClick={() => { setActiveFormTab("ajukan"); setNewRequestTicket(null); }}
                className={`flex-1 py-3 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 uppercase tracking-wider cursor-pointer ${
                  activeFormTab === "ajukan"
                    ? "bg-white text-slate-900 shadow-md"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <ClipboardCheck size={16} />
                <span>Form Baru</span>
              </button>
              
              <button
                onClick={() => { setActiveFormTab("lacak"); setTrackedRequest(null); setTrackError(""); }}
                className={`flex-1 py-3 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 uppercase tracking-wider cursor-pointer ${
                  activeFormTab === "lacak"
                    ? "bg-white text-slate-900 shadow-md"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <History size={16} />
                <span>Lacak Tiket</span>
              </button>
            </div>

            {/* TAB: SUBMIT REQUEST */}
            {activeFormTab === "ajukan" && (
              <GlassCard className="p-6 sm:p-8 space-y-6 border-slate-200/80">
                
                {newRequestTicket ? (
                  <div className="bg-emerald-50/70 rounded-2xl border border-emerald-200/80 p-8 text-center space-y-5">
                    <CheckCircle2 className="mx-auto text-[#0F766E] h-12 w-12" />
                    <div className="space-y-1.5">
                      <h4 className="font-sans text-lg sm:text-xl font-extrabold text-slate-900">
                        Permohonan Informasi Berhasil Dikirim!
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                        Simpan dan salin nomor tiket pelacakan Anda di bawah ini untuk memeriksa status permohonan secara berkala.
                      </p>
                    </div>

                    <div className="inline-flex flex-col items-center justify-center bg-white border border-emerald-200 rounded-2xl px-8 py-5 space-y-1 shadow-sm">
                      <span className="text-[10px] uppercase font-bold text-[#0F766E] tracking-widest font-mono">NOMOR TIKET ANDA</span>
                      <span className="font-mono text-xl sm:text-2xl font-black text-slate-900 tracking-wide">
                        {newRequestTicket}
                      </span>
                    </div>

                    <div className="flex justify-center gap-3 pt-2">
                      <AppleButton
                        onClick={() => {
                          setTicketSearch(newRequestTicket);
                          setActiveFormTab("lacak");
                          setNewRequestTicket(null);
                          setTimeout(() => {
                            const found = submissions.find(s => s.ticketNumber === newRequestTicket);
                            if (found) setTrackedRequest(found);
                          }, 100);
                        }}
                        variant="primary"
                        size="sm"
                      >
                        Lacak Status
                      </AppleButton>
                      <AppleButton
                        onClick={() => setNewRequestTicket(null)}
                        variant="outline"
                        size="sm"
                      >
                        Ajukan Lagi
                      </AppleButton>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitRequest} className="space-y-5 font-sans text-xs sm:text-sm">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="block text-slate-800 font-bold">Nama Lengkap Sesuai KTP <span className="text-rose-500">*</span></label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Contoh: Budi Sudarsono"
                          className="w-full rounded-xl border border-slate-200 py-2.5 px-3.5 focus:border-[#0F766E] focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all"
                        />
                      </div>

                      {/* NIK */}
                      <div className="space-y-1.5">
                        <label className="block text-slate-800 font-bold">NIK (16 Digit) <span className="text-rose-500">*</span></label>
                        <input
                          type="text"
                          required
                          maxLength={16}
                          value={nik}
                          onChange={(e) => setNik(e.target.value.replace(/\D/g, ""))}
                          placeholder="Contoh: 330811xxxxxxxxxx"
                          className="w-full rounded-xl border border-slate-200 py-2.5 px-3.5 focus:border-[#0F766E] focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="block text-slate-800 font-bold">Alamat Email <span className="text-rose-500">*</span></label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Contoh: budi@gmail.com"
                          className="w-full rounded-xl border border-slate-200 py-2.5 px-3.5 focus:border-[#0F766E] focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="block text-slate-800 font-bold">Nomor WhatsApp/HP <span className="text-rose-500">*</span></label>
                        <input
                          type="text"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                          placeholder="Contoh: 081234567890"
                          className="w-full rounded-xl border border-slate-200 py-2.5 px-3.5 focus:border-[#0F766E] focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-1.5">
                      <label className="block text-slate-800 font-bold">Alamat Rumah Lengkap <span className="text-rose-500">*</span></label>
                      <textarea
                        required
                        rows={2}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Masukkan alamat domisili lengkap Anda"
                        className="w-full rounded-xl border border-slate-200 py-2.5 px-3.5 focus:border-[#0F766E] focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-1.5">
                      <label className="block text-slate-800 font-bold">Kategori Pemohon <span className="text-rose-500">*</span></label>
                      <div className="flex flex-wrap gap-4 pt-1">
                        {["Perorangan", "Kelompok Orang", "Badan Hukum / LSM"].map((cat) => (
                          <label key={cat} className="flex items-center space-x-2 cursor-pointer font-bold text-slate-700">
                            <input
                              type="radio"
                              name="userCategory"
                              checked={userCategory === cat}
                              onChange={() => setUserCategory(cat)}
                              className="text-[#0F766E] focus:ring-[#0F766E]"
                            />
                            <span>{cat}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Information Required */}
                    <div className="space-y-1.5">
                      <label className="block text-slate-800 font-bold">Rincian Informasi yang Dibutuhkan <span className="text-rose-500">*</span></label>
                      <textarea
                        required
                        rows={3}
                        value={infoRequired}
                        onChange={(e) => setInfoRequired(e.target.value)}
                        placeholder="Contoh: Saya membutuhkan berkas Lampiran APBDDesa 2025 rincian dana pembangunan jalan di RT 01."
                        className="w-full rounded-xl border border-slate-200 py-2.5 px-3.5 focus:border-[#0F766E] focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Purpose */}
                    <div className="space-y-1.5">
                      <label className="block text-slate-800 font-bold">Tujuan Penggunaan Informasi <span className="text-rose-500">*</span></label>
                      <textarea
                        required
                        rows={2}
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="Contoh: Sebagai bahan acuan untuk kajian studi pembanding penelitian kuliah."
                        className="w-full rounded-xl border border-slate-200 py-2.5 px-3.5 focus:border-[#0F766E] focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all resize-none"
                      />
                    </div>

                    {/* KTP Upload mockup */}
                    <div className="space-y-1.5">
                      <label className="block text-slate-800 font-bold">Lampiran Identitas (Foto KTP Pemohon) <span className="text-rose-500">*</span></label>
                      <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-[#0F766E] hover:bg-slate-50/50 transition-colors cursor-pointer relative">
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleKtpUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        {ktpUploaded ? (
                          <div className="space-y-1 text-[#0F766E]">
                            <Paperclip className="mx-auto h-7 w-7" />
                            <p className="text-xs font-bold">File Terpilih: {ktpFileName}</p>
                            <p className="text-[10px] text-slate-400">Klik atau seret file lain untuk mengganti.</p>
                          </div>
                        ) : (
                          <div className="space-y-1 text-slate-500">
                            <UploadCloud className="mx-auto h-7 w-7 text-slate-400" />
                            <p className="text-xs font-bold">Pilih Foto KTP atau PDF Identitas</p>
                            <p className="text-[10px] text-slate-400">Format: JPG, PNG, PDF (Maks. 2MB)</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <AppleButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      icon={<Send size={18} />}
                      className="w-full"
                    >
                      Kirim Permohonan Informasi
                    </AppleButton>

                  </form>
                )}
              </GlassCard>
            )}

            {/* TAB: TRACK TICKET STATUS */}
            {activeFormTab === "lacak" && (
              <GlassCard className="p-6 sm:p-8 space-y-6 border-slate-200/80">
                
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-sans text-sm sm:text-base font-bold text-slate-900">Cek Status Pengajuan Informasi Anda</h4>
                  <p className="text-slate-500 text-xs font-sans leading-relaxed">
                    Masukkan nomor tiket pelacakan Anda di bawah ini (Format: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-rose-600 font-mono text-xs">PPID-2026-XXXX</code>) untuk melihat status verifikasi.
                  </p>
                </div>

                <form onSubmit={handleTrackTicket} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={ticketSearch}
                    onChange={(e) => setTicketSearch(e.target.value)}
                    placeholder="Contoh: PPID-2026-0892"
                    className="flex-1 rounded-xl border border-slate-200 py-3 px-4 font-mono font-bold tracking-wide text-xs sm:text-sm focus:border-[#0F766E] focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all"
                  />
                  <AppleButton
                    type="submit"
                    variant="primary"
                    size="md"
                    icon={<SearchCode size={16} />}
                  >
                    Periksa Tiket
                  </AppleButton>
                </form>

                {trackError && (
                  <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex items-center space-x-3 text-rose-700 text-xs sm:text-sm font-sans">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    <span>{trackError}</span>
                  </div>
                )}

                {/* Tracked Request Detail Card */}
                {trackedRequest && (
                  <GlassCard className="p-6 space-y-6 bg-gradient-to-r from-emerald-50/40 via-white to-emerald-50/40 border-emerald-200 text-xs sm:text-sm font-sans">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">NOMOR TIKET</span>
                        <h4 className="font-mono text-base sm:text-lg font-black text-slate-900">{trackedRequest.ticketNumber}</h4>
                      </div>
                      <div className="sm:text-right">
                        <span className="block text-[10px] uppercase font-bold text-slate-400 font-mono mb-1">STATUS VERIFIKASI</span>
                        {getStatusBadge(trackedRequest.status)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-400 font-mono">NAMA PEMOHON</span>
                        <span className="font-bold text-slate-800">{trackedRequest.fullName}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-400 font-mono">TANGGAL PENGAJUAN</span>
                        <span className="font-bold text-slate-800">{trackedRequest.dateSubmitted}</span>
                      </div>
                    </div>

                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-400 font-mono">INFORMASI YANG DIMINTA</span>
                      <p className="font-semibold text-slate-800 leading-relaxed bg-white/90 rounded-xl border border-slate-200/60 p-4 mt-1.5 text-xs sm:text-sm">
                        {trackedRequest.infoRequired}
                      </p>
                    </div>

                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-400 font-mono">KETERANGAN TANGGAPAN PETUGAS</span>
                      <div className="rounded-xl border border-emerald-100 bg-emerald-50/80 p-5 mt-1.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
                        {trackedRequest.status === "Disetujui" ? (
                          <span>
                            <strong>Petugas PPID (Sekretariat Desa):</strong> "Terima kasih atas permohonan Anda. Berkas rincian yang diminta telah dinyatakan terbuka untuk publik. Salinan PDF berkas resmi telah dikirimkan ke alamat email terdaftar (<strong>{trackedRequest.email}</strong>). Silakan periksa kotak masuk atau folder spam Anda."
                          </span>
                        ) : trackedRequest.status === "Ditolak" ? (
                          <span>
                            <strong>Petugas PPID (Sekretariat Desa):</strong> "Maaf, permohonan Anda ditolak karena berkas dokumen yang Anda minta masuk ke dalam berkas informasi publik yang dikecualikan sesuai dengan Pasal 17 UU No. 14 Tahun 2008 tentang KIP."
                          </span>
                        ) : (
                          <span>
                            <strong>Petugas PPID (Sekretariat Desa):</strong> "Berkas permohonan Anda telah diterima oleh Sekretariat Desa Tonjong. Saat ini petugas sedang melakukan review kepatuhan administrasi dan menyiapkan draf salinan. Tanggapan resmi akan dikirim maksimal 10 hari kerja sejak berkas diajukan."
                          </span>
                        )}
                      </div>
                    </div>

                  </GlassCard>
                )}

              </GlassCard>
            )}

          </motion.div>

        </div>

      </div>
    </div>
  );
}

import { DemographicData, VillageOfficial } from "../types";

// ============================================================
// DATA RESMI KEPENDUDUKAN DESA TONJONG
// Sumber: Data Profil Desa Tonjong, Kec. Pasaleman, Kab. Cirebon
// ============================================================

export const demographicStats: DemographicData[] = [
  {
    category: "Total Penduduk",
    value: 8432,
    unit: "Jiwa",
    icon: "Users",
    details: "Mencakup seluruh warga terdaftar di Desa Tonjong berdasarkan data profil desa terkini."
  },
  {
    category: "Jumlah Kepala Keluarga",
    value: 2650,
    unit: "KK",
    icon: "Home",
    details: "Tersebar di 4 Dusun, 6 RW, dan 18 RT se-Desa Tonjong, Kec. Pasaleman."
  },
  {
    category: "Luas Wilayah",
    value: 420,
    unit: "Ha",
    icon: "Map",
    details: "Terdiri dari lahan pertanian (sawah & ladang), kawasan permukiman, dan fasilitas publik."
  },
  {
    category: "Penduduk Laki-Laki",
    value: 4250,
    unit: "Jiwa",
    icon: "User",
    details: "±50.4% dari total populasi Desa Tonjong, mencakup semua kelompok usia."
  },
  {
    category: "Penduduk Perempuan",
    value: 4182,
    unit: "Jiwa",
    icon: "User",
    details: "±49.6% dari total populasi Desa Tonjong, mencakup semua kelompok usia."
  },
  {
    category: "Jumlah Dusun",
    value: 4,
    unit: "Dusun",
    icon: "Map",
    details: "Desa Tonjong terdiri dari 4 Dusun: Dusun I, Dusun II, Dusun III, dan Dusun IV."
  }
];

// Distribusi Mata Pencaharian Penduduk (persentase estimasi)
export const livelihoodStats = [
  { label: "Petani / Pertanian & Perkebunan", value: 45, color: "bg-emerald-600" },
  { label: "Buruh Harian Lepas", value: 22, color: "bg-teal-600" },
  { label: "Karyawan Swasta / Perusahaan", value: 16, color: "bg-blue-600" },
  { label: "Wiraswasta & Pedagang (UMKM)", value: 12, color: "bg-amber-600" },
  { label: "PNS / TNI-Polri / ASN", value: 5, color: "bg-rose-600" }
];

// Struktur Kelompok Usia Penduduk
export const ageGroupStats = [
  { label: "Anak-anak (0–14 tahun)", value: 1517, percentage: 18 },
  { label: "Usia Produktif (15–64 tahun)", value: 5734, percentage: 68 },
  { label: "Lanjut Usia / Lansia (65+ tahun)", value: 1181, percentage: 14 }
];

// Sejarah Kepemimpinan Desa (Silsilah Kuwu / Kepala Desa)
export const kuwuHistory = [
  { name: "H. Tasban", period: "1930 – 1960" },
  { name: "H. Sahudi", period: "1960 – 1974" },
  { name: "H. Tamid / Mamid", period: "1974 – 1984" },
  { name: "H. Sukanta", period: "1984 – 1994" },
  { name: "H. Sulaeman", period: "1994 – 2004" },
  { name: "H. Abubakar, S.Pd.I", period: "2004 – 2008" },
  { name: "H. Ahmad Soleh", period: "2008 – 2018" },
  { name: "Hj. Epi Nurhayati", period: "2018 – 2019 (Penjabat)" },
  { name: "H. Ahmad Badawi, M.Pd", period: "2019 – Sekarang" }
];

// Komoditas Pertanian Unggulan
export const agriculturalCommodities = [
  { name: "Padi Sawah", type: "Tanaman Pangan", desc: "Komoditas utama pertanian desa dengan luas panen signifikan." },
  { name: "Singkong (Ketela Pohon)", type: "Tanaman Pangan", desc: "Bahan pangan pokok alternatif & industri rumahan keripik." },
  { name: "Ubi Jalar", type: "Tanaman Pangan", desc: "Sumber karbohidrat lokal yang banyak dibudidayakan warga." },
  { name: "Kacang Tanah", type: "Tanaman Pangan", desc: "Tanaman palawija dengan nilai ekonomi tinggi untuk olahan." },
  { name: "Mangga", type: "Tanaman Buah", desc: "Buah unggulan senilai ekspor, terkenal di pasar Cirebon." },
  { name: "Pisang", type: "Tanaman Buah", desc: "Dikembangkan secara intensif sebagai komoditas pasar harian." },
  { name: "Bambu", type: "Tanaman Industri", desc: "Bahan baku kerajinan lokal dan konstruksi tradisional desa." }
];

// Infrastruktur Sosial Desa
export const socialInfrastructure = [
  { category: "Masjid", count: 6, unit: "Unit" },
  { category: "Musholla / Langgar", count: 12, unit: "Unit" },
  { category: "Posyandu Aktif", count: 4, unit: "Unit" },
  { category: "PAUD / TK", count: 2, unit: "Lembaga" },
  { category: "Sekolah Dasar Negeri (SDN)", count: 1, unit: "Unit" },
  { category: "Madrasah / TPQ", count: 3, unit: "Lembaga" }
];

// Struktur Pemerintahan Desa
export const villageOfficials: VillageOfficial[] = [
  {
    title: "Kepala Desa (Kuwu)",
    description: "Pemimpin tertinggi penyelenggaraan pemerintahan, pembangunan, pembinaan kemasyarakatan, dan pemberdayaan masyarakat desa. Dipilih langsung oleh warga melalui Pilkades demokratis.",
    category: "Kepala Desa"
  },
  {
    title: "Badan Permusyawaratan Desa (BPD)",
    description: "Lembaga permusyawaratan warga yang membahas, menyepakati Rancangan Peraturan Desa, serta mengawasi kinerja dan akuntabilitas Kuwu dalam menjalankan tata kelola desa.",
    category: "BPD"
  },
  {
    title: "Sekretaris Desa (Sekdes)",
    description: "Pimpinan sekretariat desa yang memimpin aparatur dan membantu Kuwu dalam bidang administrasi umum, tata kelola surat-menyurat, arsip, dan koordinasi antar-bidang pemerintahan desa.",
    category: "Sekretaris Desa"
  },
  {
    title: "Kepala Urusan (Kaur) Keuangan",
    description: "Unsur staf sekretariat yang membantu Sekdes dalam pengelolaan keuangan desa, pembukuan kas, verifikasi transaksi, dan penyusunan laporan realisasi APBDesa.",
    category: "Perangkat Desa / Kaur & Kasi"
  },
  {
    title: "Kepala Urusan (Kaur) Umum & Perencanaan",
    description: "Unsur staf yang menangani administrasi umum, ketatausahaan, inventarisasi aset desa, serta koordinasi perencanaan program pembangunan jangka menengah (RPJMDes).",
    category: "Perangkat Desa / Kaur & Kasi"
  },
  {
    title: "Kepala Seksi (Kasi) Pemerintahan",
    description: "Unsur pelaksana teknis yang membantu Kuwu dalam manajemen tata pamong, administrasi kependudukan, ketentraman masyarakat, dan administrasi pertanahan.",
    category: "Perangkat Desa / Kaur & Kasi"
  },
  {
    title: "Kepala Seksi (Kasi) Kesejahteraan & Pelayanan",
    description: "Unsur pelaksana teknis dalam pembangunan sarana sosial, pembinaan kepemudaan, fasilitasi posyandu, program keagamaan, dan pelayanan langsung kepada warga desa.",
    category: "Perangkat Desa / Kaur & Kasi"
  }
];

export const budgetSummary = {
  totalRevenue: 2024680399,
  totalExpenditure: 1800113399,
  financingExpenditure: 224567000,
  surplusDeficit: 224567000
};

export const revenueDetails = [
  { name: "Dana Desa (DD)", amount: 1122832000, desc: "Dana transfer dari Pemerintah Pusat untuk pembangunan desa." },
  { name: "Alokasi Dana Desa (ADD)", amount: 469928000, desc: "Alokasi dana pembangunan dari APBD Kabupaten Cirebon." },
  { name: "Pendapatan Asli Desa (PADes)", amount: 194450000, desc: "Pendapatan mandiri dari hasil usaha desa, pasar, dan aset desa lainnya." },
  { name: "Bantuan Keuangan Provinsi", amount: 130000000, desc: "Bantuan program khusus dari APBD Provinsi Jawa Barat." },
  { name: "Bagi Hasil Pajak & Retribusi", amount: 60554190, desc: "Bagi hasil retribusi daerah kabupaten kepada desa." },
  { name: "Bantuan Keuangan Kabupaten", amount: 36679500, desc: "Bantuan keuangan khusus tingkat kabupaten." },
  { name: "Pendapatan Lain-Lain", amount: 10236709, desc: "Penerimaan lain desa yang sah secara hukum." }
];

export const expenditureCategories = [
  {
    id: "gov",
    title: "1. Penyelenggaraan Pemerintahan Desa",
    total: 967112399,
    details: [
      { name: "Belanja Penghasilan Tetap (Siltap), Tunjangan, & Operasional Pemdes", amount: 838353809, percentage: 86.7 },
      { name: "Penyediaan Sarana Prasarana Pemerintahan Desa", amount: 26000000, percentage: 2.7 },
      { name: "Pengelolaan Administrasi Kependudukan, Catpil, Statistik, & Kearsipan", amount: 18600000, percentage: 1.9 },
      { name: "Penyelenggaraan Tata Ruang Pemdes, Perencanaan, Keu, & Pelaporan", amount: 13400000, percentage: 1.4 },
      { name: "Bidang Pertanahan", amount: 70758590, percentage: 7.3 }
    ]
  },
  {
    id: "dev",
    title: "2. Pelaksanaan Pembangunan Desa",
    total: 618793000,
    details: [
      { name: "Pekerjaan Umum dan Penataan Ruang (PUPR)", amount: 301893000, percentage: 48.8 },
      { name: "Kawasan Permukiman", amount: 172650000, percentage: 27.9 },
      { name: "Kesehatan (Pencegahan Stunting, Posyandu, dll)", amount: 119250000, percentage: 19.3 },
      { name: "Pendidikan (Sarpras PAUD, Taman Baca)", amount: 18000000, percentage: 2.9 },
      { name: "Perhubungan, Komunikasi, dan Informatika", amount: 7000000, percentage: 1.1 }
    ]
  },
  {
    id: "society",
    title: "3. Pembinaan Kemasyarakatan",
    total: 155208000,
    details: [
      { name: "Sub Bidang Kebudayaan dan Keagamaan", amount: 80600000, percentage: 51.9 },
      { name: "Sub Bidang Kepemudaan dan Olahraga", amount: 38000000, percentage: 24.5 },
      { name: "Sub Bidang Ketenteraman, Ketertiban Umum, & Perlindungan Masyarakat", amount: 21108000, percentage: 13.6 },
      { name: "Sub Bidang Kelembagaan Masyarakat (RT, RW, PKK)", amount: 15500000, percentage: 10.0 }
    ]
  },
  {
    id: "empower",
    title: "4. Pemberdayaan Masyarakat",
    total: 5000000,
    details: [
      { name: "Sub Bidang Peningkatan Kapasitas Aparatur Desa", amount: 5000000, percentage: 100 }
    ]
  },
  {
    id: "disaster",
    title: "5. Penanggulangan Bencana, Keadaan Darurat & Mendesak",
    total: 54000000,
    details: [
      { name: "Bantuan Langsung Tunai (BLT) Dana Desa", amount: 54000000, percentage: 100 }
    ]
  }
];

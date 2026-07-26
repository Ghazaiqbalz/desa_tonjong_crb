import { PPIDDocument, PublicFacility } from "../types";

export const ppidDocuments: PPIDDocument[] = [
  // Informasi Berkala
  {
    id: "doc-1",
    title: "Laporan Realisasi APBDDesa Tonjong Tahun Anggaran 2025",
    category: "Berkala",
    year: "2025",
    fileSize: "2.4 MB",
    fileType: "PDF",
    downloadUrl: "#"
  },
  {
    id: "doc-2",
    title: "Laporan Penyelenggaraan Pemerintahan Desa (LPPD) Akhir Tahun Anggaran 2025",
    category: "Berkala",
    year: "2025",
    fileSize: "4.1 MB",
    fileType: "PDF",
    downloadUrl: "#"
  },
  {
    id: "doc-3",
    title: "Rencana Pembangunan Jangka Menengah Desa (RPJMDes) 2022-2028",
    category: "Berkala",
    year: "2022",
    fileSize: "12.8 MB",
    fileType: "PDF",
    downloadUrl: "#"
  },
  
  // Informasi Serta-Merta
  {
    id: "doc-4",
    title: "Prosedur Evakuasi dan Tanggap Darurat Bencana Banjir Sungai Pedes",
    category: "Serta-Merta",
    year: "2026",
    fileSize: "1.8 MB",
    fileType: "PDF",
    downloadUrl: "#"
  },
  {
    id: "doc-5",
    title: "Surat Keputusan Kepala Desa tentang Penetapan Status Siaga Darurat Kekeringan",
    category: "Serta-Merta",
    year: "2026",
    fileSize: "850 KB",
    fileType: "PDF",
    downloadUrl: "#"
  },

  // Informasi Setiap Saat
  {
    id: "doc-6",
    title: "Profil Struktur Organisasi & Pejabat Pemerintah Desa Tonjong 2026",
    category: "Setiap Saat",
    year: "2026",
    fileSize: "1.2 MB",
    fileType: "PDF",
    downloadUrl: "#"
  },
  {
    id: "doc-7",
    title: "Peraturan Desa Tonjong Nomor 3 Tahun 2024 tentang Ketertiban Umum",
    category: "Setiap Saat",
    year: "2024",
    fileSize: "980 KB",
    fileType: "PDF",
    downloadUrl: "#"
  },
  {
    id: "doc-8",
    title: "SOP Pelayanan Kartu Tanda Penduduk dan Kartu Keluarga Tingkat Desa",
    category: "Setiap Saat",
    year: "2025",
    fileSize: "620 KB",
    fileType: "PDF",
    downloadUrl: "#"
  }
];

export const publicFacilities: PublicFacility[] = [
  {
    id: "fac-1",
    name: "Kantor Kepala Desa Tonjong (Balai Desa)",
    category: "Pemerintahan",
    coordinates: [-6.9138, 108.7565],
    description: "Pusat balai pemerintahan desa dan tempat pelayanan administrasi kependudukan, surat-menyurat, perizinan, serta musyawarah warga Desa Tonjong, Kecamatan Pasaleman, Kabupaten Cirebon.",
    address: "Jl. Raya Tonjong No. 01, Dusun I, RT 01/RW 01, Desa Tonjong, Kec. Pasaleman, Kab. Cirebon, Jawa Barat 45187",
    status: "Pusat Pemerintahan Desa",
    googleMapsUrl: "https://maps.google.com/maps/place//data=!4m2!3m1!1s0x2e6f097128bf0669:0x376b04b213b0547c?entry=s&sa=X&ved=2ahUKEwjNhpTqu-aVAxUhyDgGHbB6EocQ4kB6BAgEEAA&hl=id"
  },
  {
    id: "fac-2",
    name: "UPTD Puskesmas Pasaleman",
    category: "Kesehatan",
    coordinates: [-6.9228, 108.7492],
    description: "Fasilitas pelayanan kesehatan masyarakat utama di Kecamatan Pasaleman, Kabupaten Cirebon. Menyediakan layanan IGD 24 Jam, Poliklinik Umum, Kesehatan Ibu & Anak (KIA/KB), Imunisasi, Laboratorium, serta pembinaan Posyandu dan pencegahan stunting wilayah Pasaleman.",
    address: "Jl. Raya Cilengkrang - Pasaleman, Kec. Pasaleman, Kab. Cirebon, Jawa Barat 45187",
    status: "Puskesmas Pembina",
    googleMapsUrl: "https://maps.app.goo.gl/NZtGiWfZKJK4sevB9"
  },
  {
    id: "fac-3",
    name: "SD Negeri 1 Tonjong",
    category: "Pendidikan",
    coordinates: [-6.9118, 108.7542],
    description: "Instansi Sekolah Dasar Negeri utama Desa Tonjong di bawah naungan Dinas Pendidikan Kabupaten Cirebon. Melayani kegiatan belajar mengajar jenjang SD dengan kurikulum nasional, ditunjang fasilitas ruang kelas, perpustakaan, lapangan olahraga, dan sarana belajar terakreditasi.",
    address: "Dusun I, RT 01/RW 01, Desa Tonjong, Kec. Pasaleman, Kab. Cirebon, Jawa Barat 45187",
    npsn: "20214988",
    status: "Negeri",
    googleMapsUrl: "https://maps.google.com/maps/place//data=!4m2!3m1!1s0x2e6f09712420a035:0xcf53911edc9ba5ba?entry=s&sa=X&ved=2ahUKEwjz5qycvOaVAxV01jgGHXB_DDUQ4kB6BAgEEAA&hl=id"
  },
  {
    id: "fac-4",
    name: "Masjid Jami Baiturrahman (Masjid Tonjong)",
    category: "Ibadah",
    coordinates: [-6.9132, 108.7568],
    description: "Masjid utama dan terbesar di Desa Tonjong, Kecamatan Pasaleman, Kabupaten Cirebon. Berada di kawasan pusat desa, menjadi pusat kegiatan ibadah shalat berjamaah, perayaan hari besar Islam, serta kajian keagamaan warga.",
    address: "Dusun II, RT 02/RW 02 (Area Alun-Alun Balai Desa), Desa Tonjong, Kec. Pasaleman, Kab. Cirebon, Jawa Barat 45187",
    googleMapsUrl: "https://maps.google.com/maps/place//data=!4m2!3m1!1s0x2e6f097125bcae99:0x7480ae2560e0a6ec?entry=s&sa=X&ved=2ahUKEwiKna3TxeaVAxVazDgGHefNBKMQ4kB6BAgEEAA&hl=id"
  }
];

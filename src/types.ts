export interface DemographicData {
  category: string;
  value: number;
  unit: string;
  icon: string;
  details?: string;
}

export interface BudgetDetail {
  name: string;
  amount: number;
  percentage: number;
}

export interface BudgetCategory {
  id: string;
  title: string;
  total: number;
  details: BudgetDetail[];
}

export interface PPIDDocument {
  id: string;
  title: string;
  category: "Berkala" | "Serta-Merta" | "Setiap Saat";
  year: string;
  fileSize: string;
  fileType: string;
  downloadUrl: string;
}

export interface PPIDRequest {
  id: string;
  ticketNumber: string;
  fullName: string;
  nik: string;
  email: string;
  phone: string;
  address: string;
  infoRequired: string;
  purpose: string;
  category: string;
  status: "Diproses" | "Disetujui" | "Ditolak";
  dateSubmitted: string;
}

export interface PublicFacility {
  id: string;
  name: string;
  category: "Pemerintahan" | "Kesehatan" | "Pendidikan" | "Ibadah" | "Ekonomi" | "UMKM";
  coordinates: [number, number]; // [lat, lng]
  description: string;
  address: string;
  npsn?: string;
  status?: string;
  googleMapsUrl?: string;
}

export interface VillageOfficial {
  title: string;
  description?: string;
  category: "Kepala Desa" | "BPD" | "Sekretaris Desa" | "Perangkat Desa / Kaur & Kasi";
}

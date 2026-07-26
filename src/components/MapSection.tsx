import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { publicFacilities } from "../data/ppid";
import { PublicFacility } from "../types";
import { Building, MapPin, HeartPulse, GraduationCap, Coins, Info, ShieldCheck, Store, Compass, ExternalLink } from "lucide-react";
import GlassCard from "./ui/GlassCard";
import SectionHeader from "./ui/SectionHeader";
import Badge from "./ui/Badge";
import AppleButton from "./ui/AppleButton";
import { motion } from "motion/react";

const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }
});


export default function MapSection() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  
  const [activeFilter, setActiveFilter] = useState<string>("Semua");
  const [selectedFacility, setSelectedFacility] = useState<PublicFacility | null>(publicFacilities[0]);
  const [mapError, setMapError] = useState<string | null>(null);

  const categories = ["Semua", "Pemerintahan", "Kesehatan", "Pendidikan", "Ibadah", "Ekonomi"];

  // Helper to get React Lucide Icon for categories
  const getCategoryIcon = (category: string, size = 16) => {
    switch (category) {
      case "Pemerintahan":
        return <Building size={size} />;
      case "Kesehatan":
        return <HeartPulse size={size} />;
      case "Pendidikan":
        return <GraduationCap size={size} />;
      case "Ibadah":
        return <MapPin size={size} />;
      case "Ekonomi":
        return <Coins size={size} />;
      case "UMKM":
        return <Store size={size} />;
      default:
        return <Building size={size} />;
    }
  };

  // Get color styles for the categories
  const getCategoryColors = (category: string) => {
    switch (category) {
      case "Pemerintahan":
        return { bg: "bg-[#0F766E]", text: "text-[#0F766E]", border: "border-[#0F766E]", hex: "#0F766E" };
      case "Kesehatan":
        return { bg: "bg-rose-600", text: "text-rose-600", border: "border-rose-600", hex: "#e11d48" };
      case "Pendidikan":
        return { bg: "bg-blue-600", text: "text-blue-600", border: "border-blue-600", hex: "#2563eb" };
      case "Ibadah":
        return { bg: "bg-indigo-600", text: "text-indigo-600", border: "border-indigo-600", hex: "#4f46e5" };
      case "Ekonomi":
        return { bg: "bg-amber-600", text: "text-amber-600", border: "border-amber-600", hex: "#d97706" };
      case "UMKM":
        return { bg: "bg-purple-600", text: "text-purple-600", border: "border-purple-600", hex: "#9333ea" };
      default:
        return { bg: "bg-slate-600", text: "text-slate-600", border: "border-slate-600", hex: "#475569" };
    }
  };

  useEffect(() => {
    // Inject Leaflet CSS dynamically if not present
    if (!document.getElementById("leaflet-css-link")) {
      const link = document.createElement("link");
      link.id = "leaflet-css-link";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.crossOrigin = "";
      document.head.appendChild(link);
    }

    // Initialize Map
    if (mapContainerRef.current && !mapRef.current) {
      try {
        const centerLatLng: [number, number] = [-6.9138, 108.7565];
        
        const map = L.map(mapContainerRef.current, {
          center: centerLatLng,
          zoom: 14.5,
          zoomControl: true,
          scrollWheelZoom: false,
        });

        // Add OSM Tile Layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        mapRef.current = map;

        // Fetch and load GeoJSON boundary
        fetch("/assets/batas-desa.geojson")
          .then((res) => {
            if (!res.ok) throw new Error("Gagal memuat batas wilayah");
            return res.json();
          })
          .then((data) => {
            if (mapRef.current) {
              const geoJsonLayer = L.geoJSON(data, {
                style: {
                  fillColor: "#10b981",
                  weight: 3,
                  opacity: 0.9,
                  color: "#0F766E",
                  fillOpacity: 0.18
                }
              }).addTo(mapRef.current);
              geoJsonLayerRef.current = geoJsonLayer;
              
              mapRef.current.fitBounds(geoJsonLayer.getBounds(), { padding: [20, 20] });
            }
          })
          .catch((err) => {
            console.warn("GeoJSON loading fell back to manual shapes", err);
            if (mapRef.current) {
              const polygonCoords: [number, number][] = [
                [-6.9130, 108.7450],
                [-6.9090, 108.7480],
                [-6.9070, 108.7550],
                [-6.9090, 108.7630],
                [-6.9140, 108.7680],
                [-6.9190, 108.7650],
                [-6.9220, 108.7580],
                [-6.9200, 108.7510]
              ];
              L.polygon(polygonCoords, {
                fillColor: "#10b981",
                weight: 3,
                opacity: 0.9,
                color: "#0F766E",
                fillOpacity: 0.18
              }).addTo(mapRef.current);
            }
          });

      } catch (err: any) {
        setMapError("Gagal memuat peta interaktif. Periksa koneksi internet Anda.");
        console.error("Leaflet initialization failed: ", err);
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update Markers when active filter or map instance changes
  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const filtered = activeFilter === "Semua" 
      ? publicFacilities 
      : publicFacilities.filter(f => f.category === activeFilter);

    filtered.forEach((fac) => {
      const colors = getCategoryColors(fac.category);
      
      const markerHtml = `
        <div class="relative flex items-center justify-center w-10 h-10 rounded-full ${colors.bg} text-white border-2 border-white shadow-xl transform transition-transform hover:scale-115">
          <div class="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              ${fac.category === "Pemerintahan" ? '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>' : ""}
              ${fac.category === "Kesehatan" ? '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>' : ""}
              ${fac.category === "Pendidikan" ? '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>' : ""}
              ${fac.category === "Ibadah" ? '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>' : ""}
              ${fac.category === "Ekonomi" ? '<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>' : ""}
            </svg>
          </div>
          <span class="absolute -z-10 inline-flex h-full w-full rounded-full ${colors.bg} opacity-25 animate-ping"></span>
        </div>
      `;

      const icon = L.divIcon({
        html: markerHtml,
        className: "custom-leaflet-marker",
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      if (mapRef.current) {
        const popupContent = `
          <div style="font-family: Inter, sans-serif; padding: 4px; max-width: 230px;">
            <div style="font-size: 9px; font-weight: bold; text-transform: uppercase; color: ${colors.hex}; font-family: monospace;">
              ${fac.category} ${fac.status ? `• ${fac.status}` : ""}
            </div>
            <h5 style="font-size: 13px; font-weight: bold; margin: 4px 0 3px 0; color: #0f172a;">
              ${fac.name}
            </h5>
            ${fac.npsn ? `<div style="font-size: 10px; font-weight: bold; color: #78350f; background: #fef3c7; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-bottom: 6px;">NPSN: ${fac.npsn}</div>` : ""}
            <p style="font-size: 11px; color: #64748b; margin: 0 0 8px 0; line-height: 1.4;">
              ${fac.address}
            </p>
            <a href="${fac.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${fac.coordinates[0]},${fac.coordinates[1]}`}" 
               target="_blank" 
               rel="noopener noreferrer" 
               style="display: inline-block; font-size: 10px; font-weight: bold; color: #ffffff; background-color: #0F766E; padding: 5px 10px; border-radius: 8px; text-decoration: none;">
              Buka Google Maps
            </a>
          </div>
        `;

        const marker = L.marker(fac.coordinates, { icon })
          .addTo(mapRef.current)
          .bindPopup(popupContent)
          .on("click", () => {
            setSelectedFacility(fac);
            if (mapRef.current) {
              mapRef.current.setView(fac.coordinates, 16, { animate: true });
            }
          });
        markersRef.current.push(marker);
      }
    });
  }, [activeFilter, mapRef.current]);

  const handleFacilityCardClick = (fac: PublicFacility) => {
    setSelectedFacility(fac);
    if (mapRef.current) {
      mapRef.current.setView(fac.coordinates, 16, { animate: true });
      mapContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="pt-[calc(var(--navbar-height)+3rem)] pb-16 bg-[#F8FAFC] space-y-12" id="map-section-container">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="GEOGRAFIS &amp; FASILITAS"
          title="Peta Administrasi &amp; Fasilitas Umum"
          description="Sistem Informasi Geografis Desa Tonjong. Ketuk penanda di peta atau gunakan filter di bawah untuk menemukan fasilitas umum desa."
          icon={<Compass size={14} />}
        />

        {/* Filters */}
        <motion.div 
          {...fadeInUp(0.05)}
          className="flex flex-wrap items-center justify-center gap-2.5" 
          id="map-filters"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`inline-flex items-center space-x-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeFilter === cat
                  ? "bg-[#0F766E] text-white shadow-md shadow-teal-900/20 border border-teal-500/30"
                  : "bg-white/80 text-slate-700 hover:bg-slate-100 border border-slate-200/80 backdrop-blur-md"
              }`}
            >
              {cat !== "Semua" && <span className="mr-0.5">{getCategoryIcon(cat, 14)}</span>}
              <span>{cat}</span>
            </button>
          ))}
        </motion.div>

        {/* Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel: Facilities List */}
          <motion.div 
            {...fadeInUp(0.1)}
            className="lg:col-span-4 space-y-4 max-h-[520px] overflow-y-auto pr-1"
          >
            <h3 className="font-sans text-xs uppercase tracking-widest font-mono font-bold text-slate-900 flex items-center space-x-2">
              <ShieldCheck className="text-[#0F766E] h-4.5 w-4.5" />
              <span>Daftar Fasilitas ({activeFilter})</span>
            </h3>

            <div className="space-y-3">
              {publicFacilities
                .filter(f => activeFilter === "Semua" || f.category === activeFilter)
                .map((fac) => {
                  const isSelected = selectedFacility?.id === fac.id;
                  const colors = getCategoryColors(fac.category);
                  return (
                    <GlassCard
                      key={fac.id}
                      onClick={() => handleFacilityCardClick(fac)}
                      hoverEffect={false}
                      className={`p-4 cursor-pointer text-left transition-all border ${
                        isSelected
                          ? "bg-emerald-50/80 border-[#0F766E] ring-2 ring-emerald-200/50 shadow-md"
                          : "bg-white/70 hover:bg-white border-slate-200/80"
                      }`}
                    >
                      <div className="flex items-start space-x-3.5">
                        <div className={`rounded-xl p-2.5 ${colors.bg} text-white flex-shrink-0 shadow-xs`}>
                          {getCategoryIcon(fac.category, 16)}
                        </div>
                        <div className="space-y-1.5 w-full">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className={`font-mono text-[9px] uppercase font-bold ${colors.text} tracking-wider`}>
                              {fac.category}
                            </span>
                            {fac.status && (
                              <span className="text-[8px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded-md border border-blue-200">
                                {fac.status}
                              </span>
                            )}
                            {fac.npsn && (
                              <span className="text-[8px] font-bold uppercase tracking-wider bg-amber-50 text-amber-900 px-1.5 py-0.5 rounded-md border border-amber-200 font-mono">
                                NPSN: {fac.npsn}
                              </span>
                            )}
                          </div>
                          <h4 className="font-sans text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                            {fac.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 font-sans leading-relaxed line-clamp-1">
                            {fac.address}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  );
                })}
            </div>
          </motion.div>

          {/* Right Panel: The Leaflet Map Container & Detail Overlay */}
          <motion.div 
            {...fadeInUp(0.15)}
            className="lg:col-span-8 flex flex-col space-y-4"
          >
            
            <GlassCard hoverEffect={false} className="p-2 overflow-hidden">
              {mapError ? (
                <div className="h-[420px] flex items-center justify-center bg-slate-50 text-slate-500 font-sans text-center px-4 rounded-2xl">
                  <div>
                    <Info size={36} className="mx-auto text-rose-500 mb-2" />
                    <p className="text-sm font-bold">{mapError}</p>
                    <p className="text-xs text-slate-400 mt-1">Gunakan peta manual atau muat ulang halaman.</p>
                  </div>
                </div>
              ) : (
                <div 
                  ref={mapContainerRef} 
                  className="h-[420px] w-full z-10 rounded-2xl" 
                  style={{ minHeight: "380px" }}
                />
              )}
            </GlassCard>

            {/* Bottom Panel: Expanded Facility Detail when Marker is selected */}
            {selectedFacility && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <GlassCard className="p-6 space-y-3 bg-gradient-to-r from-emerald-50/60 via-white to-emerald-50/60 border-emerald-200/80">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="emerald">
                      {selectedFacility.category}
                    </Badge>
                    {selectedFacility.status && (
                      <Badge variant="blue">
                        Status: {selectedFacility.status}
                      </Badge>
                    )}
                    {selectedFacility.npsn && (
                      <Badge variant="amber">
                        NPSN: {selectedFacility.npsn}
                      </Badge>
                    )}
                    <span className="font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wider ml-auto">
                      TATA KOORDINAT: {selectedFacility.coordinates.join(", ")}
                    </span>
                  </div>
                  
                  <h4 className="font-sans text-base sm:text-lg font-bold text-slate-900">
                    {selectedFacility.name}
                  </h4>
                  
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                    {selectedFacility.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                    <p className="text-slate-500 text-xs font-sans">
                      <strong>Alamat:</strong> {selectedFacility.address}
                    </p>
                    
                    <a 
                      href={selectedFacility.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${selectedFacility.coordinates[0]},${selectedFacility.coordinates[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <AppleButton variant="primary" size="sm" icon={<MapPin size={13} />}>
                        Buka di Google Maps
                        <ExternalLink size={12} className="ml-1 opacity-80" />
                      </AppleButton>
                    </a>
                  </div>
                </GlassCard>
              </motion.div>
            )}

          </motion.div>

        </div>
      </div>
    </div>
  );
}

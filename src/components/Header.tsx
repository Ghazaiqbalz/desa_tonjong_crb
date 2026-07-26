import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  Map, 
  PieChart, 
  Users, 
  PhoneCall, 
  ShieldCheck, 
  Home
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigationItems = [
    { id: "beranda", label: "Beranda", icon: Home },
    { id: "profil", label: "Profil Desa", icon: Users },
    { id: "visimisi", label: "Visi & Misi", icon: ShieldCheck },
    { id: "peta", label: "Peta Wilayah", icon: Map },
    { id: "anggaran", label: "APBDDes", icon: PieChart },
    { id: "kontak", label: "Kontak", icon: PhoneCall },
  ];

  // Hide header on scroll down, show on scroll up
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 40) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-7xl transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-28"
      }`}
    >
      <div className="relative rounded-full bg-white/75 dark:bg-[#042F2E]/85 backdrop-blur-2xl border border-white/60 dark:border-emerald-500/20 shadow-[0_10px_40px_rgba(0,0,0,0.08)] px-4 py-2.5 sm:px-6 sm:py-3 transition-all duration-300">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div
            onClick={() => handleNavClick("beranda")}
            className="flex cursor-pointer items-center space-x-3 group"
            id="brand-logo-container"
          >
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 border border-slate-200/80 p-1 shadow-sm"
            >
              <img
                src="/assets/logo.png"
                alt="Logo Desa Tonjong"
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1599305445671-ac291c95aba9?auto=format&fit=crop&q=80&w=128";
                }}
              />
            </motion.div>
            
            <div className="flex flex-col">
              <span className="font-sans text-xs sm:text-sm font-extrabold tracking-wider text-slate-900 dark:text-white uppercase leading-none group-hover:text-[#0F766E] transition-colors">
                DESA TONJONG
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#0F766E] dark:text-emerald-400 font-bold mt-0.5">
                Kec. Pasaleman • Kab. Cirebon
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-1" id="desktop-nav">
            {navigationItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center space-x-1.5 px-3.5 py-2 text-[11px] uppercase tracking-wider font-bold transition-all duration-200 rounded-full cursor-pointer ${
                    isActive
                      ? "text-emerald-950 dark:text-white"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-[#0F766E] dark:text-emerald-400" : "opacity-70"} />
                  <span className="z-10">{item.label}</span>

                  {/* Active tab pill background highlight */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 rounded-full bg-emerald-50 dark:bg-emerald-900/60 border border-emerald-200/80 dark:border-emerald-500/40 shadow-xs -z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action / Mobile Trigger */}
          <div className="flex items-center space-x-3">

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-btn"
              className="inline-flex items-center justify-center rounded-full p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-emerald-900/40 focus:outline-none lg:hidden"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Buka menu navigasi</span>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-2 rounded-3xl bg-white/90 dark:bg-[#042F2E]/95 backdrop-blur-2xl border border-white/60 dark:border-emerald-500/20 shadow-2xl p-4 lg:hidden"
            id="mobile-menu"
          >
            <div className="grid grid-cols-1 gap-1">
              {navigationItems.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    id={`nav-mobile-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center space-x-3 w-full rounded-2xl px-4 py-3 text-left text-xs uppercase tracking-wider font-bold transition-all ${
                      isActive
                        ? "bg-[#0F766E] text-white shadow-md"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-emerald-900/40"
                    }`}
                  >
                    <Icon size={16} className={isActive ? "text-emerald-300" : "text-slate-400"} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

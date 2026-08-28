"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import RoseNavbar from "@/components/RoseNavbar";

// --- ESEMÉNY ADATOK (FIXEN MŰKÖDŐ UNPLASH KÉPEKKEL) ---
const EVENTS = [
  {
    title: "Deep House & Cocktails",
    year: "2026",
    month: "AUG",
    day: "14",
    desc: "Indítsa a hétvégét a város legjobb lemezlovasaival és limitált kiadású nyári koktéljainkkal a pultnál.",
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Ladies Night",
    year: "2026",
    month: "AUG",
    day: "21",
    desc: "Exkluzív este hölgyeknek. Minden Signature Rose koktél mellé ajándék desszert meze válogatással kedveskedünk.",
    img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Guest Bartender: Luigi Rossi",
    year: "2026",
    month: "AUG",
    day: "28",
    desc: "Olaszország egyik legnevesebb mixere érkezik hozzánk egyetlen estére, egyedi itallappal és flair show-val.",
    img: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "End of Summer Party",
    year: "2026",
    month: "SZEP",
    day: "04",
    desc: "Búcsúztassuk együtt a nyarat egy hatalmas bulival, élő DJ szettel és prémium pezsgő kóstolóval.",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000&auto=format&fit=crop"
  }
];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
};

const fadeUpReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function RoseEventsPage() {
  const [activeEvent, setActiveEvent] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // --- PRELOADER: Inicializálás ---
  useEffect(() => {
    if (typeof window !== "undefined" && window.history && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // --- PRELOADER: JS alapú görgetés blokkolás ---
  useEffect(() => {
    if (!isLoading) return;

    const preventDefault = (e: any) => e.preventDefault();
    const preventDefaultForScrollKeys = (e: any) => {
      if (["Space", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(e.code)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });
    window.addEventListener('keydown', preventDefaultForScrollKeys, { passive: false });

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('touchmove', preventDefault);
      window.removeEventListener('keydown', preventDefaultForScrollKeys);
      clearTimeout(timer);
    };
  }, [isLoading]);

  // Automatikus esemény léptetés
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % EVENTS.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const nextEvent = () => setActiveEvent((prev) => (prev + 1) % EVENTS.length);
  const prevEvent = () => setActiveEvent((prev) => (prev - 1 + EVENTS.length) % EVENTS.length);

  return (
    // Teljes képernyő (100dvh), görgetés letiltva (overflow-hidden)
    <div className="h-[100dvh] w-screen overflow-hidden bg-[#050505] text-white relative flex flex-col selection:bg-[#E7918A]">
      
         <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Work+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <style dangerouslySetInnerHTML={{
        __html: `
        html { overflow-y: scroll; scroll-behavior: smooth; background-color: #050505; }
        * { -webkit-font-smoothing: antialiased; }
        body, p, a, button, li, span, div, .font-sans { font-family: 'Work Sans', sans-serif !important; }
        h1, h2, h3, h4, h5, h6, .font-serif { font-family: 'Cormorant', serif !important; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .noise-bg::before {
          content: "";
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          background-image: url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E');
          opacity: 0.03;
          pointer-events: none;
          z-index: 9996;
        }
      `}} />

      <div className="noise-bg"></div>
      {/* --- PRELOADER SÖTÉT HÁTTÉR --- */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader-bg"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9997] bg-[#050505]"
          />
        )}
      </AnimatePresence>

      {/* --- PRELOADER LOGÓ (A Varázslat) --- */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader-logo"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 1 }} // Azért marad 1, mert a layoutId repíti a helyére!
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none"
          >
            {/* Itt a layoutId="rose-main-logo"! Amikor az isLoading hamis lesz, a Framer Motion 
                felrepíti ezt az elemet a Navbarba! */}
            <motion.div
              layoutId="rose-main-logo"
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-[200px] h-[100px] md:w-[320px] md:h-[150px] flex items-center justify-center"
            >
              <img src="/rose-home.png" alt="Rose" className="w-full h-full object-contain scale-[1.3] md:scale-[1.45] drop-shadow-[0_0_20px_rgba(231,145,138,0.3)]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(20px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }} transition={{ duration: 0.4 }} className="fixed inset-0 z-[100] bg-[#050505]/95 flex flex-col items-center justify-center">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" exit="hidden" className="flex flex-col items-center gap-8">
              {[
                { label: "Főoldal", href: "/hu" },
                { label: "Események", href: "/hu/events" },
                { label: "Itallap", href: "/hu/menu" }
              ].map((item, idx) => (
                <motion.a key={idx} variants={fadeUpReveal} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif text-white hover:text-[#E7918A] hover:drop-shadow-[0_0_15px_rgba(231,145,138,0.5)] transition-all uppercase tracking-widest">
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- NAVBAR: Görgetés tiltva, a nagy logó állandóan aktív! --- */}
{/* --- NAVBAR: Görgetés tiltva, a nagy logó állandóan aktív! --- */}
      <RoseNavbar 
        isScrolled={false} 
        isLoading={isLoading} // <--- EZT AZ EGYET KELLETT KICSERÉLNI!
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        activePath="/hu/events"
      />

      {/* --- HÁTTÉRKÉP KONTÉNER --- */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeEvent}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            src={EVENTS[activeEvent].img}
            className="absolute inset-0 w-full h-full object-cover origin-center opacity-80"
            alt="Esemény háttér"
          />
        </AnimatePresence>
        {/* Átmenetek: Sötétebb, hogy a szöveg olvasható maradjon */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/60 to-[#050505]/20 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-[#050505]/40 to-transparent z-0"></div>
      </div>

      {/* --- FŐ TARTALOM (100dvh-ba szorítva) --- */}
      <div className="relative z-10 flex-1 flex flex-col justify-between px-6 lg:px-12 max-w-[90rem] mx-auto w-full pt-[140px] md:pt-[180px] pb-6 md:pb-8">
        
        {/* Felső Aktív Esemény Rész */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.h4 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-[#E7918A] font-sans text-[11px] md:text-[13px] font-bold uppercase tracking-[0.25em] mb-4 md:mb-5 drop-shadow-[0_0_8px_rgba(231,145,138,0.4)]">
            Exkluzív Események
          </motion.h4>
          <div className="flex flex-col w-full">
            <AnimatePresence mode="wait">
              <motion.div key={activeEvent} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-4 md:mb-6">
                    <div className="bg-[#E7918A] text-white flex flex-col items-center justify-center w-[80px] h-[80px] md:w-[110px] md:h-[110px] shadow-[0_0_30px_rgba(231,145,138,0.4)] flex-shrink-0 rounded-sm">
                      <span className="text-[10px] md:text-[12px] uppercase font-bold tracking-widest opacity-90 mb-1">{EVENTS[activeEvent].year}</span>
                      <span className="text-3xl md:text-5xl font-serif font-bold leading-none mb-1">{EVENTS[activeEvent].day}</span>
                      <span className="text-[10px] md:text-[12px] uppercase font-bold tracking-[0.25em]">{EVENTS[activeEvent].month}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white leading-[1.1] tracking-tight drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                      {EVENTS[activeEvent].title}
                    </h2>
                </div>
                <p className="text-white/90 leading-relaxed font-sans text-[14px] md:text-[16px] max-w-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] line-clamp-3 md:line-clamp-none">
                  {EVENTS[activeEvent].desc}
                </p>
                <div className="flex gap-4 mt-6">
                    <button onClick={prevEvent} className="w-12 h-12 bg-transparent backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-[#E7918A] hover:border-[#E7918A] hover:shadow-[0_0_20px_rgba(231,145,138,0.5)] transition-all duration-300">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button onClick={nextEvent} className="w-12 h-12 bg-transparent backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-[#E7918A] hover:border-[#E7918A] hover:shadow-[0_0_20px_rgba(231,145,138,0.5)] transition-all duration-300">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* --- PREMIUM KÁRTYÁK ALUL --- */}
        <div className="flex-none pt-6 mt-6 w-full overflow-x-auto overflow-y-hidden hide-scrollbar">
          <div className="flex flex-row md:grid md:grid-cols-4 gap-4 w-max md:w-full pb-2">
            {EVENTS.map((evt, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveEvent(idx)}
                  className={`group relative p-5 md:p-6 bg-[#111111]/80 backdrop-blur-md rounded-sm border transition-all duration-500 flex flex-col items-start text-left min-w-[260px] md:min-w-0 w-full overflow-hidden
                  ${activeEvent === idx 
                      ? 'border-white/20 shadow-[0_15px_30px_rgba(231,145,138,0.15)] -translate-y-1' 
                      : 'border-white/5 opacity-50 hover:opacity-100 hover:border-white/10'}`}
                >
                  <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#E7918A]/60 to-transparent transition-transform duration-700 ${activeEvent === idx ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></div>
                  
                  <span className={`text-[10px] md:text-[12px] uppercase tracking-[0.2em] font-bold mb-2 transition-colors ${activeEvent === idx ? 'text-[#E7918A]' : 'text-white/70 group-hover:text-white'}`}>
                    {evt.year}. {evt.month} {evt.day}.
                  </span>
                  <span className="text-[16px] md:text-[18px] font-serif text-white leading-tight">
                    {evt.title}
                  </span>
                </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
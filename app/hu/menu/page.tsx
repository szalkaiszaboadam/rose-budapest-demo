"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, Variants } from "framer-motion";
import RoseNavbar from "@/components/RoseNavbar";

// --- ÁTMENETI MOCK ADATOK (1-7.jpg képeket használva) ---
const MENU_ITEMS = [
  { id: 1, name: "Rose Signature", desc: "Prémium gin, rózsavíz, friss málna, citrusok", price: "4 500 Ft", img: "/1.jpg" },
  { id: 2, name: "Smoked Negroni", desc: "Campari, gin, édes vermut, tölgyfa füst", price: "4 200 Ft", img: "/2.jpg" },
  { id: 3, name: "Truffle Labneh", desc: "Szarvasgombás krémsajt, pirított pisztácia", price: "3 800 Ft", img: "/3.jpg" },
  { id: 4, name: "Spicy Margarita", desc: "Tequila, jalapeño, lime, sós-fűszeres perem", price: "3 900 Ft", img: "/4.jpg" },
  { id: 5, name: "Bosphorus Breeze", desc: "Vodka, uborka, menta, bodza, szóda", price: "3 800 Ft", img: "/5.jpg" },
  { id: 6, name: "Kacsa Rillette", desc: "Lassan sült kacsahús, füge, ropogós pita", price: "4 600 Ft", img: "/6.jpg" },
  { id: 7, name: "Espresso Martini", desc: "Prémium vodka, kávélikőr, friss espresso", price: "4 100 Ft", img: "/7.jpg" },
  { id: 8, name: "Anatolian Sour", desc: "Bourbon, friss citrom, cukorszirup, tojásfehérje", price: "3 900 Ft", img: "/1.jpg" },
  { id: 9, name: "Pomegranate Spritz", desc: "Prosecco, gránátalma likőr, friss menta", price: "3 500 Ft", img: "/2.jpg" },
  { id: 10, name: "Oasis Mule", desc: "Gin, görögdinnye, gyömbérsör, lime", price: "3 700 Ft", img: "/3.jpg" },
  { id: 11, name: "Golden Baklava", desc: "Pisztáciás baklava, vanília fagylalt, méz", price: "2 900 Ft", img: "/4.jpg" },
  { id: 12, name: "Turkish Coffee", desc: "Hagyományos réz dzsezvában főzve, zaccos", price: "1 500 Ft", img: "/5.jpg" },
  { id: 13, name: "Basil Smash", desc: "Gin, friss bazsalikom, citromlé, cukorszirup", price: "3 600 Ft", img: "/6.jpg" },
  { id: 14, name: "Velvet Cloud", desc: "Fehér rum, kókuszvíz, ananász, yuzu", price: "3 900 Ft", img: "/7.jpg" },
  { id: 15, name: "Meze Válogatás", desc: "Hummusz, muhammara, padlizsánkrém, pita", price: "5 200 Ft", img: "/1.jpg" },
];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
};

const fadeUpReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function RoseMenuPage() {
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

  const [isScrolled, setIsScrolled] = useState(false);
  
  // Kurzort követő kép állapota
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  // Framer Motion fizika az egér pozíciójának lekéréséhez (vajpuha követés)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Görgetés figyelése a navbarhoz
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Egér mozgásának követése a teljes képernyőn
  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div 
      className="min-h-screen w-full bg-[#050505] text-white relative flex flex-col selection:bg-[#E7918A]"
      onMouseMove={handleMouseMove}
    >
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

      {/* --- PARALLAX HÁTTÉR GÖMBÖK --- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[-15%] w-[40vw] h-[40vw] rounded-full bg-[#E7918A]/15 blur-[120px]" />
        <div className="absolute top-[60%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#E7918A]/10 blur-[150px]" />
      </div>

      {/* --- KÖVETŐ (FLOATING) KÉP --- */}
      <motion.div
        // A teljes konténer láthatatlanná válik (opacity: 0), amikor nincs hoveredImage!
        animate={{ opacity: hoveredImage ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "20px", 
          translateY: "20px"
        }}
        className="fixed top-0 left-0 w-[240px] md:w-[320px] aspect-[4/3] pointer-events-none z-[110] overflow-hidden rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-white/10"
      >
        <AnimatePresence mode="wait">
          {hoveredImage && (
            <motion.img
              key={hoveredImage}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              src={hoveredImage}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Hovered drink"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* --- MOBIL MENÜ --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-[#050505]/95 flex flex-col items-center justify-center"
          >
            <motion.div initial="hidden" animate="visible" exit="hidden" className="flex flex-col items-center gap-8">
              {[
                { label: "Főoldal", href: "/hu" },
                { label: "Események", href: "/hu/events" },
                { label: "Itallap", href: "/hu/menu" }
              ].map((item, idx) => (
                <motion.a 
                  key={idx}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-serif text-white hover:text-[#E7918A] hover:drop-shadow-[0_0_15px_rgba(231,145,138,0.5)] transition-all uppercase tracking-widest"
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- NAVBAR --- */}
      <RoseNavbar 
        isScrolled={isScrolled} 
        isLoading={isLoading}
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        activePath="/hu/menu"
      />

      {/* --- ITALLAP TARTALOM --- */}
      <div className="relative z-10 flex-grow flex flex-col items-center px-6 lg:px-12 pt-[160px] md:pt-[220px] pb-32 max-w-[90rem] mx-auto w-full">
        
        {/* Fejléc */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h4 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-[#E7918A] font-sans text-[11px] md:text-[13px] font-bold uppercase tracking-[0.25em] mb-4 md:mb-5 drop-shadow-[0_0_8px_rgba(231,145,138,0.4)]"
          >
            Kínálatunk
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-serif text-white uppercase tracking-tight drop-shadow-md"
          >
            SIGNATURE ITALLAP
          </motion.h1>
        </div>

        {/* 3 Oszlopos Grid Lista */}
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 lg:gap-x-20 gap-y-6 w-full"
        >
          {MENU_ITEMS.map((item) => (
            <motion.div
              variants={fadeUpReveal}
              key={item.id}
              className="group relative py-4 flex flex-col cursor-crosshair border-b border-white/5 hover:border-[#E7918A]/50 transition-colors duration-500"
              onMouseEnter={() => setHoveredImage(item.img)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              {/* Név, Pontozott Vonal, Ár (Étlap stílus) */}
              <div className="flex justify-between items-baseline mb-2 w-full">
                <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-[#E7918A] transition-colors duration-500 whitespace-nowrap">
                  {item.name}
                </h3>
                {/* Klasszikus pontozott vonal (Leader line) */}
                <div className="flex-grow border-b-2 border-dotted border-white/10 mx-4 relative -top-[6px] group-hover:border-[#E7918A]/40 transition-colors duration-500"></div>
                <span className="text-[14px] md:text-[15px] font-sans tracking-widest text-[#E7918A] font-medium whitespace-nowrap">
                  {item.price}
                </span>
              </div>
              
              {/* Leírás */}
              <p className="text-[13px] md:text-[14px] font-sans text-white/50 group-hover:text-white/80 transition-colors duration-500 pr-12">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* --- KAPCSOLAT/CTA --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-32 text-center flex flex-col items-center"
        >
          <p className="text-white/50 font-sans text-[14px] mb-8 max-w-lg leading-relaxed">
            Áraink forintban értendők és tartalmazzák az áfát. A számla végösszegéhez 15% szervizdíjat számolunk fel.
          </p>
          <a href="https://www.sevenrooms.com/explore/rosemezecocktailbar/reservations/create/search/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-[#E7918A] text-white px-10 py-4 uppercase font-sans tracking-[0.2em] text-[11px] md:text-[12px] font-bold hover:bg-white hover:text-black transition-all duration-300 text-center shadow-[0_0_20px_rgba(231,145,138,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] rounded-sm min-w-[220px]">
            Asztalfoglalás
          </a>
        </motion.div>

      </div>
    </div>
  );
}
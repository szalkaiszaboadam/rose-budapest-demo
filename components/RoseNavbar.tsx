"use client";

import React from "react";
import { motion, Transition, AnimatePresence } from "framer-motion";

interface RoseNavbarProps {
  isScrolled?: boolean;
  isLoading?: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  activePath?: string;
  isSolidBg?: boolean;
}

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function RoseNavbar({ 
  isScrolled = false, 
  isLoading = false, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen,
  activePath = "/hu",
  isSolidBg = false
}: RoseNavbarProps) {

  const baseTransition: Transition = { duration: 0.8, ease: easing };
  const fadeTransition: Transition = { duration: 0.5, ease: "easeInOut" };
  const delayedTransition: Transition = { duration: 0.7, delay: isScrolled ? 0.3 : 0, ease: easing };

  return (
    <motion.nav 
      animate={{ 
        paddingTop: isScrolled ? "1rem" : "2.5rem",
        paddingBottom: isScrolled ? "1rem" : "0rem",
        backgroundColor: isSolidBg ? "rgba(17, 17, 17, 0.95)" : (isScrolled ? "rgba(17, 17, 17, 0.85)" : "rgba(5, 5, 5, 0)"),
        backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
        borderBottom: "none"
      }}
      transition={fadeTransition}
      className="fixed w-full top-0 z-50 pointer-events-none"
    >
      {/* SÖTÉT ÁTMENET FELÜL */}
      <motion.div 
        animate={{ opacity: isScrolled ? 0 : 1 }}
        transition={baseTransition}
        className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-transparent pointer-events-none" 
      />

      <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-12 flex justify-between items-center pointer-events-auto h-[48px] md:h-[60px]">

        {/* --- BAL MENÜ LINKEK --- */}
        <motion.div 
          animate={{ y: isScrolled ? 0 : 30 }}
          transition={baseTransition}
          className="hidden md:flex flex-1 justify-start space-x-8 lg:space-x-12 text-[13px] md:text-[14px] font-sans tracking-[0.15em] uppercase font-medium items-center"
        >
          <a href="/hu/menu" className={`${activePath === '/hu/menu' ? 'text-[#E7918A]' : 'text-white/90'} hover:text-[#E7918A] transition-all duration-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]`}>Itallap</a>
          <a href="/hu/events" className={`${activePath === '/hu/events' ? 'text-[#E7918A]' : 'text-white/90'} hover:text-[#E7918A] transition-all duration-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]`}>Események</a>
        </motion.div>

        {/* MOBIL GOMB */}
        <motion.div 
          animate={{ y: isScrolled ? 0 : 25 }}
          transition={baseTransition}
          className="flex-1 md:hidden flex justify-start items-center"
        >
           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="font-sans tracking-[0.2em] text-[11px] uppercase z-[100] transition-colors text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
             {isMobileMenuOpen ? "Bezár" : "Menü"}
           </button>
        </motion.div>

        {/* KÖZÉPSŐ LOGÓ KONTÉNER */}
        <div className="relative flex-none flex items-center justify-center w-[200px] md:w-[320px] h-full">
            
            {/* 1. VARÁZSLAT: A nagy logó csak a töltés UTÁN jelenik meg, és összekötjük a preloaderrel! */}
            <AnimatePresence>
              {!isLoading && (
                <motion.a 
                  href="/hu" 
                  layoutId="rose-main-logo" // <-- EZ KÖTI ÖSSZE A PRELOADERREL!
                  animate={{ 
                    y: isScrolled ? -120 : 0, 
                    opacity: isScrolled ? 0 : 1,
                    scale: isScrolled ? 0.9 : 1
                  }}
                  style={{ pointerEvents: isScrolled ? "none" : "auto" }}
                  transition={baseTransition}
                  className="absolute top-0 left-0 right-0 mx-auto mt-4 md:mt-8 flex items-center justify-center w-[200px] h-[100px] md:w-[320px] md:h-[150px]"
                >
                  <div className="relative w-full h-full flex items-center justify-center drop-shadow-[0_0_20px_rgba(231,145,138,0.3)]">
                    <img src="/rose-home.png" alt="Rose" className="absolute inset-0 w-full h-full object-contain scale-[1.3] md:scale-[1.45]" />
                  </div>
                </motion.a>
              )}
            </AnimatePresence>

            {/* KIS LOGÓ */}
            <motion.a 
              href="/hu" 
              initial={{ y: 20, opacity: 0, scale: 0.8 }}
              animate={{ 
                y: isScrolled ? 0 : 20, 
                opacity: isScrolled ? 1 : 0,
                scale: isScrolled ? 1 : 0.8
              }}
              style={{ pointerEvents: isScrolled ? "auto" : "none" }}
              transition={delayedTransition}
              className="absolute inset-0 m-auto flex items-center justify-center w-[40px] h-[40px] md:w-[48px] md:h-[48px]"
            >
               <img src="/rose-logo-logo-1.png" alt="Rose Icon" className="w-full h-full object-contain" />
            </motion.a>
        </div>

        {/* --- JOBB MENÜ LINKEK --- */}
        <motion.div 
          animate={{ y: isScrolled ? 0 : 30 }}
          transition={baseTransition}
          className="hidden md:flex flex-1 justify-end space-x-8 lg:space-x-12 text-[13px] md:text-[14px] font-sans tracking-[0.15em] uppercase font-medium items-center"
        >
          <a href="/hu#reviews" className="text-white/90 hover:text-[#E7918A] transition-all duration-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">Vélemények</a>
          <a href="/hu#reservation" className="text-white/90 hover:text-[#E7918A] transition-all duration-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">Kapcsolat</a>
        </motion.div>

        <div className="md:hidden flex-1"></div>

      </div>
    </motion.nav>
  );
}
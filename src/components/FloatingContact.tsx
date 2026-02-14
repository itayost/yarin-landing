"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 z-40 flex flex-col-reverse items-center gap-3"
        >
          {/* Main FAB */}
          <button
            onClick={() => setOpen(!open)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
              open
                ? "bg-white/10 backdrop-blur-xl border border-white/10"
                : "bg-whatsapp hover:bg-[#20BD5A] shadow-[0_0_30px_rgba(37,211,102,0.3)]"
            }`}
            aria-label="אפשרויות יצירת קשר"
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageCircle className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Options */}
          <AnimatePresence>
            {open && (
              <>
                <motion.a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0, y: 20 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                  className="w-12 h-12 rounded-full bg-whatsapp flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </motion.a>
                <motion.a
                  href={CONTACT.phoneTel}
                  initial={{ scale: 0, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0, y: 20 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  aria-label="טלפון"
                >
                  <Phone className="w-5 h-5 text-white" />
                </motion.a>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

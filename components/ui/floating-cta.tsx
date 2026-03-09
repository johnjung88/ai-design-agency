"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.95 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed bottom-5 right-4 z-50 sm:bottom-7 sm:right-7"
        >
          <Link
            href="https://open.kakao.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-primary/45 bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
          >
            <MessageCircle className="size-4" />
            카카오톡 상담
          </Link>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

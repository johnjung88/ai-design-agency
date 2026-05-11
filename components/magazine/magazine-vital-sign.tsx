"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

/** Count-up that triggers when in view */
function CountUp({
  to,
  duration = 2.2,
  suffix = "",
}: {
  to: number;
  duration?: number;
  suffix?: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (n) => Math.round(n).toString());
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, {
        duration,
        ease: [0.16, 1, 0.3, 1],
      });
      return () => controls.stop();
    }
  }, [inView, to, count, duration]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function MagazineVitalSign() {
  return (
    <div
      className="w-full max-w-[1100px] mx-auto mb-[72px] rounded-[4px] overflow-hidden relative"
      style={{
        aspectRatio: "21/9",
        boxShadow:
          "0 30px 80px rgba(26,22,20,0.22), 0 0 0 1px rgba(26,22,20,0.14)",
        background:
          "radial-gradient(ellipse 80% 90% at 50% 60%, var(--tone-magazine-graph-bg-1) 0%, var(--tone-magazine-graph-bg-2) 60%, var(--tone-magazine-graph-bg-3) 100%)",
      }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,240,232,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.45,
        }}
      />

      {/* Light sweep */}
      <motion.div
        className="absolute inset-y-0 pointer-events-none"
        style={{
          width: "30%",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(232,184,154,0.06) 50%, transparent 100%)",
        }}
        initial={{ x: "-100%" }}
        animate={{ x: "400%" }}
        transition={{
          duration: 6,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 4,
        }}
      />

      {/* Floating dust particles */}
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 2,
            height: 2,
            background: "rgba(232,184,154,0.4)",
            left: `${(i * 13 + 7) % 90 + 5}%`,
            top: `${(i * 19 + 11) % 70 + 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Top label row */}
      <div className="absolute top-4 md:top-7 left-4 md:left-9 right-4 md:right-9 flex justify-between items-center z-[3]">
        <span
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "clamp(9px, 0.9vw, 11px)",
            color: "rgba(245,240,232,0.55)",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
          }}
        >
          — 16개월 누적 기록
        </span>
        <span
          className="flex items-center gap-[7px] px-2.5 py-1 rounded-[2px]"
          style={{
            background: "var(--tone-magazine-red)",
            fontFamily: "var(--font-jetbrains)",
            fontSize: "clamp(8px, 0.75vw, 9px)",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--tone-magazine-paper)",
          }}
        >
          <span className="w-[5px] h-[5px] rounded-full bg-white animate-dot-pulse-mag inline-block" />
          Live · May 26
        </span>
      </div>

      {/* Curve graph — background decoration */}
      <div className="absolute left-0 right-0 z-[1]" style={{ top: 60, bottom: 60 }}>
        <svg
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            <linearGradient id="vs-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(232,184,154,0.35)" />
              <stop offset="100%" stopColor="rgba(232,184,154,0)" />
            </linearGradient>
            <filter id="vs-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Horizontal grid lines */}
          {[80, 160, 240, 320].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="1200"
              y2={y}
              stroke="rgba(245,240,232,0.05)"
              strokeDasharray="2 5"
            />
          ))}
          {/* Area fill */}
          <path
            d="M 0 360 C 100 340, 200 310, 350 270 C 500 220, 650 160, 850 100 C 1000 50, 1100 25, 1200 12 L 1200 400 L 0 400 Z"
            fill="url(#vs-fill)"
            style={{
              opacity: 0,
              animation: "curveDrawMag 1.6s ease-out 2.6s both",
            }}
          />
          {/* Main growth line */}
          <path
            d="M 0 360 C 100 340, 200 310, 350 270 C 500 220, 650 160, 850 100 C 1000 50, 1100 25, 1200 12"
            fill="none"
            style={{
              stroke: "var(--tone-magazine-graph-line)",
              filter: "url(#vs-glow)",
            }}
            strokeWidth="2.2"
            strokeDasharray="2400"
            strokeDashoffset="2400"
            className="animate-curve-draw-mag"
          />
          {/* Secondary trail line (faded, slower) */}
          <path
            d="M 0 370 C 120 355, 240 330, 380 295 C 520 260, 660 210, 870 145 C 1020 95, 1110 55, 1200 32"
            fill="none"
            stroke="rgba(232,184,154,0.25)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          {/* Final pulse marker */}
          <circle
            cx="1196"
            cy="14"
            r="18"
            fill="var(--tone-magazine-red)"
            opacity="0.28"
            className="animate-pulse-ring-mag"
            style={{ transformOrigin: "1196px 14px" }}
          />
          <circle cx="1196" cy="14" r="5" fill="var(--tone-magazine-red)" />
          <circle
            cx="1196"
            cy="14"
            r="2"
            fill="var(--tone-magazine-paper)"
          />
        </svg>
      </div>

      {/* CENTER: hero stats overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-[4] px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex items-baseline gap-4 md:gap-14"
        >
          {/* 142 */}
          <div className="text-center">
            <div
              style={{
                fontFamily: "var(--font-marcellus)",
                fontSize: "clamp(44px, 9vw, 132px)",
                lineHeight: 0.92,
                color: "var(--tone-magazine-paper)",
                letterSpacing: "-0.025em",
              }}
            >
              <CountUp to={142} duration={2.2} />
            </div>
            <div
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "clamp(8.5px, 0.95vw, 11px)",
                color: "rgba(245,240,232,0.55)",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                marginTop: 10,
              }}
            >
              누적 의뢰
            </div>
          </div>

          {/* divider */}
          <span
            className="hidden md:inline-block"
            style={{
              width: 1,
              height: 72,
              background:
                "linear-gradient(180deg, transparent 0%, rgba(245,240,232,0.18) 50%, transparent 100%)",
            }}
          />

          {/* 98% */}
          <div className="text-center">
            <div
              style={{
                fontFamily: "var(--font-marcellus)",
                fontSize: "clamp(44px, 9vw, 132px)",
                lineHeight: 0.92,
                color: "var(--tone-magazine-graph-line)",
                letterSpacing: "-0.025em",
              }}
            >
              <CountUp to={98} duration={2.4} suffix="%" />
            </div>
            <div
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "clamp(8.5px, 0.95vw, 11px)",
                color: "rgba(245,240,232,0.55)",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                marginTop: 10,
              }}
            >
              재의뢰율
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom timeline */}
      <div className="absolute bottom-4 md:bottom-7 left-4 md:left-9 right-4 md:right-9 flex justify-between items-center z-[3]">
        {[
          { label: "JAN 25", active: false },
          { label: "SEP 25", active: false },
          { label: "JAN 26", active: false },
          { label: "● MAY 26 NOW", active: true },
        ].map((t) => (
          <span
            key={t.label}
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "clamp(8.5px, 0.85vw, 10.5px)",
              color: t.active
                ? "var(--tone-magazine-graph-line)"
                : "rgba(245,240,232,0.42)",
              letterSpacing: "0.2em",
            }}
          >
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}

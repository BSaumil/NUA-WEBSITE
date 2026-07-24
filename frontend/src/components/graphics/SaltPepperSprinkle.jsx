import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

function ShakerIcon({ variant }) {
  const isSalt = variant === "salt";
  const body = isSalt ? "#f6f3ea" : "#2b2420";
  const bodyEdge = isSalt ? "#d9d4c4" : "#151110";
  const cap = isSalt ? "#e7e2d4" : "#100d0c";
  const holeColor = isSalt ? "#00000030" : "#ffffff2a";
  return (
    <svg width="26" height="36" viewBox="0 0 26 36" fill="none" className="drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]">
      <rect x="5" y="9" width="16" height="24" rx="6" fill={body} stroke={bodyEdge} strokeWidth="1" />
      <rect x="8" y="1.5" width="10" height="8.5" rx="2.5" fill={cap} />
      <circle cx="11" cy="5" r="0.7" fill={holeColor} />
      <circle cx="14" cy="4.3" r="0.7" fill={holeColor} />
      <circle cx="16.5" cy="5.4" r="0.7" fill={holeColor} />
      <circle cx="12.5" cy="6.6" r="0.7" fill={holeColor} />
      <text x="13" y="24" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="Bricolage Grotesque, system-ui, sans-serif" fill={isSalt ? "#8a8471" : "#6b6560"}>
        {isSalt ? "S" : "P"}
      </text>
    </svg>
  );
}

export default function SaltPepperSprinkle() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const saltRef = useRef(null);
  const pepperRef = useRef(null);
  const particlesRef = useRef([]);
  const hoverRef = useRef({ salt: false, pepper: false });
  const reduceMotion = useReducedMotion();
  const [hintVisible, setHintVisible] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setHintVisible(false), 6000);
    return () => clearTimeout(id);
  }, []);

  const spawnFrom = useCallback((shakerEl, type, count) => {
    const container = containerRef.current;
    if (!container || !shakerEl) return;
    const cRect = container.getBoundingClientRect();
    const sRect = shakerEl.getBoundingClientRect();
    const originX = sRect.left - cRect.left + sRect.width / 2;
    const originY = sRect.top - cRect.top + sRect.height - 4;

    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x: originX + (Math.random() - 0.5) * 10,
        y: originY + Math.random() * 4,
        vx: (Math.random() - 0.5) * 0.5,
        vy: Math.random() * 0.3,
        r: type === "salt" ? 1 + Math.random() * 1.1 : 1 + Math.random() * 1.5,
        type,
        color: type === "salt" ? "#f8f6ef" : "#5a4f42",
        rim: type === "salt" ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.4)",
        life: 0,
        maxLife: 2200 + Math.random() * 600,
        landed: false,
        landTime: 0,
      });
    }
    if (particlesRef.current.length > 260) {
      particlesRef.current.splice(0, particlesRef.current.length - 260);
    }
  }, []);

  const handleClick = useCallback((type) => {
    setHintVisible(false);
    const el = type === "salt" ? saltRef.current : pepperRef.current;
    spawnFrom(el, type, 36);
  }, [spawnFrom]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let last = performance.now();
    let raf;

    const tick = (now) => {
      const dt = Math.min(now - last, 40);
      last = now;
      ctx.clearRect(0, 0, width, height);
      const floor = height * 0.96;

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life += dt;
        if (!p.landed) {
          p.vy += 0.0009 * dt;
          p.x += p.vx * dt * 0.06;
          p.y += p.vy * dt * 0.06;
          if (p.y >= floor) {
            p.y = floor;
            p.landed = true;
            p.landTime = p.life;
          }
        }
        const settleFade = p.landed ? Math.max(0, 1 - (p.life - p.landTime) / 1100) : 1;
        const fadeIn = Math.min(1, p.life / 100);
        const alpha = fadeIn * settleFade;
        if (alpha <= 0.015 || p.life > p.maxLife) return false;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = p.rim;
        ctx.stroke();
        return true;
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      if (hoverRef.current.salt) spawnFrom(saltRef.current, "salt", 2);
      if (hoverRef.current.pepper) spawnFrom(pepperRef.current, "pepper", 2);
    }, 70);
    return () => clearInterval(id);
  }, [spawnFrom, reduceMotion]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-20" data-testid="salt-pepper-sprinkle">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {hintVisible && !reduceMotion && (
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="pointer-events-none absolute -top-2 right-16 sm:right-24 font-mono text-[10px] text-[#a1a1aa] whitespace-nowrap"
        >
          season to taste ✦
        </motion.span>
      )}

      <motion.button
        ref={saltRef}
        type="button"
        aria-label="Sprinkle salt"
        data-testid="salt-shaker-btn"
        className="pointer-events-auto absolute -top-4 right-16 sm:right-24"
        onMouseEnter={() => { hoverRef.current.salt = true; setHintVisible(false); }}
        onMouseLeave={() => { hoverRef.current.salt = false; }}
        onClick={() => handleClick("salt")}
        animate={reduceMotion ? undefined : { rotate: [-7, 7, -7] }}
        transition={reduceMotion ? undefined : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ rotate: 26, transition: { duration: 0.25 } }}
        whileTap={{ rotate: 42, scale: 1.08 }}
      >
        <ShakerIcon variant="salt" />
      </motion.button>

      <motion.button
        ref={pepperRef}
        type="button"
        aria-label="Sprinkle pepper"
        data-testid="pepper-shaker-btn"
        className="pointer-events-auto absolute -top-4 right-6 sm:right-8"
        onMouseEnter={() => { hoverRef.current.pepper = true; setHintVisible(false); }}
        onMouseLeave={() => { hoverRef.current.pepper = false; }}
        onClick={() => handleClick("pepper")}
        animate={reduceMotion ? undefined : { rotate: [7, -7, 7] }}
        transition={reduceMotion ? undefined : { duration: 2.3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        whileHover={{ rotate: -26, transition: { duration: 0.25 } }}
        whileTap={{ rotate: -42, scale: 1.08 }}
      >
        <ShakerIcon variant="pepper" />
      </motion.button>
    </div>
  );
}

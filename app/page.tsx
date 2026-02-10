"use client";
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function LulitxStepOneFixed() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <div className="main-wrapper">
      <div className="top-glow" />

      {/* HEADER: Blindado */}
      <header className="absolute-header">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          className="logo-text"
        >
          SEE YOU SOON
        </motion.div>
      </header>

      <main className="center-content">
        <motion.aside 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.9, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="side-info left"
        >
          BY ARTIST FOR ARTIST <br />
          NO ES DISEÑO, <br />
          ES ERROR CON ESTILO.
        </motion.aside>

        <div className="card-perspective">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="the-card"
          >
            <div className="metal-finish" />
            <div className="card-glare" />

            <div className="card-body" style={{ transform: "translateZ(40px)" }}>
              <span className="tag-label">ACCESS VIP</span>
              <div className="brand-title">
                <h2 className="name">by____lulitx</h2>
              </div>
              <p className="edition">
                SE YOU SOON <br />
                DROP 001 — 2026
              </p>
            </div>
            
            <button className="join-button" style={{ transform: "translateZ(60px) translateX(-50%)" }}>
              ACCESS VIP
            </button>
          </motion.div>
        </div>

        <motion.aside 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.9, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="side-info right"
        >
          ARCHIVE DIGITAL <br />
          BY LULITX STUDIO
        </motion.aside>
      </main>

      {/* FOOTER: Blindado */}
      <footer className="absolute-footer">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 1 }}
          className="footer-text"
        >
          © 2026 DESING BY LULA
        </motion.div>
      </footer>

      <style jsx>{`
        .main-wrapper {
          background-color: #000 !important;
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          color: white;
          font-family: sans-serif;
        }

        .top-glow {
          position: absolute;
          top: -10%; left: 50%; transform: translateX(-50%);
          width: 80%; height: 40%;
          background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .absolute-header {
          position: absolute;
          top: 60px;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 100;
        }

        .absolute-footer {
          position: absolute;
          bottom: 60px;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 100;
        }

        .logo-text { 
          font-size: 10px; 
          letter-spacing: 1.2em;
          padding-left: 1.2em; /* COMPENSA EL ESPACIO EXTRA DE LA DERECHA */
          font-weight: 900; 
          text-align: center;
          width: 100%;
        }

        .footer-text {
          font-size: 9px;
          letter-spacing: 0.3em;
          padding-left: 0.3em; /* COMPENSA EL ESPACIO EXTRA DE LA DERECHA */
          text-align: center;
          width: 100%;
        }

        .center-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 60px;
          z-index: 20;
        }

        .side-info {
          width: 180px;
          font-size: 9px;
          letter-spacing: 0.25em;
          line-height: 2;
          text-transform: uppercase;
        }
        .right { text-align: right; }

        .card-perspective { perspective: 1200px; }

        .the-card {
          width: 380px;
          height: 240px;
          position: relative;
          transform-style: preserve-3d;
          border-radius: 32px;
        }

        .metal-finish {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #e0e0e0 0%, #999999 100%) !important;
          border-radius: 32px;
          box-shadow: 0 40px 100px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,255,255,0.5);
        }

        .card-glare {
          position: absolute;
          inset: 0;
          border-radius: 32px;
          background: linear-gradient(105deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.1) 100%);
          pointer-events: none;
        }

        .card-body { position: relative; padding: 40px; z-index: 5; }
        .tag-label { font-size: 10px; letter-spacing: 0.4em; color: #333; font-weight: 800; display: block; margin-bottom: 10px; }
        .brand-title { display: flex; align-items: center; gap: 10px; color: #000; margin-bottom: 15px; }
        .name { font-size: 32px; font-weight: 900; font-style: italic; letter-spacing: -0.05em; color: #000; }
        .edition { font-size: 10px; letter-spacing: 0.1em; color: #444; font-weight: 700; }

        .join-button {
          position: absolute;
          bottom: -25px;
          left: 50%;
          width: 80%;
          background: #000;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 20px;
          border-radius: 14px;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.4em;
          box-shadow: 0 20px 40px rgba(0,0,0,0.9);
          cursor: pointer;
        }

        @media (max-width: 950px) {
          .side-info { display: none; }
          .the-card { width: 320px; height: 200px; }
        }
      `}</style>
    </div>
  );
}
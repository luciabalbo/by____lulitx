"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import styles from './page.module.css';

export default function LulitxStepOneFixed() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (isFlipped) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulación de escaneo/validación
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2200);
  };

  return (
    <div className={styles['main-viewport']}>
      <div className={styles['top-glow']} />

      {/* 1. EJE SUPERIOR */}
      <div className={`${styles['absolute-layer']} ${styles['top-edge']}`}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 1.5 }} className={styles['centered-text']}>
          SEE YOU SOON
        </motion.div>
      </div>

      {/* 2. EJE CENTRAL */}
      <div className={`${styles['absolute-layer']} ${styles['center-axis']}`}>
        <div className={styles['card-perspective']}>
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div 
                key="card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, rotateY: isFlipped ? 180 : 0 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { x.set(0); y.set(0); }}
                style={{ 
                  rotateX: isFlipped ? 0 : rotateX, 
                  rotateY: isFlipped ? 180 : rotateY, 
                  transformStyle: "preserve-3d",
                  pointerEvents: 'auto'
                }}
                className={styles['the-card']}
              >
                {/* FRONTAL */}
                <div className={styles['card-front']} style={{ pointerEvents: isFlipped ? 'none' : 'auto' }}>
                  <div className={styles['metal-finish']}><div className={styles.shine} /></div>
                  <div className={styles['card-body']} style={{ transform: "translateZ(40px)" }}>
                    <span className={styles['tag-label']}>ACCESS VIP</span>
                    <h2 className={styles.name}>by____lulitx</h2>
                    <p className={styles.edition}>SEE YOU SOON <br /> DROP 001 — 2026</p>
                  </div>
                  <button onClick={() => setIsFlipped(true)} className={styles['join-button']} style={{ transform: "translateZ(60px) translateX(-50%)" }}>
                    ACCESS VIP
                  </button>
                </div>

                {/* TRASERA (CON EFECTO VIDRIO) */}
                <div className={styles['card-back']} style={{ pointerEvents: isFlipped ? 'auto' : 'none' }}>
                  <form onSubmit={handleSubmit} className={styles['back-content']} style={{ transform: "translateZ(50px)" }}>
                    <h3 className={styles['back-title']}>KEEP OUT</h3>
                    <input required type="email" placeholder="YOUR@EMAIL.COM" className={styles['email-input']} />
                    <button type="submit" className={styles['submit-btn']} disabled={isLoading}>
                      {isLoading ? "SCANNING..." : "SUBMIT"}
                    </button>
                    <p onClick={() => { if(!isLoading) setIsFlipped(false) }} className={styles['back-link']}>GO BACK</p>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={styles['success-container']}>
                <h2 className={styles['success-title']}>WELCOME TO THE ARCHIVE</h2>
                <p className={styles['success-text']}>YOU ARE IN. CHECK YOUR INBOX.</p>
                <div className={styles['success-line']} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 3. TEXTOS LATERALES */}
      <div className={styles['absolute-layer']} style={{ pointerEvents: 'none', width: '100%', height: '100%' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 0.8, x: 0 }} className={`${styles['side-text']} ${styles['left-txt']}`}>
          BY ARTIST FOR ARTIST <br /> NO ES DISEÑO, <br /> ES ERROR CON ESTILO.
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 0.8, x: 0 }} className={`${styles['side-text']} ${styles['right-txt']}`}>
          ARCHIVE DIGITAL <br /> BY LULITX STUDIO
        </motion.div>
      </div>

      <div className={`${styles['absolute-layer']} ${styles['bottom-edge']}`}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} className={styles['centered-text']}>
          © 2026 DESIGN BY LULA
        </motion.div>
      </div>
    </div>
  );
}
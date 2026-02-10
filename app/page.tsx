"use client";
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import styles from './page.module.css';

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
    <div className={styles['main-viewport']}>
      <div className={styles['top-glow']} />

      {/* 1. EJE SUPERIOR */}
      <div className={`${styles['absolute-layer']} ${styles['top-edge']}`}>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 0.6 }} 
          transition={{ duration: 1.5 }} 
          className={styles['centered-text']}
        >
          SEE YOU SOON
        </motion.div>
      </div>

      {/* 2. EJE CENTRAL (LA CARD) */}
      <div className={`${styles['absolute-layer']} ${styles['center-axis']}`}>
        <div className={styles['card-perspective']}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={styles['the-card']}
          >
            <div className={styles['metal-finish']}>
              <div className={styles.shine} />
            </div>
            <div className={styles['card-body']} style={{ transform: "translateZ(40px)" }}>
              <span className={styles['tag-label']}>ACCESS VIP</span>
              <h2 className={styles.name}>by____lulitx</h2>
              <p className={styles.edition}>SEE YOU SOON <br /> DROP 001 — 2026</p>
            </div>
            <button className={styles['join-button']} style={{ transform: "translateZ(60px) translateX(-50%)" }}>
              ACCESS VIP
            </button>
          </motion.div>
        </div>
      </div>

      {/* 3. TEXTOS LATERALES (FLOTANTES) */}
      <div className={styles['absolute-layer']} style={{ pointerEvents: 'none', width: '100%', height: '100%' }}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 0.8, x: 0 }} 
          className={`${styles['side-text']} ${styles['left-txt']}`}
        >
          BY ARTIST FOR ARTIST <br /> NO ES DISEÑO, <br /> ES ERROR CON ESTILO.
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 0.8, x: 0 }} 
          className={`${styles['side-text']} ${styles['right-txt']}`}
        >
          ARCHIVE DIGITAL <br /> BY LULITX STUDIO
        </motion.div>
      </div>

      {/* 4. EJE INFERIOR */}
      <div className={`${styles['absolute-layer']} ${styles['bottom-edge']}`}>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 0.4 }} 
          transition={{ duration: 1, delay: 0.5 }} 
          className={styles['centered-text']}
        >
          © 2026 DESIGN BY LULA
        </motion.div>
      </div>
    </div>
  );
}
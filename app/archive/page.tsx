"use client";
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import styles from './archive.module.css';

export default function ArchivePage() {
  const [visitorId, setVisitorId] = useState("000");

  useEffect(() => {
    const savedId = localStorage.getItem('lulitx_user_id');
    if (savedId) setVisitorId(savedId);
  }, []);

  return (
    <div className={styles.container}>
      {/* HEADER TÉCNICO */}
      <nav className={styles.header}>
        <div className={styles.topInfo}>
          <span>DB_ROOT: <span className={styles.yellow}>LULITX_CORE</span></span>
          <span className={styles.glitch}>STATUS: INFILTRATED</span>
          <span>USER_ID: {visitorId}</span>
        </div>
      </nav>

      <main className={styles.workspace}>
        {/* ELEMENTO 1: LA DECLARACIÓN */}
        <motion.div 
          drag 
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          className={styles.manifestoBox}
        >
          <span className={styles.tag}>VERSION_2026</span>
          <h2>ESTO NO ES DISEÑO.<br/>ES UN ERROR<br/><span className={styles.blueBg}>CONSCIENTE.</span></h2>
          <p>Exploración visual sin filtros. Prohibido el paso a mentes cerradas.</p>
        </motion.div>

        {/* ELEMENTO 2: FOTO PRINCIPAL (Placeholder) */}
        <motion.div 
          initial={{ rotate: -2 }}
          whileHover={{ rotate: 0, scale: 1.05 }}
          className={styles.bigPhoto}
        >
          <div className={styles.photoOverlay}>FILE_ID_099.JPG</div>
          <div className={styles.imagePlaceholder}>
             {/* Aquí irá tu imagen de impacto */}
             <span>[ HIGH_VOLTAGE_VISUAL ]</span>
          </div>
        </motion.div>

        {/* ELEMENTO 3: EL BOTÓN DE "QUIERO TODO" */}
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className={styles.ctaButton}
        >
          DOWNLOAD_FULL_ARCHIVE_↓
        </motion.button>

        {/* ELEMENTO 4: STICKER FLOTANTE */}
        <div className={styles.paperClip}>
          VIP_ACCESS_ONLY
        </div>
      </main>

      {/* FOOTER TÉCNICO */}
      <footer className={styles.footer}>
        <div className={styles.scrollText}>
          BY LULITX - NO ES DISEÑO, ES ERROR CON ESTILO.
        </div>
      </footer>
    </div>
  );
}
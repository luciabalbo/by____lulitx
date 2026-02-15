"use client";
import React from 'react';
import { motion } from "framer-motion";
import styles from './archive.module.css';

export default function ArchivePage() {
  return (
    <div className={styles.container}>
      {/* Overlay de ruido industrial */}
      <div className={styles.scanlines} />

      <header className={styles.header}>
        <div className={styles.glitch} data-text="BY____LULITX">BY____LULITX</div>
        <div className={styles.accessLevel}>LEVEL: VIP_ACCESS</div>
      </header>

      <main className={styles.content}>
        {/* Elemento 1: El clip de metal (Concepto IG) */}
        <motion.div drag dragConstraints={{left:0, right:0, top:0, bottom:0}} className={styles.paperClip}>
          [ CLIP_FILE_001 ]
        </motion.div>

        {/* Elemento 2: Preview del Drop */}
        <motion.div 
          initial={{ rotate: -5, x: -20 }}
          whileHover={{ rotate: 0, scale: 1.05 }}
          className={styles.photoCard}
        >
          <div className={styles.label}>PREVIEW_DROP_01.JPG</div>
          <div className={styles.imagePlaceholder}>
             {/* Acá irá tu foto de los jeans */}
             <p className={styles.yellowText}>IMAGE_LOCKED</p>
          </div>
        </motion.div>

        {/* Elemento 3: Manifiesto */}
        <div className={styles.manifesto}>
          <h3>ESTAMOS REESCRIBIENDO EL SISTEMA</h3>
          <p>NO ES DISEÑO, ES ERROR CON ESTILO. EL ARCHIVO ESTÁ SIENDO CARGADO...</p>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.barcode}>|||| || | ||| ||||| |</div>
        <p>© 2026 ARCHIVE DIGITAL - ALL RIGHTS RESERVED</p>
      </footer>
    </div>
  );
}
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import styles from './logs.module.css';

const MANIFIESTO_DATA = [
  { text: ">>> ACCESSING CORE_PHILOSOPHY...", type: "system", color: "azul" },
  { text: "by____lulitx no es una marca, es un proceso.", type: "header", color: "white" },
  { text: "Acá no se diseña: se prueba, se rompe, se vuelve a intentar.", type: "body", color: "white" },
  { text: "ERROR 404: ESTILO NO ENCONTRADO.", type: "glitch", color: "amarillo" },
  { text: "------------------------------------------------", type: "system", color: "azul" },
  { text: "No es diseño, es error con estilo. No estamos copiando.", type: "highlight", color: "rojo" },
  { text: "ESTAMOS REESCRIBIENDO EL SISTEMA.", type: "header", color: "white" },
  { text: "Si alguien lo busca prolijo, probablemente no lo encuentre.", type: "body", color: "white" },
  { text: ">>> DESARMANDO TENDENCIAS...", type: "system", color: "azul" },
  { text: "En by____lulitx no hay talles ni reglas claras.", type: "body", color: "white" },
  { text: "Hay MUTACIONES, VERSIONES, PIEZAS que no estuvieron nunca.", type: "highlight", color: "azul" },
  { text: "Cambiamos el modo, rompimos la línea y seguimos jugando.", type: "body", color: "white" },
  { text: "BIENVENIDX A TU METAMORFOSIS.", type: "big_header", color: "rojo" },
  { text: "Vos dale, que yo dale 🐉", type: "footer", color: "amarillo" },
  { text: "by____lulitx 🖤", type: "footer", color: "white" },
];

export default function LogsPage() {
  const [lines, setLines] = useState<typeof MANIFIESTO_DATA>([]);
  const hasStarted = useRef(false); // BLOQUEO DE DUPLICADOS

  useEffect(() => {
    if (hasStarted.current) return; // Si ya empezó, no hagas nada
    hasStarted.current = true;

    setLines([]); // Limpieza inicial por las dudas
    
    MANIFIESTO_DATA.forEach((line, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
      }, i * 450); // Un ritmo más "scary" y legible
    });
  }, []);

  return (
    <div className={styles.terminal_container}>
      <div className={styles.crt_overlay} />
      <div className={styles.scanline} />
      
      <header className={styles.nav_header}>
        <div className={styles.sys_meta}>
          <div className={styles.red_dot} />
          <span>REC_SESSION: {new Date().toLocaleTimeString()}</span>
        </div>
        <Link href="/" className={styles.exit_btn}>[ EXIT_SYS ]</Link>
      </header>

      <main className={styles.manifesto_content}>
        <AnimatePresence mode="popLayout">
          {lines.map((line, i) => (
            <motion.div
              key={`${line.text}-${i}`}
              initial={{ opacity: 0, x: -30, skewX: -20 }}
              animate={{ opacity: 1, x: 0, skewX: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`${styles.line_box} ${styles[line.type]} ${styles[line.color]}`}
            >
              <span className={styles.prefix}>{line.type === 'system' ? '::' : '>>'}</span>
              <span className={styles.text_main}>{line.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        <motion.span 
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.4 }}
          className={styles.terminal_cursor}
        >█</motion.span>
      </main>

      <footer className={styles.terminal_footer}>
        <div className={styles.footer_block}>
          <span>VIBRATION: HIGH</span>
          <span className={styles.amarillo}>STATUS: UNTAMED</span>
        </div>
        <div className={styles.footer_block}>
          <span>BY____LULITX // 2026</span>
        </div>
      </footer>
    </div>
  );
}
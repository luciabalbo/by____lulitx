"use client";
import React from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import styles from './logs.module.css';

const MANIFIESTO_LINES = [
  { text: "by____lulitx no es una marca, es un proceso que está en constante movimiento.", color: "white" },
  { text: "Acá no se diseña: se prueba, se rompe, se vuelve a intentar.", color: "amarillo" },
  { text: "No es diseño, es error con estilo.", color: "azul" },
  { text: "No estamos copiando, estamos reescribiendo el sistema.", color: "rojo" },
  { text: "ERROR 404: ESTILO NO ENCONTRADO.", color: "white" },
  { text: "No seguimos tendencias, las desarmamos. No compramos moda, la reescribimos.", color: "amarillo" },
  { text: "En by____lulitx no hay talles ni reglas claras.", color: "azul" },
  { text: "Hay mutaciones, versiones, piezas que no estuvieron nunca y que ahora existen. ", color: "rojo" },
  { text: "Cada pieza tiene historia, cada historia es distinta. ", color: "white" },
  { text: "Cambiamos el modo, rompimos la línea, seguimos jugando.", color: "amarillo" },
  { text: "Bienvenidx a tu metamorfosis.", color: "azul" },
  { text: "Vos dale, que yo dale 🐉", color: "amarillo" }
];

export default function LogsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/productos" className={styles.back}>[ ESCAPE_SYSTEM ]</Link>
      </header>

      <main className={styles.main}>
        {MANIFIESTO_LINES.map((line, i) => (
          <motion.section 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className={styles.section}
          >
            <h2 className={`${styles.text} ${styles[line.color]}`}>
              {line.text}
            </h2>
          </motion.section>
        ))}
      </main>

      <footer className={styles.footer}>
        <p>BY____LULITX // 2026</p>
      </footer>
    </div>
  );
}
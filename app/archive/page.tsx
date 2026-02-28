"use client";
import React, { useState, useEffect } from 'react'; 
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import styles from './archive.module.css';

// 1. DEFINIMOS LA ESTRUCTURA PARA VS CODE (TypeScript)
interface Photo {
  id: number;
  src: string;
  tag: string;
  location: string;
}

// 1. DATA CON IDs ÚNICOS (Esto elimina el error de "duplicate keys" en consola)
const ARCHIVE_PHOTOS = [
  { id: 1, src: '/produccion/01.jpg', tag: "SESSION_001_A", location: "ARCHIVE_COLLECTION" },
  { id: 2, src: '/produccion/02.jpg', tag: "SESSION_001_B", location: "ARCHIVE_COLLECTION" },
  { id: 3, src: '/produccion/27.jpg', tag: "SESSION_002_A", location: "ARCHIVE_COLLECTION" },
  { id: 4, src: '/produccion/04.jpg', tag: "SESSION_002_B", location: "ARCHIVE_COLLECTION" },
  { id: 5, src: '/produccion/05.jpg', tag: "SESSION_001_A", location: "ARCHIVE_COLLECTION" },
  { id: 6, src: '/produccion/06.jpg', tag: "SESSION_001_B", location: "ARCHIVE_COLLECTION" },
  { id: 7, src: '/produccion/07.jpg', tag: "SESSION_002_A", location: "ARCHIVE_COLLECTION" },
  { id: 8, src: '/produccion/08.jpg', tag: "SESSION_002_B", location: "ARCHIVE_COLLECTION" },
  { id: 9, src: '/produccion/09.jpg', tag: "SESSION_001_A", location: "ARCHIVE_COLLECTION" },
  { id: 10, src: '/produccion/10.jpg', tag: "SESSION_001_B", location: "ARCHIVE_COLLECTION" },
  { id: 11, src: '/produccion/11.jpg', tag: "SESSION_002_A", location: "ARCHIVE_COLLECTION" },
  { id: 12, src: '/produccion/12.jpg', tag: "SESSION_002_B", location: "ARCHIVE_COLLECTION" },
  { id: 13, src: '/produccion/13.jpg', tag: "SESSION_001_A", location: "ARCHIVE_COLLECTION" },
  { id: 14, src: '/produccion/14.jpg', tag: "SESSION_001_B", location: "ARCHIVE_COLLECTION" },
  { id: 15, src: '/produccion/15.jpg', tag: "SESSION_002_A", location: "ARCHIVE_COLLECTION" },
  { id: 16, src: '/produccion/16.jpg', tag: "SESSION_002_B", location: "ARCHIVE_COLLECTION" },
  { id: 17, src: '/produccion/17.jpg', tag: "SESSION_001_A", location: "ARCHIVE_COLLECTION" },
  { id: 18, src: '/produccion/18.jpg', tag: "SESSION_001_B", location: "ARCHIVE_COLLECTION" },
  { id: 19, src: '/produccion/19.jpg', tag: "SESSION_002_A", location: "ARCHIVE_COLLECTION" },
  { id: 20, src: '/produccion/20.jpg', tag: "SESSION_002_B", location: "ARCHIVE_COLLECTION" },
  { id: 21, src: '/produccion/21.jpg', tag: "SESSION_001_A", location: "ARCHIVE_COLLECTION" },
  { id: 22, src: '/produccion/22.jpg', tag: "SESSION_001_B", location: "ARCHIVE_COLLECTION" },
  { id: 23, src: '/produccion/23.jpg', tag: "SESSION_002_A", location: "ARCHIVE_COLLECTION" },
  { id: 20, src: '/produccion/24.jpg', tag: "SESSION_002_B", location: "ARCHIVE_COLLECTION" },
  { id: 21, src: '/produccion/25.jpg', tag: "SESSION_001_A", location: "ARCHIVE_COLLECTION" },
  { id: 22, src: '/produccion/26.jpg', tag: "SESSION_001_B", location: "ARCHIVE_COLLECTION" },
  { id: 23, src: '/produccion/27.jpg', tag: "SESSION_002_A", location: "ARCHIVE_COLLECTION" },
];

// 2. FUNCIÓN DE MEZCLA TIPADA
const shuffleArray = (array: Photo[]): Photo[] => {
  let shuffled = [...array]; 
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  return shuffled;
};

export default function ArchiveGalleryPage() {
  // 3. LE DECIMOS AL ESTADO QUE ES UN ARRAY DE FOTOS
  const [shuffledPhotos, setShuffledPhotos] = useState<Photo[]>([]); 
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    setShuffledPhotos(shuffleArray(ARCHIVE_PHOTOS));
  }, []); 

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.meta_left}>
          <span className={styles.glitch}>[ ARCHIVE_COLLECTION ]</span>
        </div>
        {/* BOTÓN DE ESCAPE CENTRADO */}
        <Link href="/productos" className={styles.escape_btn}>
          [ ESCAPE_SYSTEM ]
        </Link>
        <div className={styles.meta_right}>
          <span>TOTAL_FILES: {ARCHIVE_PHOTOS.length}</span>
          <span>STATUS: NO_FOR_SALE</span>
        </div>
      </header>

      <main className={styles.grid}>
        {shuffledPhotos.map((photo) => (
          <motion.div 
            key={photo.id} 
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.photo_card}
            whileHover={{ scale: 0.98 }}
            onClick={() => setSelectedImg(photo.src)}
          >
            <img src={photo.src} alt={photo.tag} className={styles.photo} />
            <div className={styles.photo_info}>
              <span>{photo.tag}</span>
              <span className={styles.blue}>{photo.location}</span>
            </div>
          </motion.div>
        ))}
      </main>

      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <motion.img 
              src={selectedImg} 
              initial={{ y: 50, scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.9 }}
              className={styles.modal_img}
            />
            <div className={styles.modal_hint}>[ CLICK_ANYWHERE_TO_EXIT ]</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.scanner_overlay} />
    </div>
  );
}
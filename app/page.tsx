"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRouter } from 'next/navigation'; // Importamos el navegador
import styles from './page.module.css';

export default function LulitxStepOneFixed() {
  const router = useRouter(); // Inicializamos el router
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        
        // --- LA TRANSICIÓN DIRECTIVA ---
        // Esperamos 1.5s para que el usuario vea el feedback de "SUCCESS" 
        // antes de ser teletransportado al archivo.
        setTimeout(() => {
          router.push('/archive'); 
        }, 1500);

      } else {
        alert(data.message || "Error en el registro");
      }
    } catch (err) {
      console.error("Error conectando a la API:", err);
      alert("Error de conexión.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles['main-viewport']}>
      <div className={styles['top-glow']} />

      {/* 1. TEXTOS DE LOS COSTADOS (ENTRADA ANIMADA) */}
      <div className={styles['absolute-layer']} style={{ pointerEvents: 'none', width: '100%', height: '100%' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 0.8, x: 0 }} transition={{ delay: 0.5 }} className={`${styles['side-text']} ${styles['left-txt']}`}>
          BY ARTIST FOR ARTIST <br /> NO ES DISEÑO, <br /> ES ERROR CON ESTILO.
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 0.8, x: 0 }} transition={{ delay: 0.7 }} className={`${styles['side-text']} ${styles['right-txt']}`}>
          ARCHIVE DIGITAL <br /> BY LULITX STUDIO
        </motion.div>
      </div>

      <div className={`${styles['absolute-layer']} ${styles['top-edge']}`}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 1.5 }} className={styles['centered-text']}>
          SEE YOU SOON
        </motion.div>
      </div>

      {/* 2. LA TARJETA */}
      <div className={`${styles['absolute-layer']} ${styles['center-axis']}`}>
        <div className={styles['card-perspective']}>
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div 
                key="card"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  rotateY: isFlipped ? 180 : 0 
                }}
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
                {/* CARA FRONTAL */}
                <div 
                  className={styles['card-front']} 
                  style={{ 
                    visibility: isFlipped ? 'hidden' : 'visible',
                    pointerEvents: isFlipped ? 'none' : 'auto' 
                  }}
                >
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

                  {/* CARA TRASERA */}
                  <div 
                    className={styles['card-back']} 
                    style={{ 
                      visibility: isFlipped ? 'visible' : 'hidden',
                      pointerEvents: isFlipped ? 'auto' : 'none' 
                    }}
                  >
                    <form onSubmit={handleSubmit} className={styles['back-content']} style={{ transform: "translateZ(50px)" }}>
                      <h3 className={styles['back-title']}>KEEP OUT</h3>
                      <input 
                        name="email" 
                        required 
                        type="email" 
                        placeholder="YOUR@EMAIL.COM" 
                        className={styles['email-input']} 
                      />
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

      <div className={`${styles['absolute-layer']} ${styles['bottom-edge']}`}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} className={styles['centered-text']}>
          © 2026 DESIGN BY LULA
        </motion.div>
      </div>
    </div>
  );
}
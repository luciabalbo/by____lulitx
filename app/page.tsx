"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function LulitxStepOneFixed() {
  const router = useRouter();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visitorId, setVisitorId] = useState("");
  const [showCodeChallenge, setShowCodeChallenge] = useState(false);
  const [accessCode, setAccessCode] = useState("");

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 100, damping: 20 });

  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const glowX = useTransform(mouseX, [-0.5, 0.5], ["40%", "60%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["40%", "60%"]);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
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
        setVisitorId(data.user_id); 
        if (data.is_new) {
          localStorage.setItem('lulitx_user_id', data.user_id);
          setIsSubmitted(true);
          setTimeout(() => { router.push('/productos'); }, 5000);
        } else {
          setShowCodeChallenge(true);
        }
      } else {
        alert(data.message || "Error en el registro");
      }
    } catch (err) {
      console.error("Error conectando a la API:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAccessCode(val);
    if (val === "404") {
      localStorage.setItem('lulitx_user_id', visitorId);
      setIsSubmitted(true);
      setTimeout(() => { router.push('/productos'); }, 5000);
    }
  };

  return (
    <div className={styles['main-viewport']} onMouseMove={handleMouseMove}>
      <div className={styles['custom-cursor']} style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div className={styles['scanline']} />
      <motion.div className={styles['top-glow']} style={{ left: glowX, top: glowY }} />

      <div className={styles['absolute-layer']} style={{ pointerEvents: 'none', width: '100%', height: '100%' }}>
        <motion.div 
          animate={{ opacity: [0.4, 0.8, 0.5, 0.8] }}
          transition={{ repeat: Infinity, duration: 4, times: [0, 0.1, 0.2, 1] }}
          className={`${styles['side-text']} ${styles['left-txt']}`}
        >
          BY ARTIST FOR ARTIST <br /> NO ES DISEÑO, <br /> ES ERROR CON ESTILO.
        </motion.div>
        <motion.div 
          animate={{ opacity: [0.4, 0.8, 0.6, 0.8] }}
          transition={{ repeat: Infinity, duration: 5, times: [0, 0.05, 0.15, 1], delay: 1 }}
          className={`${styles['side-text']} ${styles['right-txt']}`}
        >
          ARCHIVE DIGITAL <br /> BY LULITX STUDIO
        </motion.div>
      </div>

      <div className={`${styles['absolute-layer']} ${styles['top-edge']}`}>
        <motion.div 
          animate={{ letterSpacing: ["1.2em", "1.4em", "1.2em"] }}
          transition={{ repeat: Infinity, duration: 8 }}
          className={styles['centered-text']}
        >
          SEE YOU SOON
        </motion.div>
      </div>

      <div className={`${styles['absolute-layer']} ${styles['center-axis']}`}>
        <div className={styles['card-perspective']}>
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div 
                key="card"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateY: isFlipped ? 180 : 0 }}
                onMouseLeave={() => { x.set(0); y.set(0); }}
                style={{ 
                  rotateX: isFlipped ? 0 : rotateX, 
                  rotateY: isFlipped ? 180 : rotateY, 
                  transformStyle: "preserve-3d",
                  pointerEvents: 'auto'
                }}
                className={styles['the-card']}
              >
                <div className={styles['card-front']} style={{ visibility: isFlipped ? 'hidden' : 'visible' }}>
                  <div className={styles['metal-finish']}><div className={styles.shine} /></div>
                  
                  <div className={styles['card-header']}>
                    <span className={styles['tag-label']}>ACCESS VIP</span>
                  </div>
                  
                  <div className={styles['card-body']} style={{ transform: "translateZ(40px)" }}>
                    <h2 className={styles.name}>by____lulitx</h2>
                    <p className={styles.edition}>SEE YOU SOON <br /> DROP 001 — 2026</p>
                  </div>
                  
                  <div className={styles['card-footer']}>
                    <button 
                      onClick={() => setIsFlipped(true)} 
                      className={styles['join-button']} 
                      style={{ transform: "translateZ(60px)" }}
                    >
                      ACCESS VIP
                    </button>
                  </div>
                </div>

                <div className={styles['card-back']} style={{ visibility: isFlipped ? 'visible' : 'hidden' }}>
                  <div className={styles['back-content']} style={{ transform: "translateZ(50px)" }}>
                    <AnimatePresence mode="wait">
                      {!showCodeChallenge ? (
                        <motion.form key="form-email" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit}>
                          <h3 className={styles['back-title']}>KEEP OUT</h3>
                          <input name="email" required type="email" placeholder="YOUR@EMAIL.COM" className={styles['email-input']} />
                          <button type="submit" className={styles['submit-btn']} disabled={isLoading}>
                            {isLoading ? "SCANNING..." : "SUBMIT"}
                          </button>
                          <p onClick={() => { if(!isLoading) setIsFlipped(false) }} className={styles['back-link']}>GO BACK</p>
                        </motion.form>
                      ) : (
                        <motion.div key="challenge" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <h3 className={styles['back-title']} style={{ color: '#fce900' }}>VOS YA SOS VIP</h3>
                          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#888', marginBottom: '15px' }}>CÓDIGO DE ACCESO: 404</p>
                          <input 
                            type="text" maxLength={3} placeholder="_ _ _" value={accessCode} onChange={handleCodeChange}
                            className={styles['email-input']} autoFocus style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '8px' }}
                          />
                          <p className={styles['status-log']} style={{ textAlign: 'center', fontSize: '14px' }}>NO_TRAICIONA_EL_QUE_TE_AVISA...</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={styles['success-container']}>
                <div className={styles['id-badge']}>ENTRY_LOG_ID: {visitorId}</div>
                <h2 className={styles['success-title']}>IDENTITY VERIFIED.</h2>
                <p className={styles['success-text']}>
                  WELCOME TO THE ARCHIVE. <br />
                  NO SEGUIMOS TENDENCIAS, LAS DESARMAMOS. <br />
                  NO COMPRAMOS MODA, LA REESCRIBIMOS. <br />
                  <span className={styles['vip-highlight']}>VIP ACCESS GRANTED — UNLIMITED EXPLORATION.</span>
                </p>
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
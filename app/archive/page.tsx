"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import styles from './archive.module.css';

interface CartItem {
  id: number;
  name: string;
  price: number;
}

const ProductGallery = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className={styles.product_image} onClick={nextImage} style={{ cursor: 'pointer' }}>
      <AnimatePresence mode="wait">
        <motion.img 
          key={index}
          src={images[index]} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={styles.img_main} 
          alt="Product view" 
        />
      </AnimatePresence>

      <div className={styles.image_counter}>
        FILE_0{index + 1} / 0{images.length}
      </div>

      <div className={styles.image_meta}>
        {index === 0 ? "VIEW:PRODUCCION" : index === 1 ? "VIEW:PRODUCTO" : "VIEW:DETALLE"}
      </div>
      
      {images.length > 1 && <div className={styles.gallery_hint}>CLICK_TO_SCAN_→</div>}
    </div>
  );
};

// Afuera del componente principal
const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        left: pos.x, top: pos.y,
        width: '20px', height: '20px',
        border: '1px solid #0052c9',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 10000,
        transition: 'width 0.2s, height 0.2s'
      }} 
    />
  );
};

export default function ArchivePage() {
  const [visitorId, setVisitorId] = useState("000");
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedId = localStorage.getItem('lulitx_user_id');
    if (savedId) setVisitorId(savedId);
  }, []);

  const addToCart = (productName: string, price: number) => {
    const newItem: CartItem = { id: Date.now(), name: productName, price: price };
    setCart([...cart, newItem]);
  };

  const executePurchase = () => {
    const phoneNumber = "543534822456";
    const intro = `--- SYSTEM_PURCHASE_REQUEST ---\n`;
    const user = `USER_ID: VISITOR_${visitorId}\n`;
    const items = cart.map(item => `> [${item.name}] - $${item.price}`).join('\n');
    const total = `\nTOTAL_VALUE: $${cart.reduce((acc, item) => acc + item.price, 0)}`;
    const fullMessage = encodeURIComponent(intro + user + items + total + `\n\nAWAITING_EXTRACTION...`);
    window.open(`https://wa.me/${phoneNumber}?text=${fullMessage}`, '_blank');
  };

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <CustomCursor />
      {/* 1. NAV SUPERIOR */}
      <nav className={styles.header}>
        <div className={styles.topInfo}>
          <div className={styles.logo}>LULITX_CORE v2.6</div>
          <div className={styles.menuLinks}>
            <span className={styles.glitch}>[ SHOP_ALL ]</span>
            <span>[ ARCHIVE ]</span>
            <span>[ LOGS ]</span>
          </div>
          <div className={styles.visitorCount}>USERS_ONLINE: 012</div>
        </div>
      </nav>

      {/* CARRITO FLOTANTE (BUFFER) */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div initial={{ x: 100 }} animate={{ x: 0 }} exit={{ x: 100 }} className={styles.cart_status}>
            <div className={styles.buffer_header}>SYSTEM_BUFFER</div>
            <div className={styles.buffer_count}>{cart.length} ITEMS_LOADED</div>
            <button className={styles.checkout_mini_btn} onClick={executePurchase}>EXECUTE_PURCHASE_↓</button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className={styles.workspace}>
        {/* 2. HERO SECTION */}
        <section className={styles.heroSection}>
          <div className={styles.circleContainer}>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className={styles.data_circle}
            >
              <span className={styles.circleText}>
                LULITX_ERROR_SYSTEM_DATA_LULITX_ERROR_SYSTEM_DATA_
              </span>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.manifestoBoxCentered}
          >
            <div className={styles.hero_status_center}>
              <span className={styles.pulse_dot}></span>
              <span className={styles.tag}>[ STYLING_ACTIVE ]</span>
            </div>

            <h2 className={styles.hero_title_center}>
              ESTO NO ES <br/> 
              <span className={styles.glitch_auto}>DISEÑO,</span> <br/> 
              <span className={styles.blueBg}>ES ERROR.</span>
            </h2>

            <div className={styles.typing_container}>
              <p className={styles.hero_subtitle}>|| CON ESTILO</p>
            </div>
          </motion.div>
        </section>

        {/* 3. TRANSICIÓN */}
        <div className={styles.transition_divider}>
          <div className={styles.scanner_line} />
          <div className={styles.transition_meta}>
            <span>DROP 001</span>
            <motion.span 
              animate={{ opacity: [1, 0, 1] }} 
              transition={{ repeat: Infinity, duration: 1 }}
            >
              [ STATUS: DECRYPTING ]
            </motion.span>
            <span>70%_COMPLETE</span>
          </div>
        </div>

        {/* 4. SECCION CATÁLOGO ÚNICA */}
        <section className={styles.catalog_section}>
          <div className={styles.product_grid}>
            {/* PRODUCTO 01 */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }} 
              initial={{ opacity: 0, y: 20 }}
              className={styles.product_card}
            >
              
              <ProductGallery images={['/productos/1.png', '/productos/01.png', '/productos/10.png']} />

              <div className={styles.product_info}>
                <h3>POLLERA TRANSFORM</h3>
                <p className={styles.description}>
                  DESMONTABLE (LARGA | CORTA). CINTURA REGULABLE (60CM-90CM). 
                  SISTEMA DE AJUSTE TÉCNICO.
                </p>
                <div className={styles.product_footer}>
                  <span className={styles.price}>$44.000</span>
                  <button className={styles.request_btn} onClick={() => addToCart('POLLERA TRANSFORM', 44000)}>
                    ADD_TO_BUFFER_+
                  </button>
                </div>
              </div>
            </motion.div>

            {/* PRODUCTO 02 */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }} 
              initial={{ opacity: 0, y: 20 }}
              className={styles.product_card}
            >
              
              <ProductGallery images={['/productos/2.jpg', '/productos/02.png', '/productos/20.png']} />

              <div className={styles.product_info}>
                <h3>SHORT INTERVENIDO_v44</h3>
                <p className={styles.description}>
                  CONSTRUCCIÓN HÍBRIDA SHORT+SHORT. CINTURA 88CM. 
                  TALLE 44. PIEZA DE ARCHIVO ÚNICA.
                </p>
                <div className={styles.product_footer}>
                  <span className={styles.price}>$35.000</span>
                  <button className={styles.request_btn} onClick={() => addToCart('SHORT INTERVENIDO v44', 35000)}>
                    ADD_TO_BUFFER_+
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* 5. SECCIÓN FAQ (SUPPORT_DATABASE) */}
      <section className={styles.faq_section}>
        <div className={styles.faq_header}>
          <span className={styles.tag}>[ SUPPORT_DATABASE ]</span>
          <h3>FREQUENTLY_ASKED_QUESTIONS</h3>
        </div>

        <div className={styles.faq_grid}>
          {[
            { q: "ESTADO_DE_ENVÍOS", a: "Realizamos envíos a todo el sistema (Argentina). El procesamiento de datos tarda 48hs hábiles." },
            { q: "POLÍTICA_DE_RECONSTRUCCIÓN", a: "Al ser piezas únicas de archivo, no realizamos cambios por talle. Verificá bien las medidas antes de la extracción." },
            { q: "MÉTODOS_DE_PAGO", a: "Aceptamos transferencia bancaria y tarjetas vía Mercado Pago. El total se calcula en el Buffer." }
          ].map((item, i) => (
            <details key={i} className={styles.faq_item}>
              <summary className={styles.faq_question}>
                <span className={styles.yellow}>&gt;</span> {item.q}
              </summary>
              <p className={styles.faq_answer}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className={styles.footer_main}>
        <div className={styles.footer_grid}>
          <div className={styles.footer_col}>
            <h4>[ NAVIGATION ]</h4>
            <p>SEARCH_ITEMS</p>
            <p>SHIPPING_INFO</p>
          </div>
          <div className={styles.footer_col}>
            <h4>[ SOCIAL ]</h4>
            <p onClick={() => window.open('https://instagram.com/by___lulitx')}>INSTAGRAM_LINK</p>
          </div>
          <div className={styles.footer_col}>
            <h4>[ NEWSLETTER ]</h4>
            <input type="text" placeholder="ENTER_EMAIL_FOR_UPDATES" className={styles.terminal_input} />
          </div>
        </div>
        <div className={styles.ticker}>
          <span>SYSTEM_ERROR_BY_LULITX — ALL RIGHTS RESERVED 2026 — </span>
        </div>
      </footer>
    </div>
    </div>
  );
}
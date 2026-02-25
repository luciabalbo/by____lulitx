"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import styles from './archive.module.css';

interface CartItem {
  id: number;
  name: string;
  price: number;
}

// COMPONENTE CORREGIDO: Ahora cicla todas las fotos al hacer click
const ProductGallery = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita conflictos con otros clicks
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

      {/* Contador de archivos para saber en cuál estás */}
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
      <div className={styles.noiseOverlay} />

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
        <section className={styles.heroSection}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={styles.manifestoBox}>
            <span className={styles.tag}>[ ACCESS_GRANTED ]</span>
            <h2>ESTO NO ES <br/> DISEÑO. <br/> <span className={styles.blueBg}>ES ERROR.</span></h2>
          </motion.div>
        </section>

        <section className={styles.catalog_section}>
          <div className={styles.catalog_header}>
            <h3>AVAILABLE_ASSETS</h3>
          </div>

          <div className={styles.product_grid}>
            {/* PRODUCTO 01: POLLERA CAMO */}
            <motion.div whileHover={{ y: -5 }} className={styles.product_card}>
              <div className={styles.product_header}>
                <span>REF: LXT_CAMO_01</span>
                <span className={styles.stock_status}>STATUS: TRANSFORMABLE</span>
              </div>
              
              <ProductGallery images={['/productos/1.png', '/productos/01.png', '/productos/10.png']} />

              <div className={styles.product_info}>
                <h3>POLLERA "TRANSFORM"</h3>
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

            {/* PRODUCTO 02: SHORT INTERVENIDO */}
            <motion.div whileHover={{ y: -5 }} className={styles.product_card}>
              <div className={styles.product_header}>
                <span>REF: LXT_SHRT_44</span>
                <span className={styles.stock_status}>STATUS: UNIQUE_PIECE</span>
              </div>
              
              <ProductGallery images={['/short_produccion.jpg', '/short_producto.jpg']} />

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

      <footer className={styles.footer}>
        <div className={styles.scrollText}>
           — NO ES DISEÑO, ES ERROR CON ESTILO — BY LULITX — 2026 —
        </div>
      </footer>
    </div>
  );
}
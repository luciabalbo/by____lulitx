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
        {/* 1. MENU SUPERIOR TECH */}
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

        <main className={styles.workspace}>
        <section className={styles.heroSection}>
          {/* El círculo rotando de fondo */}
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
              <span className={styles.tag}>[ SYSTEM_ACTIVE ]</span>
            </div>

            {/* Título con Glitch Automático */}
            <h2 className={styles.hero_title_center} data-text="DISEÑO.">
              ESTO NO ES <br/> 
              <span className={styles.glitch_auto}>DISEÑO.</span> <br/> 
              <span className={styles.blueBg}>ES ERROR.</span>
            </h2>

            <div className={styles.typing_container}>
              <p className={styles.hero_subtitle}>// PROTOCOLO_DE_RECONSTRUCCIÓN_ACTIVADO...</p>
            </div>
          </motion.div>
        </section>
        {/* SECCION SHOP (Categorías) */}
        <section className={styles.catalog_section}>
          <div className={styles.catalog_header}>
            <span className={styles.tag}>DIRECTORY: /ROOT/COLLECTION_2026</span>
            <h3>AVAILABLE_ASSETS</h3>
          </div>
          
          {/* Aquí va tu Grid de Productos que ya funciona epikamente */}
          <div className={styles.product_grid}>
            {/* ... tus componentes ProductGallery ... */}
          </div>
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

      {/* 2. FOOTER ESTRUCTURADO */}
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
);}

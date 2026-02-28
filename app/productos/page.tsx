"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import styles from './archive.module.css';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  tag: string;
  in_stock: boolean;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
}

// GALERÍA ACTUALIZADA CON NAVEGACIÓN EN ZOOM
const ProductGallery = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  return (
    <>
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

        <div className={styles.zoom_trigger} onClick={toggleZoom}>
          [ VIEW_FULL_SCAN ]
        </div>

        <div className={styles.image_meta}>
          {index === 0 ? "VIEW:PRODUCCION" : index === 1 ? "VIEW:PRODUCTO" : "VIEW:DETALLE"}
        </div>
        
        {images.length > 1 && <div className={styles.gallery_hint}>CLICK_TO_SCAN_→</div>}
      </div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            className={styles.modal_overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleZoom}
          >
            {/* FLECHAS DE NAVEGACIÓN EN MODAL */}
            {images.length > 1 && (
              <>
                <div className={styles.modal_arrow_left} onClick={prevImage}>{"<"}</div>
                <div className={styles.modal_arrow_right} onClick={nextImage}>{">"}</div>
              </>
            )}

            <motion.div 
              className={styles.modal_content}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()} 
            >
              <img 
                src={images[index]} 
                className={styles.img_zoom} 
                alt="Zoom" 
                onClick={nextImage}
                style={{ cursor: 'pointer' }}
              />
              
              <div className={styles.modal_footer_info}>
                <span>DATA_SCAN: FILE_0{index + 1} / 0{images.length}</span>
                <span className={styles.modal_close_btn} onClick={toggleZoom}>[ CLOSE_X ]</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedId = localStorage.getItem('lulitx_user_id');
    if (savedId) setVisitorId(savedId);

    async function fetchProducts() {
      try {
        const res = await fetch('/api/productos');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("DB_FETCH_ERROR");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    if (!product.in_stock) return;
    if (cart.find(item => item.id === product.id)) return;
    
    const newItem: CartItem = { id: product.id, name: product.name, price: product.price };
    setCart([...cart, newItem]);
  };

  const executePurchase = async () => {
    const productIds = cart.map(item => item.id);

    try {
      const res = await fetch('/api/productos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds }),
      });

      if (res.ok) {
        const phoneNumber = "543534822456";
        const intro = `--- SYSTEM_PURCHASE_REQUEST ---\n`;
        const user = `USER_ID: VISITOR_${visitorId}\n`;
        const items = cart.map(item => `> [${item.name}] - $${item.price}`).join('\n');
        const total = `\nTOTAL_VALUE: $${cart.reduce((acc, item) => acc + item.price, 0)}`;
        const fullMessage = encodeURIComponent(intro + user + items + total + `\n\nAWAITING_EXTRACTION...`);
        
        window.open(`https://wa.me/${phoneNumber}?text=${fullMessage}`, '_blank');

        setProducts(prev => prev.map(p => 
          productIds.includes(p.id) ? { ...p, in_stock: false } : p
        ));
        setCart([]);
      }
    } catch (err) {
      alert("SYSTEM_SYNC_ERROR: REINTENTAR.");
    }
  };

  return (
    <div className={styles.container}>
      <CustomCursor />
      <nav className={styles.header}>
        <div className={styles.topInfo}>
          {/* Logo que vuelve al inicio */}
          <Link href="/" className={styles.logo}>LULITX_CORE v2.6</Link>
          
          <div className={styles.menuLinks}>
            <Link href="/productos" className={styles.nav_link}>
              <span className={styles.glitch}>[ SHOP_ALL ]</span>
            </Link>
            
            <Link href="/archive" className={styles.nav_link}>
              <span>[ ARCHIVE ]</span>
            </Link>
            
            <Link href="/logs" className={styles.nav_link}>
              <span>[ LOGS ]</span>
            </Link>
          </div>

          {/* ID REAL DEL USUARIO */}
          <div className={styles.visitorCount}>
            USER_ID: {visitorId}
          </div>
        </div>
      </nav>

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
          <div className={styles.circleContainer}>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className={styles.data_circle}
            >
              <span className={styles.circleText}>VOS DALE, QUE YO DALE 🐉</span>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.manifestoBoxCentered}>
            <div className={styles.hero_status_center}>
              <span className={styles.pulse_dot}></span>
              <span className={styles.tag}>[ STYLING_ACTIVE ]</span>
            </div>
            <h2 className={styles.hero_title_center}>ESTO NO ES <br/> <span className={styles.glitch_auto}>DISEÑO,</span> <br/> <span className={styles.blueBg}>ES ERROR</span></h2>
            <div className={styles.typing_container}>
              <p className={styles.hero_subtitle}>|| CON ESTILO</p>
            </div>
          </motion.div>
        </section>

        <div className={styles.transition_divider}>
          <div className={styles.scanner_line} />
          <div className={styles.transition_meta}>
            <span>DROP 001</span>
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
              [ STATUS: BIENVENIDX A TU METAMORFOSIS ]
            </motion.span>
            <span>70%_COMPLETE</span>
          </div>
        </div>

        <section className={styles.catalog_section}>
          <div className={styles.product_grid}>
            {loading ? (
              <div className={styles.loading_txt}>CONNECTING_TO_ARCHIVE_...</div>
            ) : (
              products.map((product) => (
                <motion.div 
                  key={product.id}
                  whileInView={{ opacity: 1, y: 0 }} 
                  initial={{ opacity: 0, y: 20 }}
                  className={styles.product_card}
                  style={{ 
                    filter: product.in_stock ? 'none' : 'grayscale(1)',
                    opacity: product.in_stock ? 1 : 0.5 
                  }}
                >
                  <ProductGallery images={product.images} />
                  <div className={styles.product_info}>
                    <div className={styles.product_header}>
                      <span>{product.tag}</span>
                      <span style={{ color: product.in_stock ? 'var(--color-azul)' : 'var(--color-rojo)' }}>
                        {product.in_stock ? "[ IN_STOCK ]" : "[ OUTSIDE_STOCK ]"}
                      </span>
                    </div>
                    <h3>{product.name}</h3>
                    <p className={styles.description}>{product.description}</p>
                    <div className={styles.product_footer}>
                      <span className={styles.price}>${product.price.toLocaleString()}</span>
                      <button 
                        className={styles.request_btn} 
                        disabled={!product.in_stock}
                        onClick={() => addToCart(product)}
                      >
                        {product.in_stock ? `COMPRAR_${product.name.split(' ')[0]}_+` : "SOLD_OUT_x"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* FAQ y FOOTER permanecen igual */}
      <section className={styles.faq_section}>
        <div className={styles.faq_header}>
          <span className={styles.tag}>[ SUPPORT_]</span>
          <h3>ASKED_QUESTIONS</h3>
        </div>
        <div className={styles.faq_grid}>
          {[
            { q: "ESTADO_DE_ENVÍOS", a: "Realizamos envíos a todo MI PAÍS (Arg). El carrito de compras te re-dirige a wpp, ahí coordinamos el envío." },
            { q: "POLÍTICA_DE_RECONSTRUCCIÓN", a: "Al ser piezas únicas de archivo, no realizamos cambios por talle. Verificá bien las medidas antes de la extracción." },
            { q: "MÉTODOS_DE_PAGO", a: "El carrito de compras te re-dirige a wpp, ahí coordinamos el envío o retiro de la prenda y el pago." }
          ].map((item, i) => (
            <details key={i} className={styles.faq_item}>
              <summary className={styles.faq_question}><span className={styles.yellow}>&gt;</span> {item.q}</summary>
              <p className={styles.faq_answer}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className={styles.footer_main}>
        <div className={styles.footer_grid}>
          <div className={styles.footer_col}>
            <span className={styles.col_tag}>01_INFO</span>
            <h4>[ NAVIGATION ]</h4>
            
            {/* SHOP_ALL suele ser el home o la sección de productos */}
            <Link href="/productos" className={styles.footer_link}>
              SHOP_ALL
            </Link>
            
            <Link href="/archive" className={styles.footer_link}>
              ARCHIVE
            </Link>
            
            <Link href="/logs" className={styles.footer_link}>
              LOGS
            </Link>
          </div>

          <div className={styles.footer_col}>
            <span className={styles.col_tag}>02_CONNECT</span>
            <h4>[ SOCIAL ]</h4>
            <a 
              href="https://www.instagram.com/by_________lulitx/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.footer_link}
            >
              INSTAGRAM_LINK <span className={styles.arrow}>↗</span>
            </a>
          </div>

          <div className={styles.footer_col}>
            <span className={styles.col_tag}>03_ACCESS</span>
            <h4>[ NEWSLETTER ]</h4>
            <div className={styles.newsletter_wrapper}>
              <input type="text" placeholder="ENTER_EMAIL_FOR_UPDATES" className={styles.terminal_input} />
              <button className={styles.input_btn}>SUBMIT</button>
            </div>
            <p className={styles.input_hint}>// ENCRYPTED_CONNECTION_SECURE</p>
          </div>
        </div>

        <div className={styles.ticker_container}>
          <div className={styles.ticker_wrapper}>
            <span className={styles.ticker_text}>
              © 2026 DESIGN BY LULA - HAY QUE TENER A LA AUDIENCIA CONFUNDIDA - 
              © 2026 DESIGN BY LULA - HAY QUE TENER A LA AUDIENCIA CONFUNDIDA
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
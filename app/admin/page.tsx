"use client";
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  in_stock: boolean;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  // --- CONFIGURÁ TU CLAVE ACÁ ---
  const ADMIN_PASSWORD = "elenanomascooldelplaneta"; 

  useEffect(() => {
    const pass = prompt("INGRESE CLAVE DE ACCESO:");
    if (pass === ADMIN_PASSWORD) {
      setAuthorized(true);
      fetchData();
    } else {
      alert("ACCESO DENEGADO");
      window.location.href = "/"; // Lo manda al inicio si falla
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/productos');
      const data = await res.json(); 
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Error cargando productos");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStock = async (id: number, currentStock: boolean) => {
    try {
      await fetch('/api/productos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productIds: [id],
          setInStock: !currentStock 
        }),
      });
      fetchData(); 
    } catch (err) {
      alert("Error al actualizar el stock");
    }
  };

  if (!authorized) return <div style={{background:'#000', height:'100vh'}} />;

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'monospace' }}>
      <h1 style={{ borderBottom: '1px solid #333', paddingBottom: '10px' }}>[ LULITX_STOCK_CONTROL ]</h1>
      
      {loading ? (
        <p>CONNECTING_TO_DATABASE...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          {products.length > 0 ? (
            products.map((p) => (
              <div key={p.id} style={{ border: '1px solid #222', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0a0a0a' }}>
                <div>
                  <b style={{ fontSize: '1.1rem' }}>{p.name}</b>
                  <p style={{ margin: '5px 0', color: p.in_stock ? '#00ff00' : '#ff0000' }}>
                    {p.in_stock ? "● DISPONIBLE" : "○ AGOTADO"}
                  </p>
                </div>
                <button 
                  onClick={() => handleStock(p.id, p.in_stock)}
                  style={{
                    background: p.in_stock ? '#333' : '#0052c9',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 15px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {p.in_stock ? "MARCAR AGOTADO" : "VOLVER A STOCK"}
                </button>
              </div>
            ))
          ) : (
            <p>NO SE ENCONTRARON PRODUCTOS EN LA DB.</p>
          )}
        </div>
      )}
    </div>
  );
}
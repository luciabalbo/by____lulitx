import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
const sql = neon(process.env.DATABASE_URL!);

const INITIAL_PRODUCTS = [
  {
    name: "POLLERA TRANSFORM",
    price: 40000,
    description: "DESMONTABLE (LARGA | CORTA). CINTURA REGULABLE (60CM-90CM). PIEZA DE ARCHIVO ÚNICA.",
    images: ['/productos/1.png', '/productos/01.png', '/productos/10.png'],
    tag: "FILE_01"
  },
  {
    name: "SHORT INTERVENIDO_v44",
    price: 25000,
    description: "CONSTRUCCIÓN HÍBRIDA SHORT+SHORT. CINTURA 88CM. TALLE 44. PIEZA DE ARCHIVO ÚNICA.",
    images: ['/productos/2.jpg', '/productos/02.png', '/productos/20.png'],
    tag: "FILE_02"
  },
  {
    name: "VESTIDO V_ctrlZ",
    price: 55000,
    description: "CONSTRUCCIÓN CASACA+PANTALÓN_ABUELA. TALLE L. PIEZA DE ARCHIVO ÚNICA.",
    images: ['/productos/3.jpg', '/productos/03.png', '/productos/30.JPG'],
    tag: "FILE_03"
  },
  {
    name: "PANTALÓN P_ctrlO",
    price: 70000,
    description: "CONSTRUCCIÓN JEAN_AZUL_BASE+JEAN_GRIS+LLAVEROS. CINTURA 88CM. TALLE 44. LARGO TOTAL 105COM. PIEZA DE ARCHIVO ÚNICA.",
    images: ['/productos/55.jpg', '/productos/05.png','/productos/5.jpg'],
    tag: "FILE_04"
  },
  {
    name: "BUZO A_ctrlX",
    price: 67000,
    description: "CONSTRUCCIÓN BUZO_ADIDAS+CADENAS. TALLE M. PIEZA DE ARCHIVO ÚNICA.",
    images: ['/productos/44.png', '/productos/04.png', '/productos/40.png'],
    tag: "FILE_05"
  },
  {
    name: "PANTALÓN P_ctrlC",
    price: 67000,
    description: "CONSTRUCCIÓN JEAN_AZUL_BASE+JEAN_CELESTE+ARGOLLAS_DORADAS. CINTURA 72CM. TALLE 36. PIEZA DE ARCHIVO ÚNICA.",
    images: ['/productos/6.jpg', '/productos/06.png','/productos/60.png', '/productos/66.jpg'],
    tag: "FILE_06"
  },
  {
    name: "PANTALÓN P_ctrlY",
    price: 65000,
    description: "CONSTRUCCIÓN JEAN_NEGRO_BASE+JEAN_AZUL. CINTURA 72CM. TALLE 36. PIEZA DE ARCHIVO ÚNICA.",
    images: ['/productos/7.jpg', '/productos/07.png','/productos/70.png', '/productos/77.jpg'],
    tag: "FILE_07"
  },
  {
    name: "POLLERA :))))",
    price: 27000,
    description: "CONSTRUCCIÓN HÍBRIDA + PINTURA. CINTURA 76CM . TALLE 38. PIEZA DE ARCHIVO ÚNICA.",
    images: ['/productos/9.png', '/productos/09.png','/productos/90.png'],
    tag: "FILE_08"
  },
  {
    name: "CHALECO ctrlC_ctrlV",
    price: 33000,
    description: "CONSTRUCCIÓN HÍBRIDA. TALLE L. PIEZA DE ARCHIVO ÚNICA.",
    images: ['/productos/8.jpg', '/productos/08.png','/productos/80.png', '/productos/88.jpg'],
    tag: "FILE_09"
  },
  // --- PEGÁ LOS OTROS 16 ACÁ ABAJO ---
  // { name: "PRENDA 5", price: 1000, ... },
];

export async function GET() {
  try {
    let products = await sql`SELECT * FROM productos ORDER BY id ASC;`; // <-- CAMBIADO A ASC

    if (products.length === 0) {
      console.log("Cargando 20 productos...");
      
      for (const p of INITIAL_PRODUCTS) {
        await sql`
          INSERT INTO productos (name, price, description, images, tag)
          VALUES (${p.name}, ${p.price}, ${p.description}, ${p.images}, ${p.tag});
        `;
      }
      products = await sql`SELECT * FROM productos ORDER BY id ASC;`; // <-- CAMBIADO A ASC
    }

    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ message: "DB_ERROR" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { productIds } = await request.json();
    await sql`UPDATE productos SET in_stock = false WHERE id = ANY(${productIds});`;
    return NextResponse.json({ message: "STOCK_UPDATED" });
  } catch (error: any) {
    return NextResponse.json({ message: "UPDATE_ERROR" }, { status: 500 });
  }
}
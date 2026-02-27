import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const sql = neon(process.env.DATABASE_URL!);

// --- 1. OBTENER PRODUCTOS (GET) ---
export async function GET() {
  try {
    const products = await sql`
      SELECT id, name, price, description, images, tag, in_stock 
      FROM productos 
      ORDER BY created_at DESC;
    `;
    return NextResponse.json(products);
  } catch (error: any) {
    console.error("FETCH_PRODUCTS_ERROR:", error.message);
    return NextResponse.json({ message: "DB_FETCH_ERROR" }, { status: 500 });
  }
}

// --- 2. ACTUALIZAR STOCK AL COMPRAR (PATCH) ---
export async function PATCH(request: Request) {
  try {
    const { productIds } = await request.json(); // Esperamos un array de IDs [1, 2, 3]

    if (!productIds || !Array.isArray(productIds)) {
      return NextResponse.json({ message: "INVALID_IDS" }, { status: 400 });
    }

    // Marcamos como in_stock = false los IDs recibidos
    await sql`
      UPDATE productos 
      SET in_stock = false 
      WHERE id = ANY(${productIds});
    `;

    return NextResponse.json({ message: "STOCK_UPDATED" }, { status: 200 });

  } catch (error: any) {
    console.error("UPDATE_STOCK_ERROR:", error.message);
    return NextResponse.json({ message: "UPDATE_ERROR" }, { status: 500 });
  }
}
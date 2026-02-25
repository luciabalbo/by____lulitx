import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  // Conectamos a Neon usando la variable de entorno
  const sql = neon(process.env.DATABASE_URL!);

  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: "MAIL_REQUIRED" }, { status: 400 });
    }

    // 1. Creamos la tabla si no existe (Postgres style)
    await sql`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Insertamos el mail y obtenemos el ID
    // Usamos ON CONFLICT para que si ya existe, no explote y solo nos devuelva el ID
    const result = await sql`
      INSERT INTO usuarios (email) 
      VALUES (${email}) 
      ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
      RETURNING id;
    `;
    
    const userId = String(result[0].id).padStart(3, '0');

    console.log("ACCESO VIP GENERADO PARA:", email);

    return NextResponse.json({ 
      message: "ENTRY_GRANTED", 
      user_id: userId 
    }, { status: 200 });

  } catch (error: any) {
    console.error("ERROR EN SISTEMA NEON:", error.message);
    return NextResponse.json({ message: "SYSTEM_ERROR" }, { status: 500 });
  }
}
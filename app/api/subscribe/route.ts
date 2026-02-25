import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const sql = neon(process.env.DATABASE_URL!);

  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: "MAIL_REQUIRED" }, { status: 400 });
    }

    // 1. Intentamos insertar. Si el mail existe, no hace nada pero nos deja retornar el ID.
    // Usamos xmax para saber si realmente se insertó (0) o si ya existía (distinto de 0).
    const result = await sql`
      INSERT INTO usuarios (email) 
      VALUES (${email}) 
      ON CONFLICT (email) 
      DO UPDATE SET email = EXCLUDED.email
      RETURNING id, (xmax = 0) AS is_new;
    `;
    
    // 2. Formateamos el ID (ej: de 12 a "012")
    const userId = String(result[0].id).padStart(3, '0');
    const isNew = result[0].is_new;

    return NextResponse.json({ 
      user_id: userId,
      is_new: isNew 
    }, { status: 200 });

  } catch (error: any) {
    console.error("NEON_ERROR:", error.message);
    return NextResponse.json({ message: "SYSTEM_ERROR" }, { status: 500 });
  }
}
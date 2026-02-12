import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { NextResponse } from 'next/server';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let db;
  try {
    const { email } = await request.json();

    // Ruta absoluta para que no se pierda
    const dbPath = path.resolve(process.cwd(), 'database.sqlite');

    // Abrimos la base
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    // Creamos la tabla
    await db.exec(`
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Guardamos el mail
    await db.run('INSERT INTO leads (email) VALUES (?)', [email]);
    
    console.log("MAIL GUARDADO CON ÉXITO EN:", dbPath);

    return NextResponse.json({ message: "VIP Access Granted" }, { status: 200 });

  } catch (error: any) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return NextResponse.json({ message: "Ya tenes pase vip reyna." }, { status: 400 });
    }
    console.error("ERROR DE DB:", error.message);
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  } finally {
    if (db) await db.close();
  }
}
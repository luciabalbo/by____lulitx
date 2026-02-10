export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-black text-white antialiased">
        {/* Eliminamos el div fixed que bloqueaba la visión */}
        {children}
      </body>
    </html>
  );
}
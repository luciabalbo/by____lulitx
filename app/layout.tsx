// app/layout.tsx
import { Inter, Space_Mono } from 'next/font/google'
import "./globals.css"; // Aseguráte de importar los estilos globales si los tenés

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceMono = Space_Mono({ 
  weight: ['400', '700'], 
  subsets: ['latin'], 
  variable: '--font-mono' 
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`}>
      <body style={{ margin: 0, background: '#000' }}>{children}</body>
    </html>
  )
}
// app/layout.tsx
import { Syne, Courier_Prime } from 'next/font/google' // Importamos Courier_Prime

const syne = Syne({ 
  weight: ['400', '700', '800'],
  subsets: ['latin'], 
  variable: '--font-syne' 
})

// Configuramos Courier Prime para que sea tu fuente mono oficial
const courier = Courier_Prime({ 
  weight: ['400', '700'],
  subsets: ['latin'], 
  variable: '--font-courier' 
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${courier.variable}`}>
      <body style={{ margin: 0, background: '#000' }}>{children}</body>
    </html>
  )
}
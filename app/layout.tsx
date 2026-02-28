// app/layout.tsx
import { Syne, Courier_Prime } from 'next/font/google'

const syne = Syne({ 
  weight: ['400', '700', '800'],
  subsets: ['latin'], 
  variable: '--font-syne',
  display: 'swap',
})

const courier = Courier_Prime({ 
  weight: ['400', '700'],
  subsets: ['latin'], 
  variable: '--font-courier',
  display: 'block', // 'block' obliga al iPhone a esperar la fuente y no poner la fea
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${courier.variable}`}>
      <body 
        style={{ 
          margin: 0, 
          background: '#000',
          /* ESTA LÍNEA ES LA MAGIA PARA IPHONE: */
          fontFamily: 'var(--font-courier), monospace' 
        }}
      >
        {children}
      </body>
    </html>
  )
}
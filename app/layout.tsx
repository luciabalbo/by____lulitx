import { Inter } from 'next/font/google'
import Head from 'next/head' // <-- IMPORTAMOS EL HEAD DE NEXT

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="p:domain_verify" content="0373d53777a4c2143eff1e389c6db190"/>
      </head>
      
      <body style={{ margin: 0, background: '#000' }}>
        {children}
      </body>
    </html>
  )
}
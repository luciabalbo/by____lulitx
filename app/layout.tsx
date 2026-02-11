// app/layout.tsx
import { Syne, JetBrains_Mono } from 'next/font/google'

const syne = Syne({ 
  weight: ['400', '700', '800'],
  subsets: ['latin'], 
  variable: '--font-syne' 
})

const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-mono' 
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${jetbrains.variable}`}>
      <body style={{ margin: 0, background: '#000' }}>{children}</body>
    </html>
  )
}
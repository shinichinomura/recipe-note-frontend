import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '口コミ交換所',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
      </body>
    </html>
  )
}

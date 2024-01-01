import type { Metadata } from 'next'
import Link from 'next/link'
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
      <body className="text-md text-gray-800">
        <div className="flex justify-between p-4">
          <div>

          </div>
          <div className="flex">
            <Link href="/signup" className="rounded-md ring-1 ring-emerald-600 text-emerald-600 hover:opacity-75 px-4 py-2 mx-1">会員登録</Link>
            <Link href=""  className="rounded-md ring-1 ring-emerald-600 text-emerald-600 hover:opacity-75 px-4 py-2 mx-1">ログイン</Link>
          </div>
        </div>
        <main className="my-4 px-4">
          {children}
        </main>
      </body>
    </html>
  )
}

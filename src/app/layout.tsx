import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { inter, rubik } from '@/app/fonts';
import { AppProvider } from '@/redux/provider';

export const metadata: Metadata = {
  title: 'Job Demo Frontend',
  description: 'Demo for technical assessment at Soluciones Jm',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-100`}>
        <nav className="navbar fixed right-0 left-0 top-0 px-5 lg:px-24 shadow-lg shadow-gray-200/20 bg-white border-gray-200 z-40">
          <div className='mx-auto container-fluid'>
            <Link href="/">
              <h1 className={`${rubik.className} text-slate-700 text-3xl p-3`}>Jobs Listing App</h1>
            </Link>
          </div>
        </nav>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <AppProvider>
            {children}
          </AppProvider>
        </main>
      </body>
    </html>
  )
}

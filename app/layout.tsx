import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Beatriz Faria",
  description: "Blog pessoal",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, padding: 0, background: '#fff', color: '#111', fontFamily: 'system-ui, sans-serif' }}>
        <Providers>
          <header style={{ padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: '10px', letterSpacing: '0.4em', color: '#999', textTransform: 'uppercase', display: 'block' }}>Blog</span>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 'normal', color: '#111', letterSpacing: '0.04em' }}>Beatriz Faria</span>
            </Link>
            <nav style={{ display: 'flex', gap: '32px' }}>
              <Link href="/" style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', textDecoration: 'none' }}>Posts</Link>
              <Link href="/admin" style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', textDecoration: 'none' }}>Admin</Link>
            </nav>
          </header>
          <main>{children}</main>
          <footer style={{ borderTop: '1px solid #f0f0f0', padding: '32px 48px', marginTop: '80px' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#bbb', textTransform: 'uppercase' }}>© 2026 Beatriz Faria</p>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
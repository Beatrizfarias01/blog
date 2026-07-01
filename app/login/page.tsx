'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const result = await signIn('credentials', { email, password, redirect: false })
    if (result?.error) setError('Email ou senha inválidos')
    else router.push('/admin')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <div style={{ width: '100%', maxWidth: '360px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.4em', color: '#999', textTransform: 'uppercase', marginBottom: '8px' }}>Acesso restrito</p>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 'normal', color: '#111' }}>Beatriz Faria</h1>
          <div style={{ width: '32px', height: '1px', background: '#111', margin: '16px auto 0' }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              border: 'none', borderBottom: '1px solid #ddd', padding: '12px 0',
              fontSize: '14px', outline: 'none', background: 'transparent',
              color: '#111', letterSpacing: '0.02em'
            }}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              border: 'none', borderBottom: '1px solid #ddd', padding: '12px 0',
              fontSize: '14px', outline: 'none', background: 'transparent',
              color: '#111', letterSpacing: '0.02em'
            }}
          />
          {error && <p style={{ fontSize: '12px', color: '#c00', textAlign: 'center' }}>{error}</p>}
          <button
            type="submit"
            style={{
              marginTop: '16px', padding: '14px', background: '#111', color: '#fff',
              border: 'none', fontSize: '11px', letterSpacing: '0.3em',
              textTransform: 'uppercase', cursor: 'pointer'
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
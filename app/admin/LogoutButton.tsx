'use client'
import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      style={{
        fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
        border: '1px solid #ddd', padding: '10px 20px', color: '#999',
        background: 'transparent', cursor: 'pointer'
      }}
    >
      Sair
    </button>
  )
}
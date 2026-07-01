import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import LogoutButton from './LogoutButton'
import DeleteButton from './DeleteButton'
import Link from 'next/link'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '80px 48px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '64px' }}>
        <div>
          <p style={{ fontSize: '10px', letterSpacing: '0.4em', color: '#999', textTransform: 'uppercase', marginBottom: '8px' }}>Painel</p>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '36px', fontWeight: 'normal', color: '#111', margin: 0 }}>Admin</h1>
          <p style={{ fontSize: '12px', color: '#bbb', marginTop: '8px' }}>{session.user?.email}</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '8px' }}>
          <Link href="/admin/posts/new" style={{
            fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase',
            border: '1px solid #111', padding: '10px 20px', color: '#111',
            textDecoration: 'none', display: 'inline-block'
          }}>
            + Novo Post
          </Link>
          <LogoutButton />
        </div>
      </div>

      {posts.length === 0 ? (
        <p style={{ fontSize: '14px', color: '#999' }}>Nenhum post criado ainda.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {posts.map((post, index) => (
            <li key={post.id} style={{ borderTop: index === 0 ? '1px solid #f0f0f0' : 'none', borderBottom: '1px solid #f0f0f0', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
              <div>
                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 'normal', color: '#111', margin: '0 0 4px' }}>{post.title}</h2>
                <span style={{ fontSize: '11px', letterSpacing: '0.05em', color: post.published ? '#2d7a2d' : '#999' }}>
                  {post.published ? 'Publicado' : 'Rascunho'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <Link href={`/admin/posts/${post.id}/edit`} style={{
                  fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
                  border: '1px solid #ddd', padding: '8px 16px', color: '#555',
                  textDecoration: 'none'
                }}>
                  Editar
                </Link>
                <DeleteButton id={post.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
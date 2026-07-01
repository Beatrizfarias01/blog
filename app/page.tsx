import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '80px 48px' }}>
      <div style={{ marginBottom: '64px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.4em', color: '#999', textTransform: 'uppercase', marginBottom: '12px' }}>Escritos</p>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '36px', fontWeight: 'normal', color: '#111', lineHeight: 1.2 }}>Todos os posts</h2>
        <div style={{ width: '40px', height: '1px', background: '#111', marginTop: '20px' }} />
      </div>

      {posts.length === 0 ? (
        <p style={{ fontSize: '14px', color: '#999', letterSpacing: '0.05em' }}>Nenhum post publicado ainda.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {posts.map((post, index) => (
            <li key={post.id} style={{ borderTop: index === 0 ? '1px solid #f0f0f0' : 'none', borderBottom: '1px solid #f0f0f0' }}>
              <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '28px 0', gap: '24px' }}>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', color: '#111', margin: 0, transition: 'opacity 0.2s' }}>
                  {post.title}
                </h3>
                <span style={{ fontSize: '11px', color: '#bbb', whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>
                  {new Date(post.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              </Link>
              {post.excerpt && (
                <p style={{ fontSize: '13px', color: '#888', paddingBottom: '24px', marginTop: '-8px', lineHeight: 1.6 }}>{post.excerpt}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
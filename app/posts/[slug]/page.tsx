import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await prisma.post.findUnique({ where: { slug } })
  if (!post || !post.published) notFound()

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '80px 48px' }}>
      <Link href="/" style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#999', textDecoration: 'none' }}>
        ← Voltar
      </Link>

      <div style={{ marginTop: '48px', marginBottom: '56px' }}>
        <p style={{ fontSize: '11px', color: '#bbb', letterSpacing: '0.1em', marginBottom: '16px' }}>
          {new Date(post.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
        </p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '40px', fontWeight: 'normal', color: '#111', lineHeight: 1.15, margin: 0 }}>
          {post.title}
        </h1>
        {post.excerpt && (
          <p style={{ fontSize: '16px', color: '#888', marginTop: '20px', lineHeight: 1.6, fontStyle: 'italic' }}>{post.excerpt}</p>
        )}
        <div style={{ width: '40px', height: '1px', background: '#111', marginTop: '32px' }} />
      </div>

      <div style={{ fontSize: '16px', lineHeight: 1.8, color: '#333', whiteSpace: 'pre-wrap' }}>
        {post.content}
      </div>
    </div>
  )
}
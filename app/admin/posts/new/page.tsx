'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewPostPage() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function handleTitleChange(value: string) {
    setTitle(value)
    setSlug(
      value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, content, excerpt, published: true }),
    })

    setLoading(false)

    if (res.ok) {
      router.push('/admin')
    } else {
      alert('Erro ao criar post')
    }
  }

  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Novo Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          placeholder="Slug (gerado automaticamente)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm text-gray-500"
          required
        />
        <textarea
          placeholder="Resumo curto (opcional)"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full border rounded px-3 py-2"
          rows={2}
        />
        <textarea
          placeholder="Conteúdo (em Markdown)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded px-3 py-2 font-mono text-sm"
          rows={12}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? 'Salvando...' : 'Publicar'}
        </button>
      </form>
    </main>
  )
}
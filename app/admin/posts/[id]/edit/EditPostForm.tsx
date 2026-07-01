'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  published: boolean
}

export default function EditPostForm({ post }: { post: Post }) {
  const [title, setTitle] = useState(post.title)
  const [slug, setSlug] = useState(post.slug)
  const [content, setContent] = useState(post.content)
  const [excerpt, setExcerpt] = useState(post.excerpt ?? '')
  const [published, setPublished] = useState(post.published)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    await fetch(`/api/posts/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, content, excerpt, published }),
    })

    setLoading(false)
    router.push('/admin')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded px-3 py-2"
        placeholder="Título"
        required
      />
      <input
        type="text"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm text-gray-500"
        placeholder="Slug"
        required
      />
      <textarea
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        className="w-full border rounded px-3 py-2"
        placeholder="Resumo curto (opcional)"
        rows={2}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded px-3 py-2 font-mono text-sm"
        placeholder="Conteúdo (Markdown)"
        rows={12}
        required
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        Publicado
      </label>
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? 'Salvando...' : 'Salvar alterações'}
      </button>
    </form>
  )
}
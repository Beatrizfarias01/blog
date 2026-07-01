'use client'
import { useRouter } from 'next/navigation'

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Deletar este post?')) return
    await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      style={{
        fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
        border: '1px solid #fcc', padding: '8px 16px', color: '#c00',
        background: 'transparent', cursor: 'pointer'
      }}
    >
      Deletar
    </button>
  )
}
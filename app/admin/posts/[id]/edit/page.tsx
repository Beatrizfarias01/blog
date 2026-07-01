import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import EditPostForm from './EditPostForm'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await prisma.post.findUnique({ where: { id } })
  if (!post) notFound()
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Editar Post</h1>
      <EditPostForm post={post} />
    </main>
  )
}
import { posts } from '@/lib/placeholder-data'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { CommentForm } from '@/components/blog/comment-form'
import { CommentCard } from '@/components/blog/comment-card'
import { Separator } from '@/components/ui/separator'

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Placeholder comments
  const comments = [
    {
      id: '1',
      author: 'Adebayo',
      avatarUrl: 'https://picsum.photos/50/50',
      timestamp: '2 hours ago',
      content: 'Great article! Really helped me understand the basics of budgeting.',
      votes: 15,
    },
    {
      id: '2',
      author: 'Chioma',
      avatarUrl: 'https://picsum.photos/50/50',
      timestamp: '1 hour ago',
      content: 'Thanks for sharing! The side hustle ideas are very practical.',
      votes: 8,
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <article>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          {post.title}
        </h1>
        <p className="text-muted-foreground mb-6">
          By {post.author} on {post.date}
        </p>
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={800}
          height={400}
          className="w-full rounded-lg object-cover mb-8"
          data-ai-hint="financial literacy"
        />
        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <Separator className="my-12" />

      <section className="space-y-8">
        <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
        <CommentForm />
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      </section>
    </div>
  )
}

import { posts } from '@/lib/placeholder-data'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

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

  return (
    <article className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
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
  )
}

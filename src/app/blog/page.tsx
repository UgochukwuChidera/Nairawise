import Link from 'next/link'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { posts } from '@/lib/placeholder-data'
import { CreatePostForm } from '@/components/blog/create-post-form'

export default function BlogPage() {
  return (
    <div>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Finance Blog</h1>
            <CreatePostForm />
        </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug}>
            <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint="finance blog"
                />
              </CardHeader>
              <div className="p-6 flex-grow flex flex-col">
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <CardDescription className="mt-2 flex-grow">{post.description}</CardDescription>
              </div>
              <CardFooter>
                 <p className="text-sm text-muted-foreground">{post.author} • {post.date}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

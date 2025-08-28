
'use client'

import * as React from 'react'
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
import { posts as initialPosts } from '@/lib/placeholder-data'
import { CreatePostForm } from '@/components/blog/create-post-form'
import { FilterToolbar, type SortOption } from '@/components/filter-toolbar'

export default function BlogPage() {
  const [posts, setPosts] = React.useState(initialPosts);
  
  const handleSort = (sortOption: SortOption) => {
    const sortedPosts = [...initialPosts].sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'popular':
          return (b.views ?? 0) - (a.views ?? 0);
        default:
          return 0;
      }
    });
    setPosts(sortedPosts);
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Finance Blog</h1>
            <p className="text-muted-foreground mt-2">Insights and tips to help you manage your finances.</p>
        </div>
        <div className="flex items-center gap-2">
            <CreatePostForm />
        </div>
      </div>

      <FilterToolbar onSortChange={handleSort} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
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

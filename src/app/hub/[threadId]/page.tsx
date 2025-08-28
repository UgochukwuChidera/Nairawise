import { threads } from '@/lib/placeholder-data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MessageSquare } from 'lucide-react'
import { CommentForm } from '@/components/blog/comment-form'
import { Separator } from '@/components/ui/separator'
import { ReplyCard } from '@/components/hub/reply-card'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'

export async function generateStaticParams() {
  return threads.map((thread) => ({
    threadId: thread.id,
  }))
}

export default function ThreadPage({
  params,
}: {
  params: { threadId: string }
}) {
  const thread = threads.find((t) => t.id === params.threadId)

  if (!thread) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/hub"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Hub
      </Link>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">{thread.title}</CardTitle>
          <CardDescription>
            Posted by {thread.author} • {thread.timestamp}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{thread.content}</p>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>{thread.replies} replies</span>
          </div>
        </CardFooter>
      </Card>

      <section className="space-y-8">
        <h2 className="text-2xl font-bold">Replies</h2>
        <CommentForm />
        <Separator />
        <div className="space-y-6">
          {thread.comments?.map((comment) => (
            <ReplyCard key={comment.id} comment={comment} />
          ))}
        </div>
      </section>
    </div>
  )
}

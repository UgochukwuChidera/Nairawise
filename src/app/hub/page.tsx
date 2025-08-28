import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { threads } from '@/lib/placeholder-data'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'

export default function HubPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Discussion Hub</h1>
        <Button>Start a New Discussion</Button>
      </div>
      <div className="space-y-4">
        {threads.map((thread) => (
          <Card key={thread.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">
                <Link href={`/hub/${thread.id}`} className="hover:underline">
                    {thread.title}
                </Link>
              </CardTitle>
              <CardDescription>
                Posted by {thread.author} • {thread.timestamp}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">{thread.content}</p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                <span>{thread.replies} replies</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

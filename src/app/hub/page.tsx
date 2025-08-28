
'use client'

import * as React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { threads as initialThreads } from '@/lib/placeholder-data'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { StartDiscussionDialog } from '@/components/hub/start-discussion-dialog'
import { FilterToolbar, type SortOption } from '@/components/filter-toolbar'

export default function HubPage() {
    const [threads, setThreads] = React.useState(initialThreads);

    const handleSort = (sortOption: SortOption) => {
        const sortedThreads = [...initialThreads].sort((a, b) => {
            switch (sortOption) {
                case 'newest':
                    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
                case 'oldest':
                    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
                case 'popular':
                    return (b.views ?? 0) - (a.views ?? 0);
                default:
                    return 0;
            }
        });
        setThreads(sortedThreads);
    };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Discussion Hub</h1>
            <p className="text-muted-foreground mt-2">Ask questions, share tips, and connect with other students.</p>
        </div>
        <StartDiscussionDialog />
      </div>
      
      <FilterToolbar onSortChange={handleSort} />

      <div className="space-y-4 mt-6">
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

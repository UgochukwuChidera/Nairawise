'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export function CommentForm() {
  return (
    <div className="flex w-full items-start gap-4">
      <Avatar>
        <AvatarImage src="https://picsum.photos/50/50" alt="Current User" data-ai-hint="person" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <form className="flex-1 space-y-3">
        <Textarea
          placeholder="Add a comment..."
          rows={3}
        />
        <div className="flex justify-end">
          <Button>Post Comment</Button>
        </div>
      </form>
    </div>
  )
}

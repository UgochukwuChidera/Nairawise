'use client'

import * as React from 'react'
import EmojiPicker, { type EmojiClickData } from 'emoji-picker-react'
import { Smile } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export function CommentForm() {
  const [commentText, setCommentText] = React.useState('')
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null)

  const onEmojiClick = (emojiData: EmojiClickData) => {
    const ref = textAreaRef.current
    if (!ref) return

    const start = ref.value.substring(0, ref.selectionStart)
    const end = ref.value.substring(ref.selectionStart)
    const text = `${start}${emojiData.emoji}${end}`
    
    setCommentText(text)
    
    // Set cursor position after the inserted emoji
    const newCursorPosition = start.length + emojiData.emoji.length;
    setTimeout(() => {
        ref.selectionStart = ref.selectionEnd = newCursorPosition;
        ref.focus();
    }, 0);
  }

  return (
    <div className="flex w-full items-start gap-4">
      <Avatar>
        <AvatarImage src="https://picsum.photos/50/50" alt="Current User" data-ai-hint="person" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <form className="flex-1 space-y-3">
        <div className="relative">
          <Textarea
            ref={textAreaRef}
            placeholder="Add a comment..."
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="pr-10"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-7 w-7"
              >
                <Smile className="h-4 w-4" />
                <span className="sr-only">Add an emoji</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex justify-end">
          <Button>Post Comment</Button>
        </div>
      </form>
    </div>
  )
}

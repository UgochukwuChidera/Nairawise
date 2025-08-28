'use client'

import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  ArrowUp,
  ArrowDown,
  Smile,
  Flag,
  Reply,
  Share2,
  MoreHorizontal,
} from '@/components/icons'
import EmojiPicker from 'emoji-picker-react'
import type { ThreadComment } from '@/lib/types'
import { CommentForm } from '../blog/comment-form'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'

type ReplyCardProps = {
  comment: ThreadComment,
  level?: number,
}

export function ReplyCard({ comment, level = 0 }: ReplyCardProps) {
    const [isReplying, setIsReplying] = React.useState(false);
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    const toggleReply = () => setIsReplying(prev => !prev);
    const reactions = ['❤️', '😂', '👍', '🔥', '🎉', '🤔'];

  return (
    <Collapsible open={!isCollapsed} onOpenChange={setIsCollapsed}>
      <div className="flex gap-3">
        <div className="flex flex-col items-center">
            <Avatar className="h-8 w-8">
            <AvatarImage src={comment.avatarUrl} alt={comment.author} data-ai-hint="person" />
            <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
            </Avatar>
            {comment.replies && comment.replies.length > 0 && (
                <CollapsibleTrigger asChild>
                    <div className="flex-1 w-px bg-border hover:bg-primary cursor-pointer my-2" />
                </CollapsibleTrigger>
            )}
        </div>
      
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm">{comment.author}</p>
              <p className="text-xs text-muted-foreground">
                • {comment.timestamp}
              </p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </div>
          
          <CollapsibleContent>
            <p className="text-muted-foreground mt-1 text-sm">{comment.content}</p>
            <div className="mt-2 flex items-center gap-1 text-muted-foreground">
              <TooltipProvider>
                {/* Voting */}
                <div className="flex items-center gap-0.5 rounded-full bg-muted p-0.5">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent><p>Upvote</p></TooltipContent>
                  </Tooltip>
                  <span className="text-xs font-semibold min-w-[12px] text-center">{comment.votes}</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent><p>Downvote</p></TooltipContent>
                  </Tooltip>
                </div>

                {/* Reply */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="rounded-full gap-2" onClick={toggleReply}>
                      <Reply className="h-4 w-4" />
                      <span className="text-xs">Reply</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Reply to comment</p></TooltipContent>
                </Tooltip>

                {/* Reactions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Smile className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex gap-1 p-1">
                    {reactions.map((reaction) => (
                      <DropdownMenuItem key={reaction} asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-lg">
                          {reaction}
                        </Button>
                      </DropdownMenuItem>
                    ))}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-lg">+</Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <EmojiPicker />
                      </PopoverContent>
                    </Popover>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Share */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Share</p></TooltipContent>
                </Tooltip>

                {/* Flag */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-destructive/80 hover:text-destructive">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Report</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            {isReplying && (
                <div className="mt-4">
                    <CommentForm />
                </div>
            )}

            {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 space-y-4">
                    {comment.replies.map(reply => (
                        <ReplyCard key={reply.id} comment={reply} level={level + 1} />
                    ))}
                </div>
            )}
           </CollapsibleContent>
        </div>
      </div>
    </Collapsible>
  )
}

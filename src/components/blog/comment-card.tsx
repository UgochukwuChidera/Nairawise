
'use client'

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

type Comment = {
  id: string
  author: string
  avatarUrl: string
  timestamp: string
  content: string
  votes: number
}

type CommentCardProps = {
  comment: Comment
}

export function CommentCard({ comment }: CommentCardProps) {
  const reactions = ['❤️', '😂', '👍', '🔥', '🎉', '🤔']

  return (
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage src={comment.avatarUrl} alt={comment.author} data-ai-hint="person" />
        <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="font-semibold">{comment.author}</p>
            <p className="text-xs text-muted-foreground">
              • {comment.timestamp}
            </p>
          </div>
           <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal />
              <span className="sr-only">More options</span>
            </Button>
        </div>
        <p className="text-muted-foreground mt-1">{comment.content}</p>
        <div className="mt-2 flex items-center gap-2 text-muted-foreground">
          <TooltipProvider>
            {/* Voting */}
            <div className="flex items-center gap-1 rounded-full bg-muted p-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upvote</p>
                </TooltipContent>
              </Tooltip>
              <span className="text-sm font-semibold">{comment.votes}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Downvote</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Reply */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Reply className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reply</p>
              </TooltipContent>
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
                    <PopoverContent className="w-auto p-0 border-0">
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
              <TooltipContent>
                <p>Share</p>
              </TooltipContent>
            </Tooltip>

             {/* Flag */}
             <Tooltip>
              <TooltipTrigger asChild>
                 <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-destructive/80 hover:text-destructive">
                    <Flag className="h-4 w-4" />
                  </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Report</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}

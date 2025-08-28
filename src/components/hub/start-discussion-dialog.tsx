"use client"

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '../ui/scroll-area'
import { Textarea } from '../ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Smile } from 'lucide-react'
import EmojiPicker, { type EmojiClickData } from 'emoji-picker-react'

export function StartDiscussionDialog() {
  const [open, setOpen] = React.useState(false)
  const [contentText, setContentText] = React.useState('')
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null)

  const onEmojiClick = (emojiData: EmojiClickData) => {
    const ref = textAreaRef.current
    if (!ref) return

    const start = ref.value.substring(0, ref.selectionStart)
    const end = ref.value.substring(ref.selectionStart)
    const text = `${start}${emojiData.emoji}${end}`
    
    setContentText(text)
    
    // Set cursor position after the inserted emoji
    const newCursorPosition = start.length + emojiData.emoji.length;
    setTimeout(() => {
        ref.selectionStart = ref.selectionEnd = newCursorPosition;
        ref.focus();
    }, 0);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Start a New Discussion</Button>
      </DialogTrigger>
      <DialogContent className="h-screen w-screen max-w-full flex flex-col p-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle>Start a New Discussion</DialogTitle>
          <DialogDescription>
            What's on your mind? Share your thoughts with the community.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="container mx-auto max-w-4xl py-8 px-4">
              <div className="space-y-6">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="title">Discussion Title</Label>
                  <Input type="text" id="title" placeholder="A clear and concise title" className="text-2xl h-12" />
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="content">Your Message</Label>
                    <div className="relative">
                      <Textarea 
                        id="content"
                        ref={textAreaRef}
                        value={contentText}
                        onChange={(e) => setContentText(e.target.value)}
                        placeholder="Share more details here. Be respectful and constructive." 
                        className="min-h-[250px] text-base pr-12"
                      />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-2 h-8 w-8"
                          >
                            <Smile className="h-5 w-5" />
                            <span className="sr-only">Add an emoji</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 border-0">
                          <EmojiPicker onEmojiClick={onEmojiClick} />
                        </PopoverContent>
                      </Popover>
                    </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        <DialogFooter className="p-6 border-t bg-background">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Post Discussion</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

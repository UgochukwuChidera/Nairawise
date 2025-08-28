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

export function StartDiscussionDialog() {
  const [open, setOpen] = React.useState(false)

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
                    <Textarea 
                      id="content" 
                      placeholder="Share more details here. Be respectful and constructive." 
                      className="min-h-[250px] text-base"
                    />
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

"use client"

import * as React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EditorToolbar } from './editor-toolbar'
import { ScrollArea } from '../ui/scroll-area'
import { X } from 'lucide-react'

export function CreatePostForm() {
  const [open, setOpen] = React.useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextStyle,
      Color,
    ],
    content: '<p>Write your amazing blog post here...</p>',
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none w-full max-w-none p-4 border rounded-md min-h-[300px]',
      },
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Post</Button>
      </DialogTrigger>
      <DialogContent className="h-screen w-screen max-w-full flex flex-col p-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle>Create New Blog Post</DialogTitle>
          <DialogDescription>
            Fill out the details below and write your content.
          </DialogDescription>
           <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </DialogClose>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="container mx-auto max-w-4xl py-8 px-4">
              <div className="space-y-6">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="title">Post Title</Label>
                  <Input type="text" id="title" placeholder="Your post title" className="text-2xl h-12" />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="image">Featured Image</Label>
                  <Input id="image" type="file" />
                </div>
                
                <div className="space-y-2">
                    <Label>Content</Label>
                    {editor && <EditorToolbar editor={editor} />}
                    <EditorContent editor={editor} />
                </div>

              </div>
            </div>
          </ScrollArea>
        </div>

        <DialogFooter className="p-6 border-t bg-background">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Publish Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

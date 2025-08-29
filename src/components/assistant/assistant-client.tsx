
'use client'

import { useActionState, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { getFinancialAnalysis, type FormState } from '@/app/assistant/actions'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Terminal, Bot, Send, Loader2, Plus } from 'lucide-react'
import { ScrollArea } from '../ui/scroll-area'
import { Card, CardContent } from '../ui/card'

const initialState: FormState = {
  success: false,
  message: '',
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="icon" disabled={pending} className="rounded-full">
      {pending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Send />
      )}
      <span className="sr-only">Get Advice</span>
    </Button>
  )
}

export function AssistantClient() {
  const [state, formAction] = useActionState(getFinancialAnalysis, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleTextareaInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = event.currentTarget
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    formAction(formData)

    if (state.success && formRef.current) {
      formRef.current.reset()
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  return (
    <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="py-8">
            {state.success && state.data ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <div className="prose prose-sm dark:prose-invert max-w-none flex-1">
                      <h2>{state.data.summary}</h2>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: state.data.recommendations.replace(/\n/g, '<br />'),
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="sticky bottom-6 w-full px-4">
        {!state.success && state.message && (
          <Alert variant="destructive" className="mb-4">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}
        <div className="relative">
          <Card className="shadow-2xl rounded-full p-2">
            <form ref={formRef} onSubmit={handleFormSubmit} className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="shrink-0 rounded-full">
                    <Plus />
                    <span className="sr-only">Attach file</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="mb-2">
                  <DropdownMenuItem>CSV Input</DropdownMenuItem>
                  <DropdownMenuItem>Text Input</DropdownMenuItem>
                  <DropdownMenuItem>JSON Input</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Textarea
                ref={textareaRef}
                placeholder="Ask anything"
                id="transactions"
                name="transactions"
                rows={1}
                onInput={handleTextareaInput}
                required
                className="flex-1 resize-none max-h-48 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 border-0 shadow-none p-0"
              />
              <SubmitButton />
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

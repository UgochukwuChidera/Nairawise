'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { getFinancialAnalysis, type FormState } from '@/app/assistant/actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal, Bot } from 'lucide-react'

const initialState: FormState = {
  success: false,
  message: '',
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Analyzing...' : 'Get Advice'}
    </Button>
  )
}

export function AssistantClient() {
  const [state, formAction] = useActionState(getFinancialAnalysis, initialState)

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
            <CardTitle>Your Transactions</CardTitle>
            <CardDescription>Paste your transactions below. Include date, description, and amount.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="grid w-full gap-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="transactions">Transactions</Label>
                <Textarea
                  placeholder="e.g., Oct 5, Groceries, -7500"
                  id="transactions"
                  name="transactions"
                  rows={10}
                  required
                />
              </div>
              {!state.success && state.message && (
                <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {state.message}
                    </AlertDescription>
                </Alert>
              )}
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5"/> AI Analysis</CardTitle>
            <CardDescription>Personalized advice based on your spending.</CardDescription>
        </CardHeader>
        <CardContent>
          {state.success && state.data ? (
            <div className="prose prose-sm dark:prose-invert max-w-none">
                <h2>{state.data.summary}</h2>
                <div dangerouslySetInnerHTML={{ __html: state.data.recommendations.replace(/\n/g, '<br />') }} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Your financial advice will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

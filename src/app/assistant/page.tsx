import { AssistantClient } from '@/components/assistant/assistant-client'

export default function AssistantPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Smart Finance Assistant</h1>
        <p className="text-muted-foreground mt-2">
          Get personalized financial advice by analyzing your spending habits. Paste your transaction history below.
        </p>
      </div>
      <AssistantClient />
    </div>
  )
}

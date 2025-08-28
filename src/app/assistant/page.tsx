import { AssistantClient } from '@/components/assistant/assistant-client'

export default function AssistantPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-128px)]">
      <div className="text-center pt-8 pb-4">
        <h1 
            className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground"
        >
            Smart Finance Assistant
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Get personalized financial advice by analyzing your spending habits. Paste your transaction history below or upload a file.
        </p>
      </div>
      <AssistantClient />
    </div>
  )
}

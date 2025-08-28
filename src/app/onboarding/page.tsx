import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function OnboardingPage() {
  const features = [
    {
      title: 'Track Your Budget',
      description: 'Create custom budgets and monitor your spending in real-time.',
      link: '/budget',
    },
    {
      title: 'Manage Bills',
      description: 'Never miss a due date again with our simple bill tracker.',
      link: '/bills',
    },
    {
      title: 'Get AI-Powered Advice',
      description: 'Use our Smart Assistant to analyze your habits and find savings.',
      link: '/assistant',
    },
    {
      title: 'Engage with the Community',
      description: 'Join discussions in the Hub to share tips and learn from others.',
      link: '/hub',
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to NairaWise!
        </h1>
        <p className="text-muted-foreground mt-2">
          Your journey to financial freedom starts here. Here’s how to get started:
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <Button asChild variant="outline">
                <Link href={feature.link}>Go to {feature.title.split(' ')[0]}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
       <div className="mt-12 text-center">
         <Button asChild size="lg">
            <Link href="/">Go to Dashboard</Link>
         </Button>
       </div>
    </div>
  )
}

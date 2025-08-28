import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function FAQPage() {
  const faqs = [
    {
      question: 'Is NairaWise free to use?',
      answer: 'NairaWise offers a freemium model. Core features are available for free, but a subscription is required for advanced analytics and the AI assistant.',
    },
    {
      question: 'How secure is my financial data?',
      answer: 'We prioritize your security. All data is encrypted both in transit and at rest. We do not share your personal financial information with third parties.',
    },
    {
      question: 'Can I connect my bank account?',
      answer: 'Currently, we do not support direct bank connections. All transaction data is manually entered to give you full control over what you share.',
    },
    {
      question: 'How does the Smart Finance Assistant work?',
      answer: "The assistant uses a secure AI model to analyze the transaction data you provide. It identifies patterns and offers personalized, actionable advice based on your spending habits and financial goals.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground mt-2">
          Find answers to common questions about NairaWise.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-semibold text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-background/95 px-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
      <div className="container mx-auto flex h-16 items-center justify-center gap-6 text-sm text-muted-foreground">
        <Link href="/faq" className="transition-colors hover:text-primary">
          FAQs
        </Link>
        <Link href="/onboarding" className="transition-colors hover:text-primary">
          Onboarding
        </Link>
      </div>
    </footer>
  )
}

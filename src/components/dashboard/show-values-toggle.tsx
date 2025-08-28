"use client"

import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSettings } from "@/context/settings-context"

export function ShowValuesToggle() {
  const { showMonetaryValues, toggleMonetaryValues } = useSettings()

  return (
    <Button variant="ghost" size="icon" onClick={toggleMonetaryValues} className="rounded-full shrink-0">
        {showMonetaryValues ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        <span className="sr-only">Toggle monetary values</span>
    </Button>
  )
}

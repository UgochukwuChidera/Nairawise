"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Laptop } from "lucide-react"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex w-full items-center gap-2 rounded-lg bg-muted p-1 md:w-auto">
      <Button
        variant={theme === "light" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => setTheme("light")}
        className={cn("w-full justify-center gap-2", theme === "light" && "shadow-sm")}
      >
        <Sun className="h-4 w-4" />
        Light
      </Button>
      <Button
        variant={theme === "dark" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => setTheme("dark")}
        className={cn("w-full justify-center gap-2", theme === "dark" && "shadow-sm")}
      >
        <Moon className="h-4 w-4" />
        Dark
      </Button>
      <Button
        variant={theme === "system" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => setTheme("system")}
        className={cn("w-full justify-center gap-2", theme === "system" && "shadow-sm")}
      >
        <Laptop className="h-4 w-4" />
        System
      </Button>
    </div>
  )
}

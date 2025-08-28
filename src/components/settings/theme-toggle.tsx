"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

type ThemeValue = "light" | "dark" | "system";

const OPTIONS: { value: ThemeValue; label: string; icon: React.ReactElement }[] = [
  { value: "light",  label: "Light",  icon: <Sun  className="h-4 w-4" /> },
  { value: "dark",   label: "Dark",   icon: <Moon className="h-4 w-4" /> },
  { value: "system", label: "System", icon: <Monitor className="h-4 w-4" /> },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="inline-flex w-full rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
      {OPTIONS.map((opt, i) => {
        const active = theme === opt.value;

        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            aria-label={`${opt.label} theme`}
            onClick={() => setTheme(opt.value)}
            className={[
              "flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500",
              // visual separator between segments
              i > 0 && "border-l border-gray-200 dark:border-gray-600",
              active
                ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                : "bg-white text-gray-700 dark:bg-transparent dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {opt.icon}
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

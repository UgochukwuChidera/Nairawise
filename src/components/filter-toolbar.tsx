
"use client"

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Flame, ArrowUp, ArrowDown } from 'lucide-react'

export type SortOption = 'newest' | 'oldest' | 'popular'

type FilterToolbarProps = {
  onSortChange: (option: SortOption) => void;
}

export function FilterToolbar({ onSortChange }: FilterToolbarProps) {
  const [activeButton, setActiveButton] = React.useState<SortOption>('newest')

  const handleButtonClick = (option: SortOption) => {
    setActiveButton(option)
    onSortChange(option)
  }

  return (
    <div className="flex items-center gap-2 p-1 rounded-lg bg-muted w-full md:w-auto">
      <Button
        variant={activeButton === 'newest' ? 'secondary' : 'ghost'}
        className="flex-1 md:flex-none"
        onClick={() => handleButtonClick('newest')}
      >
        <ArrowDown className="mr-2 h-4 w-4" />
        Newest
      </Button>
      <Button
        variant={activeButton === 'oldest' ? 'secondary' : 'ghost'}
        className="flex-1 md:flex-none"
        onClick={() => handleButtonClick('oldest')}
      >
        <ArrowUp className="mr-2 h-4 w-4" />
        Oldest
      </Button>
      <Button
        variant={activeButton === 'popular' ? 'secondary' : 'ghost'}
        className="flex-1 md:flex-none"
        onClick={() => handleButtonClick('popular')}
      >
        <Flame className="mr-2 h-4 w-4" />
        Popular
      </Button>
    </div>
  )
}

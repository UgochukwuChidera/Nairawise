
"use client"

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Flame, ArrowUp, ArrowDown, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export type SortOption = 'newest' | 'oldest' | 'popular'

type FilterToolbarProps = {
  onSortChange: (option: SortOption) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchPlaceholder: string;
}

export function FilterToolbar({ onSortChange, searchQuery, setSearchQuery, searchPlaceholder }: FilterToolbarProps) {
  const [activeButton, setActiveButton] = React.useState<SortOption>('newest')

  const handleButtonClick = (option: SortOption) => {
    setActiveButton(option)
    onSortChange(option)
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
                type="search"
                placeholder={searchPlaceholder}
                className="w-full pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
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
    </div>
  )
}

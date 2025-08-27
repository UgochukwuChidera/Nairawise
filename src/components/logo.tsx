import { CircleDollarSign } from 'lucide-react'

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <CircleDollarSign className="h-6 w-6" />
      <span className="text-xl font-semibold">NairaWise</span>
    </div>
  )
}

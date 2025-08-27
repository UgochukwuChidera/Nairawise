export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary text-primary-foreground rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M5 18h14" />
            <path d="M12 5v14" />
            <path d="m8 8-3 3 3 3" />
            <path d="m16 16 3-3-3-3" />
          </svg>
      </div>
      <span className="text-lg font-semibold">NairaWise</span>
    </div>
  )
}

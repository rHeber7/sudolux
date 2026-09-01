import { Grid3x3 } from 'lucide-react'
import { ThemeToggle } from '@/components/theme/theme-toggle'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[0_0_20px_-4px_var(--color-primary)]">
            <Grid3x3 className="size-5" />
          </span>
          <div className="leading-tight">
            <p className="font-sans text-lg font-bold tracking-tight">
              Puzzle Lab
            </p>
            <p className="text-xs text-muted-foreground">
              A lab for logic puzzles
            </p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}

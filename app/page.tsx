import { SiteHeader } from '@/components/site-header'
import { SudokuGame } from '@/components/sudoku/sudoku-game'

export default function Page() {
  return (
    <div className="relative flex min-h-svh flex-col">
      {/* Ambient futuristic glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-70"
        style={{
          background:
            'radial-gradient(60% 50% at 50% -10%, color-mix(in oklch, var(--color-primary) 22%, transparent), transparent 70%)',
        }}
      />
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-balance font-sans text-3xl font-bold tracking-tight sm:text-4xl">
            Sudoku
          </h1>
          <p className="mt-2 text-pretty text-sm text-muted-foreground sm:text-base">
            Fill the grid so every row, column, and 3×3 box contains 1–9.
          </p>
        </div>
        <SudokuGame />
      </main>
    </div>
  )
}

'use client'

import { Eraser } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NumberPadProps {
  remaining: number[]
  disabled: boolean
  onInput: (value: number) => void
  onErase: () => void
}

export function NumberPad({
  remaining,
  disabled,
  onInput,
  onErase,
}: NumberPadProps) {
  return (
    <div className="grid w-full max-w-[min(92vw,540px)] grid-cols-5 gap-2 sm:grid-cols-10">
      {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => {
        const done = remaining[n] <= 0
        return (
          <button
            key={n}
            type="button"
            disabled={disabled || done}
            onClick={() => onInput(n)}
            className={cn(
              'relative flex aspect-square items-center justify-center rounded-lg border border-border bg-card font-mono text-xl font-semibold text-foreground transition-all',
              'hover:border-primary hover:bg-accent hover:text-accent-foreground',
              'active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'disabled:cursor-not-allowed disabled:opacity-35',
            )}
            aria-label={`Enter ${n}${done ? ' (all placed)' : ''}`}
          >
            {n}
          </button>
        )
      })}
      <button
        type="button"
        disabled={disabled}
        onClick={onErase}
        className={cn(
          'col-span-5 flex items-center justify-center gap-2 rounded-lg border border-border bg-card py-3 text-sm font-medium text-foreground transition-all sm:col-span-1 sm:aspect-square sm:py-0',
          'hover:border-destructive hover:bg-destructive/10 hover:text-destructive',
          'active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'disabled:cursor-not-allowed disabled:opacity-35',
        )}
        aria-label="Erase cell"
      >
        <Eraser className="size-5" />
        <span className="sm:hidden">Erase</span>
      </button>
    </div>
  )
}

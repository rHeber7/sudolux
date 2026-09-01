'use client'

import {
  DIFFICULTIES,
  DIFFICULTY_LABELS,
  type Difficulty,
} from '@/lib/puzzles/sudoku'
import { cn } from '@/lib/utils'

interface DifficultySelectorProps {
  value: Difficulty
  onChange: (difficulty: Difficulty) => void
}

export function DifficultySelector({
  value,
  onChange,
}: DifficultySelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Difficulty"
      className="inline-flex w-full flex-wrap gap-1 rounded-xl border border-border bg-card p-1 sm:w-auto"
    >
      {DIFFICULTIES.map((d) => {
        const active = d === value
        return (
          <button
            key={d}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(d)}
            className={cn(
              'flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors sm:flex-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              active
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            {DIFFICULTY_LABELS[d]}
          </button>
        )
      })}
    </div>
  )
}

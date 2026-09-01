'use client'

import { cn } from '@/lib/utils'

interface SudokuCellProps {
  value: number
  row: number
  col: number
  given: boolean
  selected: boolean
  peer: boolean
  sameValue: boolean
  conflict: boolean
  error: boolean
  onSelect: (row: number, col: number) => void
}

export function SudokuCell({
  value,
  row,
  col,
  given,
  selected,
  peer,
  sameValue,
  conflict,
  error,
  onSelect,
}: SudokuCellProps) {
  const thickRight = col % 3 === 2 && col !== 8
  const thickBottom = row % 3 === 2 && row !== 8

  return (
    <button
      type="button"
      onClick={() => onSelect(row, col)}
      aria-label={`Row ${row + 1}, column ${col + 1}${value ? `, value ${value}` : ', empty'}`}
      data-selected={selected || undefined}
      className={cn(
        'relative flex aspect-square items-center justify-center',
        'font-mono text-[clamp(1rem,4.2vw,1.6rem)] font-semibold leading-none',
        'border-r border-b border-grid-line transition-colors duration-150',
        'outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
        thickRight && 'border-r-2 border-r-grid-line-strong',
        thickBottom && 'border-b-2 border-b-grid-line-strong',
        // background priority
        error
          ? 'bg-cell-error'
          : selected
            ? 'bg-cell-selected'
            : sameValue
              ? 'bg-cell-highlight'
              : peer
                ? 'bg-cell-peer'
                : 'bg-card hover:bg-cell-peer',
        // text color
        error
          ? 'text-cell-error-foreground'
          : conflict
            ? 'text-destructive'
            : given
              ? 'text-cell-given'
              : 'text-cell-user',
        given ? 'cursor-default' : 'cursor-pointer',
      )}
    >
      {value !== 0 ? value : ''}
      {selected && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 ring-2 ring-inset ring-primary"
        />
      )}
    </button>
  )
}

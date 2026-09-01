'use client'

import { useMemo } from 'react'
import type { Grid } from '@/lib/puzzles/sudoku'
import type { SelectedCell } from '@/hooks/use-sudoku'
import { SudokuCell } from './sudoku-cell'

interface SudokuBoardProps {
  values: Grid
  given: boolean[][]
  selected: SelectedCell | null
  conflicts: boolean[][]
  errorCells: boolean[][] | null
  onSelect: (row: number, col: number) => void
}

function isPeer(a: SelectedCell, r: number, c: number): boolean {
  if (a.row === r && a.col === c) return false
  const sameBox =
    Math.floor(a.row / 3) === Math.floor(r / 3) &&
    Math.floor(a.col / 3) === Math.floor(c / 3)
  return a.row === r || a.col === c || sameBox
}

export function SudokuBoard({
  values,
  given,
  selected,
  conflicts,
  errorCells,
  onSelect,
}: SudokuBoardProps) {
  const selectedValue = useMemo(
    () => (selected ? values[selected.row][selected.col] : 0),
    [selected, values],
  )

  return (
    <div
      role="grid"
      aria-label="Sudoku board"
      className="grid w-full max-w-[min(92vw,540px)] grid-cols-9 overflow-hidden rounded-xl border-2 border-grid-line-strong bg-card shadow-[0_0_0_1px_var(--color-grid-line),0_18px_40px_-24px_var(--color-primary)]"
    >
      {values.map((rowVals, row) =>
        rowVals.map((value, col) => {
          const isSelected =
            selected?.row === row && selected?.col === col
          const peer = selected ? isPeer(selected, row, col) : false
          const sameValue =
            value !== 0 && value === selectedValue && !isSelected
          return (
            <SudokuCell
              key={`${row}-${col}`}
              value={value}
              row={row}
              col={col}
              given={given[row][col]}
              selected={isSelected}
              peer={peer}
              sameValue={sameValue}
              conflict={conflicts[row][col]}
              error={errorCells?.[row][col] ?? false}
              onSelect={onSelect}
            />
          )
        }),
      )}
    </div>
  )
}

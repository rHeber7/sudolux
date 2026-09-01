'use client'

import { useCallback, useEffect } from 'react'
import { CircleAlert, CircleCheckBig, PartyPopper } from 'lucide-react'
import { DIFFICULTY_LABELS } from '@/lib/puzzles/sudoku'
import { useSudoku } from '@/hooks/use-sudoku'
import { DifficultySelector } from './difficulty-selector'
import { NumberPad } from './number-pad'
import { SudokuBoard } from './sudoku-board'
import { SudokuControls } from './sudoku-controls'

export function SudokuGame() {
  const game = useSudoku('easy')
  const { selected, select } = game

  const move = useCallback(
    (dr: number, dc: number) => {
      const base = selected ?? { row: 0, col: 0 }
      const row = Math.min(8, Math.max(0, base.row + dr))
      const col = Math.min(8, Math.max(0, base.col + dc))
      select(row, col)
    },
    [selected, select],
  )

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key >= '1' && e.key <= '9') {
        game.setValue(Number(e.key))
      } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
        game.clearCell()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        move(-1, 0)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        move(1, 0)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        move(0, -1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        move(0, 1)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [game, move])

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex w-full max-w-[min(92vw,540px)] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <DifficultySelector
          value={game.difficulty}
          onChange={game.newGame}
        />
        <span className="text-sm text-muted-foreground">
          {DIFFICULTY_LABELS[game.difficulty]} puzzle
        </span>
      </div>

      <StatusBanner status={game.status} />

      <SudokuBoard
        values={game.values}
        given={game.given}
        selected={game.selected}
        conflicts={game.conflicts}
        errorCells={game.errorCells}
        onSelect={game.select}
      />

      <NumberPad
        remaining={game.remaining}
        disabled={!game.selected}
        onInput={game.setValue}
        onErase={game.clearCell}
      />

      <SudokuControls
        onNewGame={() => game.newGame(game.difficulty)}
        onCheck={game.check}
        onRestart={game.restart}
        disableCheck={game.status === 'solved'}
      />
    </div>
  )
}

function StatusBanner({ status }: { status: ReturnType<typeof useSudoku>['status'] }) {
  if (status === 'playing') {
    return (
      <p className="h-6 text-sm text-muted-foreground">
        Select a cell, then type or tap a number.
      </p>
    )
  }

  if (status === 'solved') {
    return (
      <div
        role="status"
        className="flex h-6 items-center gap-2 rounded-full bg-success/10 px-4 text-sm font-medium text-success"
      >
        <PartyPopper className="size-4" />
        Solved — nicely done!
      </div>
    )
  }

  if (status === 'clean') {
    return (
      <div
        role="status"
        className="flex h-6 items-center gap-2 rounded-full bg-success/10 px-4 text-sm font-medium text-success"
      >
        <CircleCheckBig className="size-4" />
        No mistakes so far — keep going!
      </div>
    )
  }

  return (
    <div
      role="status"
      className="flex h-6 items-center gap-2 rounded-full bg-destructive/10 px-4 text-sm font-medium text-destructive"
    >
      <CircleAlert className="size-4" />
      Some cells are incorrect — check the highlighted ones.
    </div>
  )
}

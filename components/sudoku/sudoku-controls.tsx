'use client'

import { CircleCheckBig, RotateCcw, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SudokuControlsProps {
  onNewGame: () => void
  onCheck: () => void
  onRestart: () => void
  disableCheck: boolean
}

export function SudokuControls({
  onNewGame,
  onCheck,
  onRestart,
  disableCheck,
}: SudokuControlsProps) {
  return (
    <div className="flex w-full max-w-[min(92vw,540px)] flex-wrap gap-2">
      <Button size="lg" onClick={onNewGame} className="flex-1">
        <Sparkles className="size-4" />
        New Sudoku
      </Button>
      <Button
        size="lg"
        variant="secondary"
        onClick={onCheck}
        disabled={disableCheck}
        className="flex-1"
      >
        <CircleCheckBig className="size-4" />
        Verify
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={onRestart}
        aria-label="Restart puzzle"
      >
        <RotateCcw className="size-4" />
      </Button>
    </div>
  )
}

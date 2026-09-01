'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  BOARD_SIZE,
  cloneGrid,
  findConflicts,
  generateSudoku,
  isComplete,
  type Difficulty,
  type Grid,
  type SudokuPuzzle,
} from '@/lib/puzzles/sudoku'

export type GameStatus = 'playing' | 'clean' | 'error' | 'solved'

export interface SelectedCell {
  row: number
  col: number
}

interface SudokuState {
  puzzle: SudokuPuzzle
  values: Grid
  given: boolean[][]
}

function initState(difficulty: Difficulty): SudokuState {
  const puzzle = generateSudoku(difficulty)
  return {
    puzzle,
    values: cloneGrid(puzzle.puzzle),
    given: puzzle.puzzle.map((row) => row.map((v) => v !== 0)),
  }
}

export function useSudoku(initialDifficulty: Difficulty = 'easy') {
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty)
  const [state, setState] = useState<SudokuState>(() =>
    initState(initialDifficulty),
  )
  const [selected, setSelected] = useState<SelectedCell | null>(null)
  const [status, setStatus] = useState<GameStatus>('playing')
  const [errorCells, setErrorCells] = useState<boolean[][] | null>(null)

  const { values, given, puzzle } = state

  const newGame = useCallback((next: Difficulty) => {
    setDifficulty(next)
    setState(initState(next))
    setSelected(null)
    setStatus('playing')
    setErrorCells(null)
  }, [])

  const restart = useCallback(() => {
    setState((prev) => ({ ...prev, values: cloneGrid(prev.puzzle.puzzle) }))
    setSelected(null)
    setStatus('playing')
    setErrorCells(null)
  }, [])

  const select = useCallback((row: number, col: number) => {
    setSelected({ row, col })
  }, [])

  const setValue = useCallback(
    (value: number) => {
      if (!selected) return
      const { row, col } = selected
      setState((prev) => {
        if (prev.given[row][col]) return prev
        const next = cloneGrid(prev.values)
        next[row][col] = next[row][col] === value ? 0 : value
        return { ...prev, values: next }
      })
      setStatus('playing')
      setErrorCells(null)
    },
    [selected],
  )

  const clearCell = useCallback(() => {
    if (!selected) return
    const { row, col } = selected
    setState((prev) => {
      if (prev.given[row][col]) return prev
      const next = cloneGrid(prev.values)
      next[row][col] = 0
      return { ...prev, values: next }
    })
    setStatus('playing')
    setErrorCells(null)
  }, [selected])

  const check = useCallback(() => {
    const errors = values.map((row, r) =>
      row.map((v, c) => v !== 0 && v !== puzzle.solution[r][c]),
    )
    setErrorCells(errors)
    const hasError = errors.some((row) => row.some(Boolean))
    if (hasError) {
      setStatus('error')
    } else if (isComplete(values)) {
      setStatus('solved')
    } else {
      setStatus('clean')
    }
  }, [values, puzzle.solution])

  /** Live rule violations (duplicate in row/col/box), always visible. */
  const conflicts = useMemo(() => findConflicts(cloneGrid(values)), [values])

  const complete = useMemo(() => isComplete(values), [values])

  /** How many of each digit remain to be placed (for the number pad). */
  const remaining = useMemo(() => {
    const counts = new Array(BOARD_SIZE + 1).fill(BOARD_SIZE)
    for (const row of values) {
      for (const v of row) {
        if (v !== 0) counts[v] -= 1
      }
    }
    return counts as number[]
  }, [values])

  return {
    difficulty,
    values,
    given,
    selected,
    status,
    conflicts,
    errorCells,
    complete,
    remaining,
    newGame,
    restart,
    select,
    setValue,
    clearCell,
    check,
  }
}

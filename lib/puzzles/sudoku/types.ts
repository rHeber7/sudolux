export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert'

/** A 9x9 grid of digits. 0 represents an empty cell. */
export type Grid = number[][]

export interface SudokuPuzzle {
  /** The starting board shown to the player (0 = empty). */
  puzzle: Grid
  /** The unique, fully solved board. */
  solution: Grid
  difficulty: Difficulty
}

export const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard', 'expert']

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  expert: 'Expert',
}

/** Number of cells to remove from the solved board per difficulty (out of 81). */
export const DIFFICULTY_REMOVALS: Record<Difficulty, number> = {
  easy: 40,
  medium: 48,
  hard: 52,
  expert: 56,
}

export const BOARD_SIZE = 9
export const BOX_SIZE = 3

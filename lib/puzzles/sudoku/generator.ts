import {
  BOARD_SIZE,
  BOX_SIZE,
  DIFFICULTY_REMOVALS,
  type Difficulty,
  type Grid,
  type SudokuPuzzle,
} from './types'

function createEmptyGrid(): Grid {
  return Array.from({ length: BOARD_SIZE }, () => new Array(BOARD_SIZE).fill(0))
}

export function cloneGrid(grid: Grid): Grid {
  return grid.map((row) => [...row])
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/** Whether `value` can be placed at (row, col) without breaking Sudoku rules. */
export function isValidPlacement(
  grid: Grid,
  row: number,
  col: number,
  value: number,
): boolean {
  for (let i = 0; i < BOARD_SIZE; i++) {
    if (grid[row][i] === value) return false
    if (grid[i][col] === value) return false
  }
  const boxRow = Math.floor(row / BOX_SIZE) * BOX_SIZE
  const boxCol = Math.floor(col / BOX_SIZE) * BOX_SIZE
  for (let r = 0; r < BOX_SIZE; r++) {
    for (let c = 0; c < BOX_SIZE; c++) {
      if (grid[boxRow + r][boxCol + c] === value) return false
    }
  }
  return true
}

/** Fill an empty grid with a random valid complete solution via backtracking. */
function fillGrid(grid: Grid): boolean {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (grid[row][col] !== 0) continue
      const candidates = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])
      for (const value of candidates) {
        if (isValidPlacement(grid, row, col, value)) {
          grid[row][col] = value
          if (fillGrid(grid)) return true
          grid[row][col] = 0
        }
      }
      return false
    }
  }
  return true
}

/**
 * Count solutions of a grid, stopping early once `limit` is reached.
 * Used to guarantee the generated puzzle has a unique solution.
 */
function countSolutions(grid: Grid, limit = 2): number {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (grid[row][col] !== 0) continue
      let count = 0
      for (let value = 1; value <= 9; value++) {
        if (isValidPlacement(grid, row, col, value)) {
          grid[row][col] = value
          count += countSolutions(grid, limit)
          grid[row][col] = 0
          if (count >= limit) return count
        }
      }
      return count
    }
  }
  return 1
}

export function generateSolvedGrid(): Grid {
  const grid = createEmptyGrid()
  fillGrid(grid)
  return grid
}

/**
 * Generate a Sudoku puzzle with a guaranteed unique solution.
 * Cells are removed one at a time; a removal is only kept if the puzzle
 * still has exactly one solution.
 */
export function generateSudoku(difficulty: Difficulty): SudokuPuzzle {
  const solution = generateSolvedGrid()
  const puzzle = cloneGrid(solution)
  const target = DIFFICULTY_REMOVALS[difficulty]

  const positions = shuffle(
    Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, i) => i),
  )

  let removed = 0
  for (const pos of positions) {
    if (removed >= target) break
    const row = Math.floor(pos / BOARD_SIZE)
    const col = pos % BOARD_SIZE
    const backup = puzzle[row][col]
    if (backup === 0) continue

    puzzle[row][col] = 0
    if (countSolutions(cloneGrid(puzzle), 2) === 1) {
      removed++
    } else {
      puzzle[row][col] = backup
    }
  }

  return { puzzle, solution, difficulty }
}

/** Find all cells that break Sudoku rules given the current board state. */
export function findConflicts(grid: Grid): boolean[][] {
  const conflicts = Array.from({ length: BOARD_SIZE }, () =>
    new Array(BOARD_SIZE).fill(false),
  )

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const value = grid[row][col]
      if (value === 0) continue
      grid[row][col] = 0
      if (!isValidPlacement(grid, row, col, value)) {
        conflicts[row][col] = true
      }
      grid[row][col] = value
    }
  }
  return conflicts
}

export function isComplete(grid: Grid): boolean {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (grid[row][col] === 0) return false
    }
  }
  return true
}

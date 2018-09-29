import { GAME_OVER, INIT_CELL_VALUES, RESET_GAME, UPDATE_MOVE, UPDATE_ORDER } from '../constants';

export function resetGame() {
  return {
    type: RESET_GAME
  };
}

export function updateOrder(order) {
  return {
    type: UPDATE_ORDER,
    order
  }
}

export function updateMove(row, col, val) {
  return {
    type: UPDATE_MOVE,
    row,
    col,
    val
  }
}

export function initCellValues(cellValues) {
  return {
    type: INIT_CELL_VALUES,
    cellValues
  }
}

export function gameOver() {
  return {
    type: GAME_OVER
  }
}

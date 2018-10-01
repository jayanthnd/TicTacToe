import { GAME_OVER, RESET_GAME, UPDATE_MOVE, UPDATE_ORDER, PLAYER_WON_GAME } from '../constants';

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

export function gameOver(playerWon) {
  return {
    type: GAME_OVER,
    playerWon
  }
}

export function playerWonGame() {
  return {
    type: PLAYER_WON_GAME
  }
}

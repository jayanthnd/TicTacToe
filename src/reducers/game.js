import {
  RESET_GAME, UPDATE_MOVE, UPDATE_ORDER, INIT_CELL_VALUES, X, ZERO, GAME_OVER,
  DEFAULT_ORDER, PLAYER_WON_GAME
} from '../constants';

const getDefaultCellValues = (order) => {
  let cellValues = {};
  for (let i = 0; i < order; i++) {
    for (let j = 0; j < order; j++) {
      if (!(i in cellValues)) {
        cellValues[i] = {};
      }
      cellValues[i][j] = null;
    }
  }
  return cellValues;
};

const initialState = {
  nextVal: X,
  cellValues: getDefaultCellValues(DEFAULT_ORDER),
  order: DEFAULT_ORDER,
  isGameOver: false,
  totalMoves: 0,
  playerWon: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_GAME:
      return Object.assign({}, state, {
        cellValues: getDefaultCellValues(state.order),
        nextVal: X,
        isGameOver: false,
        totalMoves: 0,
        playerWon: false
      });

    case UPDATE_ORDER:
      return Object.assign({}, state, {
        order: action.order,
        totalMoves: 0,
        cellValues: getDefaultCellValues(action.order)
      });

    case UPDATE_MOVE:
      let newCellValues = Object.assign({}, state.cellValues);
      newCellValues[action.row][action.col] = action.val;
      return Object.assign({}, state, {
        cellValues: newCellValues,
        nextVal: state.nextVal === X ? ZERO : X,
        totalMoves: state.totalMoves + 1
      });

    case INIT_CELL_VALUES:
      return Object.assign({}, state, {
        cellValues: action.cellValues
      });

    case GAME_OVER:
      return Object.assign({}, state, {
        isGameOver: true
      });

    case PLAYER_WON_GAME:
      return Object.assign({}, state, {
        isGameOver: true,
        playerWon: true
      });

    default:
      return state
  }
}

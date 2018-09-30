import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import GameGrid from '../../components/GameGrid';
import { SquareCell } from '../../components/SquareCell';
import Button from '../../components/Button';
import { gameOver, resetGame, updateMove, updateOrder } from '../../actions';
import { DEFAULT_GRID_OPTIONS_SIZE, GAME_DRAW_MESSAGE, GAME_OVER_MESSAGE, GAME_TITLE, X, ZERO } from '../../constants';


export const didPlayerWin = (row, col, cellValues, currVal, order) => {
  let playerWon = true;

  // Check for same row
  for (let i = 0; i < order; i++) {
    if (cellValues[row][i] !== currVal || !cellValues[row][i]) {
      playerWon = false;
      break;
    }
  }
  if (playerWon) {
    return playerWon;
  }
  playerWon = true;

  // Check for same column
  for (let i = 0; i < order; i++) {
    if (cellValues[i][col] !== currVal || !cellValues[i][col]) {
      playerWon = false;
      break;
    }
  }
  if (playerWon) {
    return playerWon;
  }
  playerWon = true;

  // Check for top left to bottom right diagonal
  for (let i = 0; i < order; i++) {
    if (cellValues[i][i] !== currVal || !cellValues[i][i]) {
      playerWon = false;
      break
    }
  }
  if (playerWon) {
    return playerWon;
  }
  playerWon = true;

  // Check for top right to bottom left diagonal
  for (let i = 0, j = order - 1; i < order; i++, j--) {
    if (cellValues[i][j] !== currVal || !cellValues[i][j]) {
      playerWon = false;
      break
    }
  }
  return playerWon;
};

export class TicTacToe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridOptions: [],
      gridOptionsSize: DEFAULT_GRID_OPTIONS_SIZE
    };

    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.handleStartResetClick = this.handleStartResetClick.bind(this);
  }

  componentDidMount() {
    const { gridOptionsSize } = this.state;

    let gridOptions = [];
    for (let i = 2; i < gridOptionsSize + 2; i++) {
      gridOptions.push(
        <option key={`op-${i}`} value={i+1}>{i + 1} x {i + 1}</option>
      );
    }
    this.setState({
      gridOptions
    });
  }

  componentWillReceiveProps(nextProps) {
    const { order, dispatch, totalMoves } = nextProps;

    if (this.props.order !== order) {
      dispatch(resetGame());
    }

    if(totalMoves === order * order) {
      dispatch(gameOver());
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetGame());
  }

  updateCellMove(row, col, nextVal) {
    const { dispatch } = this.props;
    return new Promise((resolve) => {
      dispatch(updateMove(row, col, nextVal));
      resolve();
    });
  }

  handleCellClick(e, row, col) {
    const { nextVal, cellValues, totalMoves, order, dispatch } = this.props;

    if (!cellValues[row][col]) {
      this.updateCellMove(row, col, nextVal).then(() => {
        // Evaluate for totalMoves >= (2 * order - 2). If true, only then check for winner
        if ( totalMoves >= (2 * order - 2)  ) {
          // Compute logic for each move
          const playerWon = didPlayerWin(row, col, cellValues, nextVal, order);
          if (playerWon) {
            // Dispatch event to update game status
            dispatch(gameOver());
          }
        }
      });
    }
  }

  handleOptionClick(e) {
    const { dispatch } = this.props;
    dispatch(updateOrder(e.target.value));
  }

  handleStartResetClick() {
    const { dispatch } = this.props;
    dispatch(resetGame());
  }

  render() {
    const { order, cellValues, isGameOver, totalMoves } = this.props;
    const { gridOptions } = this.state;
    let gameResultMessage;

    if (totalMoves === order * order) {
      gameResultMessage = GAME_DRAW_MESSAGE;
    } else {
      gameResultMessage = `${totalMoves % 2 !== 0 ? X : ZERO} won!!!` ;
    }

    return (
      <div className="App">
        { isGameOver &&
          <div className="Game-over">
            { GAME_OVER_MESSAGE } { gameResultMessage }
          </div>
        }
        <div>{ GAME_TITLE }</div>
        <GameGrid
          order={order}
          Cell={SquareCell}
          cellValues={cellValues}
          onCellClick={this.handleCellClick}
          className={isGameOver ? "Grid-wrapper--disabled" : "Grid-wrapper"}
          isGameOver={isGameOver}
        />
        <div className="Options-wrapper">
          <span>
            Grid size:
            <select
              className="Select"
              onChange={this.handleOptionClick}
              value={order}
            >
              { gridOptions }
            </select>
            <Button
              text="Reset"
              className="Button-wrapper"
              onClick={this.handleStartResetClick}
            />
          </span>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { nextVal, cellValues, order, totalMoves, isGameOver } = state.app;

  return {
    nextVal,
    cellValues,
    order,
    totalMoves,
    isGameOver
  };
}

export default connect(mapStateToProps)(TicTacToe);

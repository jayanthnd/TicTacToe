import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class GameGrid extends Component {
  constructor(props) {
    super(props);

    this.createGrid = this.createGrid.bind(this);
  }

  createGrid() {
    const { order, Cell, onCellClick, cellValues } = this.props;
    let table = [];

    // Outer loop to create parent
    for (let i = 0; i < order; i++) {
      let children = [];
      //Inner loop to create children
      for (let j = 0; j < order; j++) {
        children.push(
          <Cell
            key={`square-${i}-${j}`}
            onClick={onCellClick}
            row={i}
            col={j}
            fill={Object.keys(cellValues).length > 0 && cellValues[i][j] ? cellValues[i][j]: ''}
          />
        );
      }
      //Create the parent and add the children
      table.push(<tr key={`tr-${i}`} className={"Row"}>{children}</tr>);
    }
    return table;
  }

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <table className="Grid">
          <tbody>
          { this.createGrid() }
          </tbody>
        </table>
      </div>
    );
  }
}

GameGrid.propTypes = {
  order: PropTypes.number,
  cellValues: PropTypes.object,
  onCellClick: PropTypes.func,
  className: PropTypes.string
};

GameGrid.defaultProps = {
  order: 3,
  cellValues: {},
  onCellClick: () => {}
};


export default GameGrid;

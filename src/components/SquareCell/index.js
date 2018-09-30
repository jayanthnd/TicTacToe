import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export const SquareCell = (props) => {
  const { row, col, onClick, fill } = props;
  return (
    <td key={`td-${row}-${col}`} className={styles.cell} onClick={(e) => {onClick && onClick(e, row, col)}}>
      <div className={styles.icon}>{ fill }</div>
    </td>
  );
};


SquareCell.propTypes = {
  row: PropTypes.number,
  col: PropTypes.number,
  onClick: PropTypes.func,
  fill: PropTypes.any
};

SquareCell.defaultProps = {
  row: 0,
  col: 0,
  onClick: () => {},
  fill: ''
};

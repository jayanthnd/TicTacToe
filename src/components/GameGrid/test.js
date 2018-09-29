import React from 'react';
import GameGrid from './index.js';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { SquareCell } from '../SquareCell';
import { X, ZERO } from '../../constants';


configure({adapter: new Adapter()});

function setup(extraProps) {
  const props = {
    order: 3,
    Cell: SquareCell,
    onCellClick: jest.fn(),
    cellValues: {}
  };
  Object.assign(props, extraProps);
  const wrapper = shallow(<GameGrid {...props} />);

  return {
    props,
    wrapper
  }
}


describe('<GameGrid /> tests', () => {
  test('should render table, tbody, 3 trs and 3 tds within each tr', () => {
    const { wrapper, props } = setup();

    expect(wrapper.find('table').length).toBe(1);
    expect(wrapper.find('tbody').length).toBe(1);
    expect(wrapper.find('tr').length).toBe(3);
    let cellCount = 0;
    wrapper.find('tr').first().children().forEach((cell, i) => {
      cellCount += 1;
      expect(cell.props().row).toEqual(0);
      expect(cell.props().col).toEqual(i);
      expect(cell.props().fill).toEqual('');
      expect(cell.props().onClick).toEqual(props.onCellClick);
    });
    expect(cellCount).toEqual(3);
  });

  test('should fill X and 0 in their respective positions based on the cellValues', () => {
    const { wrapper } = setup({
      cellValues: {
        0: {
          0: X,
          1: null,
          2: ZERO
        },
        1: {
          0: null,
          1: null,
          2: null
        },
        2: {
          0: X,
          1: null,
          2: null
        },
      }
    });
    const firstRow = wrapper.find('tr').first();
    expect(firstRow.childAt(0).props().fill).toEqual(X);
    expect(firstRow.childAt(1).props().fill).toEqual('');
    expect(firstRow.childAt(2).props().fill).toEqual(ZERO);
  });
});

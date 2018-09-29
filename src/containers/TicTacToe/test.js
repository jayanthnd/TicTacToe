import React from 'react';
import { TicTacToe } from './index.js';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import {
  GAME_TITLE,
  DEFAULT_ORDER,
  DEFAULT_GRID_OPTIONS_SIZE,
  GAME_OVER_MESSAGE,
  GAME_DRAW_MESSAGE,
  UPDATE_ORDER, X, ZERO
} from '../../constants';
import { didPlayerWin } from './index';


configure({adapter: new Adapter()});

function setup(extraProps) {
  const props = {

  };
  Object.assign(props, extraProps);
  const wrapper = shallow(<TicTacToe {...props} />);

  return {
    props,
    wrapper
  }
}

describe('<TicTacToe /> tests', () => {
  test('should render the TicTacToe container with all children', () => {
    const { wrapper } = setup();
    const wrapperText = wrapper.text();

    expect(wrapper.find('GameGrid').exists()).toBe(true);
    expect(wrapper.find('select').exists()).toBe(true);
    expect(wrapper.find('option').length).toEqual(DEFAULT_GRID_OPTIONS_SIZE);
    expect(wrapper.find('Button').exists()).toBe(true);

    expect(wrapperText).toContain(GAME_TITLE);
    for (let i = DEFAULT_ORDER; i < (DEFAULT_ORDER + DEFAULT_GRID_OPTIONS_SIZE); i++) {
      expect(wrapperText).toContain(`${i} x ${i}`);
    }
  });

  test('options should have the correct value', () => {
    const { wrapper } = setup();
    const selectWrapper = wrapper.find('select').shallow();
    selectWrapper.children().forEach((option, i) => {
      expect(option.props().value).toBe(i + DEFAULT_ORDER);
    });
  });

  test('should show game draw message when isGameOver is true and totalMoves equals order * order', () => {
    const { wrapper } = setup({
      isGameOver: true,
      totalMoves: 9,
      order: 3
    });
    expect(wrapper.text()).toContain(GAME_OVER_MESSAGE);
    expect(wrapper.text()).toContain(GAME_DRAW_MESSAGE);
    expect(wrapper.find('GameGrid').props().className).toBe('Grid-wrapper--disabled');
  });

  test('should show X won message when isGameOver is true and totalMoves is an odd number', () => {
    const { wrapper } = setup({
      isGameOver: true,
      totalMoves: 3,
      order: 3
    });
    expect(wrapper.text()).toContain(GAME_OVER_MESSAGE);
    expect(wrapper.text()).toContain('X won!!!');
    expect(wrapper.find('GameGrid').props().className).toBe('Grid-wrapper--disabled');
  });

  test('should show 0 won message when isGameOver is true and totalMoves is an even number', () => {
    const { wrapper } = setup({
      isGameOver: true,
      totalMoves: 4,
      order: 3
    });
    expect(wrapper.text()).toContain(GAME_OVER_MESSAGE);
    expect(wrapper.text()).toContain('0 won!!!');
    expect(wrapper.find('GameGrid').props().className).toBe('Grid-wrapper--disabled');
  });

  describe('handleStartResetClick method', () => {
    const { wrapper, props } = setup({
      dispatch: jest.fn()
    });
    test('should call dispatch', () => {
      wrapper.instance().handleStartResetClick();
      expect(props.dispatch).toBeCalled();
    });
  });

  describe('handleOptionClick method', () => {
    const { wrapper, props } = setup({
      dispatch: jest.fn()
    });
    const event = {
      target: {
        value: 3
      }
    };
    test('should call dispatch', () => {
      wrapper.instance().handleOptionClick(event);
      expect(props.dispatch).toBeCalledWith({
        order: 3,
        type: UPDATE_ORDER
      });
    });
  });

  describe('handleCellClick method', () => {
    const defaultProps = {
      nextVal: X,
      totalMoves: 4,
      order: 3,
      dispatch: jest.fn()
    };
    test('should not call updateCellMove is the value for that cell is already assigned', () => {
      const { wrapper } = setup({
        cellValues: {
          1 : {
            1: 'X',
            2: null
          }
        },
        ...defaultProps
      });
      const methodArgs = {
        e: {},
        row: 1,
        col: 1
      };
      const updateCellMove = jest.fn();
      wrapper.instance().handleCellClick(methodArgs.e, methodArgs.row, methodArgs.col);
      expect(updateCellMove).not.toBeCalled();
    });
  });

  describe('didPlayerWin method', () => {
    test('should return false when no pattern match is found', () => {
      const params = {
        row: 1,
        col: 1,
        cellValues: {
          0: {
            1: X,
            2: ZERO,
            3: X,
          },
          1: {
            1: ZERO,
            2: X,
            3: ZERO,
          },
          2: {
            1: null,
            2: null,
            3: null,
          }
        },
        currVal: X,
        order: 3
      };
      const playerWon = didPlayerWin(params.row, params.col, params.cellValues, params.currVal, params.order);
      expect(playerWon).toBe(false);
    });

    test('should return true when pattern match left to right diagonal is found', () => {
      const params = {
        row: 2,
        col: 2,
        cellValues: {
          0: {
            0: X,
            1: ZERO,
            2: X,
          },
          1: {
            0: ZERO,
            1: X,
            2: ZERO,
          },
          2: {
            0: null,
            1: null,
            2: X,
          }
        },
        currVal: X,
        order: 3
      };
      const playerWon = didPlayerWin(params.row, params.col, params.cellValues, params.currVal, params.order);
      expect(playerWon).toBe(true);
    });

    test('should return true when pattern match same col is found', () => {
      const params = {
        row: 2,
        col: 0,
        cellValues: {
          0: {
            0: X,
            1: ZERO,
            2: X,
          },
          1: {
            0: X,
            1: ZERO,
            2: ZERO,
          },
          2: {
            0: X,
            1: null,
            2: ZERO,
          }
        },
        currVal: X,
        order: 3
      };
      const playerWon = didPlayerWin(params.row, params.col, params.cellValues, params.currVal, params.order);
      expect(playerWon).toBe(true);
    });

    test('should return true when pattern match same row is found', () => {
      const params = {
        row: 0,
        col: 2,
        cellValues: {
          0: {
            0: X,
            1: X,
            2: X,
          },
          1: {
            0: X,
            1: ZERO,
            2: ZERO,
          },
          2: {
            0: ZERO,
            1: null,
            2: ZERO,
          }
        },
        currVal: X,
        order: 3
      };
      const playerWon = didPlayerWin(params.row, params.col, params.cellValues, params.currVal, params.order);
      expect(playerWon).toBe(true);
    });

    test('should return true when pattern match right to left diagonal is found', () => {
      const params = {
        row: 2,
        col: 0,
        cellValues: {
          0: {
            0: X,
            1: ZERO,
            2: X,
          },
          1: {
            0: ZERO,
            1: X,
            2: ZERO,
          },
          2: {
            0: X,
            1: null,
            2: ZERO,
          }
        },
        currVal: X,
        order: 3
      };
      const playerWon = didPlayerWin(params.row, params.col, params.cellValues, params.currVal, params.order);
      expect(playerWon).toBe(true);
    });
  });
});

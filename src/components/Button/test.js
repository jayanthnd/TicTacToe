import React from 'react';
import Button from './index.js';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';


configure({adapter: new Adapter()});

function setup(extraProps) {
  const props = {
    text: 'Button name',
    onClick: jest.fn(),
    className: 'test'
  };
  Object.assign(props, extraProps);
  const wrapper = shallow(<Button {...props} />);

  return {
    props,
    wrapper
  }
}


describe('<Button /> tests', () => {
  test('should render a button with the text prop', () => {
    const { wrapper, props } = setup();
    expect(wrapper.text()).toEqual(props.text);
  });

  test('should call onClick when clicked', () => {
    const { wrapper, props } = setup();
    wrapper.find('div').simulate('click');
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });
});

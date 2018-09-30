import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class Button extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onClick } = this.props;
    onClick && onClick();
  }

  render() {
    const { text, className } = this.props;
    return (
      <div className={className} onClick={this.handleClick}>
        <button className={styles.button}>{ text }</button>
      </div>
    )
  }
}

Button.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  text: '',
  className: '',
  onClick: () => {}
};

export default Button;

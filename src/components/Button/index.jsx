import React from 'react';
import classNames from 'classnames';

export class ButtonComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.propsToState(props);
  }

  onClick() {
    if (!!this.state.onClick) {
      this.state.onClick();
    }
  }

  propsToState(props) {
    return {
      href: props.href || undefined,
      onClick: props.onClick || undefined,
      value: props.value || this.props.children,
      className: props.className
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.propsToState(nextProps));
  }

  render() {
    var className = classNames([
      'button',
      this.state.className
    ]);

    return <a onClick={this.onClick.bind(this)}
              href={this.state.href}
              className={className}>{this.state.value}</a>;
  }
}

ButtonComponent.propTypes = {
  href: React.PropTypes.string,
  onClick: React.PropTypes.func
};

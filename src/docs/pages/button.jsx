import React from "react";

import {ButtonComponent} from "../../components/Button";

export class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clickTracker: 0
    };
  }

  onClick() {
    this.setState({clickTracker: this.state.clickTracker + 1});
  }

  render() {
    return <div>
      <ButtonComponent href="http://google.nl">Go Google</ButtonComponent>
      <ButtonComponent value={'Patrick ' + this.state.clickTracker} onClick={this.onClick.bind(this)} />
    </div>;
  }
}

ButtonComponent.propTypes = {
  initialCount: React.PropTypes.number,
  href: React.PropTypes.string,
  onClick: React.PropTypes.func
};
ButtonComponent.defaultProps = {
  initialCount: 0
};

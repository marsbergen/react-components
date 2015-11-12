import React from "react";

class ButtonComponent extends React.Component {
	render () {
		return <div>Hoi {this.props.name}</div>;
	}
}

export {ButtonComponent};